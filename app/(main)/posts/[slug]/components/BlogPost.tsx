"use client";

import { PortableText } from "@portabletext/react";
import classNames from "classnames";
import { BlogHeader } from "./BlogHeader";
import { Comments } from "./Comments";
import { portableTextComponents } from "./portableTextComponents";

interface BlogPostProps {
  title: string;
  creationDate: string;
  imgUrl: string;
  content: any;
}

export const BlogPost = ({
  title,
  creationDate,
  imgUrl,
  content,
}: BlogPostProps) => {
  return (
    <>
      <BlogHeader
        title={title}
        created={creationDate}
        imgUrl={imgUrl}
        author="Kacey Cleveland"
      />
      <div className={classNames("blog-post-content-container w-full")}>
        {/* <CollectionRow block={pageBlock.value} /> */}
        <div className={"blog-post-container"}>
          <PortableText value={content!} components={portableTextComponents} />
          {/* @ts-ignore: NextJS server component */}
          {/* // <RichTextRender body={body} /> */}
          {/* <TableOfContents toc={tableOfContents} /> */}
        </div>
        <Comments />
      </div>
    </>
  );
};
