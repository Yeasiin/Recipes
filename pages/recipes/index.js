import Head from "next/head";
import { createClient } from "contentful";
import RecipeCard from "./../../components/RecipeCard";

export default function Recipes({ recipes }) {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>

      <div>
        {/*    <section className="hero">
          <div className="container">
            <div className="hero-container">
              <div className="hero-content">
                <h1 className="hero-title">
                  Save your time looking for <span>recipes</span>
                </h1>
                <p className="hero-details">
                  Here you'll find a collection of delicious recipes that your
                  family will love, all tested and approved by
                </p>
                <a href="#" className="btn btn-main">
                  Start Cooking
                </a>
              </div>
              <img
                className="featuredImage"
                src="img/featuredimage.png"
                alt="Hero content image"
              />
            </div>
          </div>
        </section> */}

        <section className="recipes">
          <div className="container">
            <h2 className="recipes-title">explore All the recipes</h2>

            <div className="recipes-content">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.sys.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1,
    // revalidate: 60 * 60 * 5,
  };
}
