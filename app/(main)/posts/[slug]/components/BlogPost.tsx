"use client";

import { PortableText } from "@portabletext/react";
import classNames from "classnames";
import { BlogHeader } from "./BlogHeader";
import { Comments } from "./Comments";
import { portableTextComponents } from "./portableTextComponents";

export interface BlogPostProps {
  title: string;
  creationDate: string;
  imageUrl: string;
  content: any;
}

export const BlogPost = ({
  title,
  creationDate,
  imageUrl,
  content,
}: BlogPostProps) => {
  return (
    <>
      <BlogHeader
        title={title}
        created={creationDate}
        imgUrl={imageUrl}
        author="Kacey Cleveland"
      />
      <div
        className={classNames(
          "w-full dark:text-slate-300 dark:prose-headings:text-slate-300"
        )}
      >
        <div>
          <PortableText value={content!} components={portableTextComponents} />
        </div>
        <Comments />
      </div>
    </>
  );
};
