import { IBlogPostFields } from "types/contentful";
import { createClient } from "contentful";

const clientCreator = (preview = false) => {
  if (!process.env.CONTENTFUL_SPACE) throw new Error("No Contentful Space");
  if (!process.env.CONTENTFUL_DELIVERY_API_KEY)
    throw new Error("No Contentful Delivery API Key");
  if (!process.env.CONTENTFUL_DELIVERY_PREVIEW_API_KEY)
    throw new Error("No Contentful Delivery Preview API Key");

  return createClient({
    space: process.env.CONTENTFUL_SPACE,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: preview
      ? process.env.CONTENTFUL_DELIVERY_PREVIEW_API_KEY
      : process.env.CONTENTFUL_DELIVERY_API_KEY,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
  });
};

const client = clientCreator();

export const getPosts = async () => {
  const posts = await client
    .getEntries<IBlogPostFields>({
      content_type: "blog-post",
      order: "-sys.createdAt",
    })
    .catch((e) => {
      console.log(e);
    });

  return posts?.items.length ? posts.items : undefined;
};

export const getPostSlugs = async () => {
  const posts = await client
    .getEntries<Pick<IBlogPostFields, "slug">>({
      content_type: "blog-post",
      select: "fields.slug",
      order: "-sys.createdAt",
    })
    .catch((e) => {
      console.log(e);
    });

  return posts && posts.items.length
    ? posts.items.map((item) => item.fields)
    : undefined;
};

export const getPostBySlug = async (slug?: string, preview = false) => {
  let usedClient = preview ? clientCreator(preview) : client;
  const post = await usedClient
    .getEntries<IBlogPostFields>({
      content_type: "blog-post",
      "fields.slug[in]": slug,
    })
    .catch((e) => {
      console.log(e);
    });
  return post?.items.length ? post.items[0] : undefined;
};
