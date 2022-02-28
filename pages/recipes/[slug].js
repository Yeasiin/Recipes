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
        <title>{title} | Recipes</title>
      </Head>
      <div className="container">
        <div className="banner">
          <Image
            src={"https:" + featuredImage.fields.file.url}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height / 2}
            // layout="fill"
            objectFit="cover"
          />
          <h2>{title} </h2>
        </div>

        <div className="recipe-wrapper">
          <div className="info">
            <p className="minutes">
              Will Take About
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A6 6 0 108 3a6 6 0 000 12zm0 1A7 7 0 108 2a7 7 0 000 14z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M8 4.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4.5a.5.5 0 010-1h3V5a.5.5 0 01.5-.5zM5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z"
                  clipRule="evenodd"
                ></path>
                <path d="M7 1h2v2H7V1z"></path>
              </svg>
              {cookingTime} minute to Cook.
            </p>
            <h3>Ingredients </h3>
            <div className="ingredient__list">
              {ingredients.map((ingredient, i) => (
                <p key={i}>
                  {" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.752 40.6449V34.4679C33.7513 34.1839 33.8073 33.9026 33.9169 33.6405C34.0265 33.3784 34.1873 33.1409 34.39 32.9419C35.35 31.9989 37.281 30.0939 39.378 27.9709L39.369 27.9659C40.7122 26.7024 41.6776 25.0903 42.1576 23.3098C42.6375 21.5292 42.6131 19.6503 42.0869 17.8829C41.5608 16.1155 40.5537 14.5291 39.1781 13.3009C37.8025 12.0728 36.1125 11.2512 34.297 10.9279C33.4135 10.7716 32.6273 10.2732 32.109 9.54093C31.1894 8.24687 29.9734 7.19168 28.5627 6.46355C27.152 5.73541 25.5875 5.35547 24 5.35547C22.4125 5.35547 20.848 5.73541 19.4373 6.46355C18.0266 7.19168 16.8106 8.24687 15.891 9.54093C15.3727 10.2732 14.5865 10.7716 13.703 10.9279C11.8874 11.251 10.1973 12.0725 8.82161 13.3006C7.44588 14.5287 6.43864 16.1151 5.91239 17.8825C5.38613 19.65 5.36158 21.529 5.84148 23.3096C6.32138 25.0902 7.28683 26.7023 8.63001 27.9659L8.62 27.9709C10.2707 29.6406 11.9337 31.298 13.609 32.9429C13.8116 33.1418 13.9723 33.3792 14.0819 33.6411C14.1915 33.9029 14.2476 34.1841 14.247 34.4679V40.6449C14.247 41.1754 14.4577 41.6841 14.8328 42.0591C15.2079 42.4342 15.7166 42.6449 16.247 42.6449H31.751C32.2814 42.6449 32.7901 42.4342 33.1652 42.0591C33.5403 41.6841 33.751 41.1754 33.751 40.6449H33.752Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28.281 42.6449V21.2419C28.2807 20.1067 27.8296 19.0181 27.0268 18.2154C26.224 17.4128 25.1352 16.9619 24 16.9619V16.9619C22.8648 16.9619 21.776 17.4128 20.9732 18.2154C20.1704 19.0181 19.7193 20.1067 19.719 21.2419V42.6449"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {ingredient}
                </p>
              ))}
            </div>
          </div>
          <div className="method">
            <h2>Method: </h2>
            <div>{documentToReactComponents(method)}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .recipe-wrapper {
          max-width: 80ch;
          margin: 0 auto;
          margin-bottom:10rem;
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
        .method {
          padding-left: 2rem;
        }
        .method h2 {
          margin-bottom: 3rem;
          text-align: center;
        }
        .info .minutes {
          font-weight: 500;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-bottom: 4rem;
        }
        .info h3 {
          text-align: center;
        }
        .ingredient__list {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(min(100%, 300px), 1fr)
          );
          grid-gap: 1rem;
          margin-top: 4rem;
          margin-bottom: 4rem;
        }
        .ingredient__list p {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 500;
        }

        .info span:last-child {
          margin-bottom: 3rem;
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
