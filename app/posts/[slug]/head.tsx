import GlobalHead from "app/components/GlobalHead";
import { previewData } from "next/headers";
import { getPostBySlug } from "utils/contentful-client";
import { PostPageProps } from "./page";

export default async function Head({ params: { slug } }: PostPageProps) {
  const preview = Boolean(previewData());

  if (preview) console.log("Preview head", preview);
  const post = await getPostBySlug(slug, preview);

  const { title, description } = post.fields;

  const stringTitle = `Kacey Cleveland - ${title}`;

  return (
    <>
      <title key="title">{stringTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`${process.env.BASE_URL}/posts/${slug}`}
      />
      {slug && (
        <meta
          property="og:image"
          content={`${
            process.env.BASE_URL
          }/api/posts/og?slug=${encodeURIComponent(slug)}`}
        />
      )}
      <GlobalHead />
    </>
  );
}
