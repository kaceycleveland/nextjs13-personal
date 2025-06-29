"use client";

import { useLiveQuery } from "next-sanity/preview";
import { previewImageUrlBuilder, slugQuery } from "utils/sanity.client";
import { BlogPost } from "./BlogPost";
import { SlugQueryResult } from "../../../../../sanity.types";

export const PreviewBlogPost = ({ posts }: { posts: SlugQueryResult }) => {
  const [data] = useLiveQuery(posts, slugQuery, {
    slug: posts[0].slug?.current,
  });

  if (!data || !data.length) {
    console.log("No slug found!");
    return <>No slug found!</>;
  }

  const post = data[0];

  console.log("initial data", posts[0]);
  console.log("live data", post);

  if (!post.title) {
    console.log("no title error", post.title);
    return <>No title</>;
  }

  if (!post.creationDate) {
    {
      console.log("no creation error", post.creationDate);
      return <>No creation date</>;
    }
  }

  if (!post.image) {
    {
      console.log("no image error", post.image);
      return <>No image</>;
    }
  }

  return (
    <BlogPost
      title={post.title}
      creationDate={post.creationDate}
      content={post.content}
      imageUrl={previewImageUrlBuilder
        .image(post.image)
        .width(200)
        .height(200)
        .toString()}
    />
  );
};
