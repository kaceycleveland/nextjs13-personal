import { createClient } from "next-sanity";
import { Post } from "types/sanity";
import sanityImageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const imageUrlBuilder = sanityImageUrlBuilder(client);

export const slugQuery = `*[_type == "post" && slug.current == $slug]{'imageUrl': image.asset->url, ...}`;
export const getPostBySlug = async (slug: string) => {
  return await client.fetch<Post[]>(slugQuery, { slug });
};

const allSlugsQuery = `*[_type == "post"]{slug}`;
export const getPostSlugs = async () => {
  return await client.fetch<Post["slug"][]>(allSlugsQuery);
};

const allPostsSummaryQuery = `*[_type == "post"] | order(creationDate desc) {slug,title,image,description,creationDate,lastUpdatedDate,tags}`;
export const getPostsSummary = async () => {
  return await client.fetch<Post[]>(allPostsSummaryQuery);
};
