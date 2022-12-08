import GlobalHead from "app/components/GlobalHead";
import { IBlogPostFields } from "types/contentful";

export default async function Head({
  params: { title, description },
}: {
  params: IBlogPostFields;
}) {
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
