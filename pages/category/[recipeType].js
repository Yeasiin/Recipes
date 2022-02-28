import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import RecipeCard from "./../../components/RecipeCard";
import Skeleton from "../../components/Skeleton";

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
  if (!recipes) return <Skeleton />;

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
  // const res = await client.getEntries({ content_type: "recipe" });

  /* const paths = res.items.map((item) => {

  }); */

  //  TODO: Make the Paths dynamic
  return {
    paths: [
      { params: { recipeType: "breakfast" } },
      { params: { recipeType: "lunch" } },
      { params: { recipeType: "dinner" } },
    ],
    fallback: true,
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
    revalidate: 1,
    // revalidate: 60 * 60 * 5,
  };
}
