import { IBlogPostFields } from "types/contentful";
import { getPostBySlug, getPostSlugs } from "utils/contentful-client";
import cn from "classnames";
import { RichTextRender } from "./components/RichTextRender";
import { Comments } from "./components/Comments";
import { BlogHeader } from "./components/BlogHeader";

import { previewData } from "next/headers";

export interface PostPageProps {
  params: { slug: IBlogPostFields["slug"] };
}

export async function generateStaticParams() {
  return await getPostSlugs();
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const preview = Boolean(previewData());

  if (preview) console.log("Preview", preview);

  const post = await getPostBySlug(slug, preview);

  const { title, coverImage, body, author } = post.fields;

  return (
    <>
      <BlogHeader
        imgUrl={coverImage?.fields.file.url}
        title={title}
        author={author}
        created={post.sys.createdAt}
      />
      <div className={cn("blog-post-content-container w-full")}>
        {/* <CollectionRow block={pageBlock.value} /> */}
        <div className={"blog-post-container"}>
          {/* @ts-ignore: NextJS server component */}
          <RichTextRender body={body} />
          {/* <TableOfContents toc={tableOfContents} /> */}
        </div>
        <Comments />
      </div>
    </>
  );
}
