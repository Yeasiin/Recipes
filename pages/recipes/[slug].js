import Head from "next/head";
import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <Skeleton />;

  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;

  return (
    <div>
      <Head>
        <title>{title} | Marmite</title>
      </Head>
      <div className="banner">
        <Image
          src={"https:" + featuredImage.fields.file.url}
          height="400px"
          width="1200px"
          objectFit="cover"
        />
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p> Take About {cookingTime} minute to Cook. </p>
        <h3>Ingredient: </h3>

        {ingredients.map((ingredient, i) => (
          <span key={i}>ingredient </span>
        ))}
      </div>
      <div className="method">
        <h2>Method: </h2>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: "recipe" });

  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const res = await client.getEntries({
    content_type: "recipe",
    "fields.slug": context.params.slug,
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
      recipe: res.items[0],
    },
    revalidate: 1,
  };
}
