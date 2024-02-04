import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getPostSlugs,
  getPostBySlug,
  imageUrlBuilder,
} from "utils/sanity.client";
import { BlogPost } from "./components/BlogPost";
import { PreviewBlogPost } from "./components/PreviewBlogPost";
import PreviewProvider from "app/(main)/components/PreviewProvider";

export interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const slug = params.slug;
  const { isEnabled } = draftMode();

  if (!slug) notFound();

  if (isEnabled) {
    return {
      title: "Post Preview",
    };
  }

  const posts = await getPostBySlug(slug);

  if (!posts || !posts.length) {
    notFound();
  }

  const { title } = posts[0];

  const images = slug
    ? [
        {
          url: `${process.env.BASE_URL}/posts/${slug}/og`,
          width: 1200,
          height: 630,
        },
      ]
    : undefined;

  return {
    title,
    // description,
    openGraph: {
      title,
      siteName: title,
      type: "article",
      url: `${process.env.BASE_URL}/posts/${slug}`,
      images,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPostSlugs();
  return posts.map((post) => ({
    slug: post?.current,
  }));
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const { isEnabled } = draftMode();
  const preview = isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;

  if (!slug) {
    notFound();
  }

  const posts = await getPostBySlug(slug, isEnabled);

  if (isEnabled && preview?.token) {
    console.log("PREVIEW LOADING", preview.token);
    return (
      <PreviewProvider token={preview.token}>
        <PreviewBlogPost posts={posts} />
      </PreviewProvider>
    );
  }

  // const post = await getPostBySlug(slug, preview);

  if (!posts || !posts.length) {
    notFound();
  }

  const post = posts[0];

  const { title, image, content, creationDate } = post;

  if (!title || !creationDate || !content || !image) return notFound();

  return (
    <BlogPost
      title={title}
      creationDate={creationDate}
      content={content!}
      imageUrl={imageUrlBuilder.image(image).width(200).height(200).toString()}
    />
  );
}
