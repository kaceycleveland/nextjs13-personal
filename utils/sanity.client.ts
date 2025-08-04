import { defineQuery, groq, SanityClient } from "next-sanity";
import {
  AllPostsSummaryQueryResult,
  AllSlugsQueryResult,
  SlugQueryResult,
} from "sanity.types";
import sanityImageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity-lib/lib/client";
import { sanityFetch } from "../sanity-lib/lib/live";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const imageUrlBuilder = sanityImageUrlBuilder(client);
export const previewImageUrlBuilder = sanityImageUrlBuilder(client);

export const slugQuery = defineQuery(
  groq`*[_type == "post" && slug.current == $slug]{'imageUrl': image.asset->url, ...}`
);
export const getPostBySlug = async (slug: string, isDraft?: boolean) => {
  // TODO: Add back typing if possible
  return sanityFetch({ query: slugQuery, params: { slug } });
  // return await client.fetch<SlugQueryResult>(
  //   slugQuery,
  //   { slug },
  //   isDraft
  //     ? {
  //         perspective: "previewDrafts",
  //         useCdn: false,
  //         stega: true,
  //       }
  //     : undefined
  // );
};

const allSlugsQuery = defineQuery(groq`*[_type == "post"]{slug}`);
export const getPostSlugs = async () => {
  return await client.fetch<AllSlugsQueryResult>(allSlugsQuery);
};

const allPostsSummaryQuery = defineQuery(
  groq`*[_type == "post"] | order(creationDate desc) {slug,title,image,description,creationDate,lastUpdatedDate,tags}`
);
export const getPostsSummary = async () => {
  return await client.fetch<AllPostsSummaryQueryResult>(allPostsSummaryQuery);
};
