import Link from "next/link";
import Image from "next/image";

function RecipeCard({ recipe }) {
  const { title, slug, thumbnail, type } = recipe.fields;
  return (
    <Link href={`/recipes/${slug}`}>
      <div className="recipe-content">
        <p className="recipe-category">{type}</p>
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height - 400}
          objectFit="cover"
        />
        <h3 className="recipe-title">{title}</h3>
      </div>
    </Link>
  );
}

export default RecipeCard;
