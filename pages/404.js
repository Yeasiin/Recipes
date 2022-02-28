import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);

  return (
    <>
      <Head>
        <title>Not Found | Recipes</title>
      </Head>
      <div className="container">
        <div className="not-found">
          <h1>404</h1>
          <h2>Oops! That Page Can not Be Found</h2>
          <p>
            Redirecting To
            {
              <Link href="/">
                <a> Homepage </a>
              </Link>
            }
            for more Yummy Recipes...
          </p>
        </div>

        <style jsx>{`
          .not-found {
            margin: 10rem 0;
            background: #fff;
            padding: 30px;
            text-align: center;
          }
          .not-found a {
            font-weight: 500;
            color: #ff5555;
          }
          h1 {
            font-size: 3em;
          }
        `}</style>
      </div>
    </>
  );
}

export default NotFound;
