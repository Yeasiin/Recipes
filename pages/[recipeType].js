import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default function Recipes({ recipes }) {
  const {
    query: { recipeType },
  } = useRouter();

  function capitalize(word) {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <>
      <Head>
        <title>{capitalize(recipeType)} Recipes</title>
      </Head>

      <div>
        <section className="recipes">
          <div className="container">
            <h2 className="recipes-title">{recipeType} recipes</h2>
            <div className="recipes-content">
              {recipes &&
                recipes.map((recipe) => (
                  <RecipeCard key={recipe.sys.id} recipe={recipe} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: "recipe" });

  // Selecting the recipes type
  const recipesType = new Set(res.items.map((item) => item.fields.type));

  // taking only unique value and preparing for paths value
  const paths = [...new Set(recipesType)].map((item) => ({
    params: { recipeType: item },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await client.getEntries({
    content_type: "recipe",
    "fields.type": context.params.recipeType,
  });

  if (!res.items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 60 * 60 * 2,
  };
}
