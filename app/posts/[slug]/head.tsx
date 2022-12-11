import GlobalHead from "app/components/GlobalHead";
import { getPostBySlug } from "utils/contentful-client";
import { PostPageProps } from "./page";

export default async function Head({ params: { slug } }: PostPageProps) {
  const post = await getPostBySlug(slug);
  const { title, description } = post.fields;
  return (
    <>
      <title>Kacey Cleveland - {title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      {/* <meta property="og:url" content={rootURL} />
      <meta property="og:image" content={imageURL} /> */}
      <GlobalHead />
    </>
  );
}
