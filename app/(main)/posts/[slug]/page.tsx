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
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: PostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const { isEnabled } = await draftMode();

  if (!slug) notFound();

  if (isEnabled) {
    return {
      title: "Post Preview",
    };
  }

  const postResult = await getPostBySlug(slug, isEnabled);

  if (!postResult.data || !postResult.data.length) {
    notFound();
  }

  const post = postResult.data[0];
  const { title } = post[0];

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
    slug: post?.slug?.current,
  }));
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;

  const { slug } = params;

  const { isEnabled } = await draftMode();
  const preview = isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  console.log("slug", slug, isEnabled);
  if (!slug) {
    notFound();
  }

  const postResult = await getPostBySlug(slug, isEnabled);

  console.log("posts", postResult);

  // if (isEnabled && preview?.token) {
  //   console.log("PREVIEW LOADING", preview.token);
  //   return (
  //     <PreviewProvider token={preview.token}>
  //       <PreviewBlogPost posts={posts} />
  //     </PreviewProvider>
  //   );
  // }

  // const post = await getPostBySlug(slug, preview);

  if (!postResult.data || !postResult.data.length) {
    notFound();
  }

  const post = postResult.data[0];

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
