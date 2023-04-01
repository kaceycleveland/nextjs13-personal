"use client";

import { notFound } from "next/navigation";
import { Post } from "types/sanity";
import { imageUrlBuilder, slugQuery } from "utils/sanity.client";
import { usePreview } from "utils/sanity.preview";
import { BlogPost } from "./BlogPost";

interface PreviewBlogPostProps {
  slug: string;
}

export const PreviewBlogPost = ({ slug }: PreviewBlogPostProps) => {
  const posts: Post[] = usePreview(null, slugQuery, { slug });

  if (!posts || !posts.length) {
    notFound();
  }

  const post = posts[0];

  const { title, image, content, creationDate } = post;

  if (!title || !creationDate || !image) return notFound();
  return (
    <BlogPost
      title={title}
      creationDate={creationDate}
      content={content}
      imgUrl={imageUrlBuilder.image(image).width(200).height(200).toString()}
    />
  );
};
