import { IBlogPostFields } from "types/contentful";
import { getPostBySlug, getPostSlugs } from "utils/contentful-client";
import cn from "classnames";
import { RichTextRender } from "./components/RichTextRender";
import { Comments } from "./components/Comments";
import { BlogHeader } from "./components/BlogHeader";

import { previewData } from "next/headers";
import { notFound } from "next/navigation";

export interface PostPageProps {
  params: { slug: IBlogPostFields["slug"] };
}

export async function generateMetadata({ params }: PostPageProps) {
  const slug = params.slug;
  const preview = Boolean(previewData());

  if (!slug) notFound();

  if (preview) console.log("Preview head", preview);
  const post = await getPostBySlug(slug, preview);

  if (!post) {
    notFound();
  }

  const { title, description } = post.fields;

  return {
    title,
    description,
    openGraph: {
      title,
      type: "article",
      url: `${process.env.BASE_URL}/posts/${slug}`,
      images: [
        {
          url: slug ? `${process.env.BASE_URL}/posts/${slug}/og` : undefined,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const postSlugs = await getPostSlugs();
  return postSlugs;
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const preview = Boolean(previewData());

  if (preview) console.log("Preview", preview);
  const post = await getPostBySlug(slug, preview);

  if (!post) {
    notFound();
  }

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

export const dynamicParams = true;
