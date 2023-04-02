import { previewData } from "next/headers";
import { notFound } from "next/navigation";
import {
  getPostSlugs,
  getPostBySlug,
  imageUrlBuilder,
} from "utils/sanity.client";
import { BlogPost } from "./components/BlogPost";
import { PreviewBlogPost } from "./components/PreviewBlogPost";
import PreviewSuspense from "../../components/PreviewSuspense";

export interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps) {
  const slug = params.slug;
  const preview = Boolean(previewData());

  if (!slug) notFound();

  if (preview) {
    return {
      title: "Post Preview",
    };
  }

  const posts = await getPostBySlug(slug);

  if (!posts || !posts.length) {
    notFound();
  }

  const { title } = posts[0];

  return {
    title,
    // description,
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
  const posts = await getPostSlugs();
  return posts.map((post) => ({
    slug: post?.current,
  }));
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const preview = Boolean(previewData());

  if (!slug) {
    notFound();
  }

  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewBlogPost slug={slug} />
      </PreviewSuspense>
    );
  }
  // const post = await getPostBySlug(slug, preview);
  const posts = await getPostBySlug(slug);

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
      imgUrl={imageUrlBuilder.image(image).width(200).height(200).toString()}
    />
  );
}
