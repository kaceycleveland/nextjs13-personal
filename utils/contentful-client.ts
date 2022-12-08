import { IBlogPostFields } from "types/contentful";
import { createClient } from "contentful";

if (!process.env.CONTENTFUL_SPACE) throw new Error("No Contentful Space");
if (!process.env.CONTENTFUL_DELIVERY_API_KEY)
  throw new Error("No Contentful Delivery API Key");

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
});

export const getPosts = async () => {
  const posts = await client.getEntries<IBlogPostFields>({
    content_type: "blog-post",
    order: "-sys.createdAt",
  });

  return posts.items;
};

export const getPostBySlug = async (slug: string) => {
  const post = await client.getEntries<IBlogPostFields>({
    content_type: "blog-post",
    "fields.slug[in]": slug,
  });
  return post.items[0];
};
