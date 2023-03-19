import { getPosts } from "utils/contentful-client";
import PostEntryCard from "app/components/PostEntryCard";

export default async function PostPage() {
  const posts = await getPosts();
  return (
    <div className="mx-auto text-center flex flex-col gap-3 px-8 sm:px-4 sm:max-w-[90%] lg:max-w-3xl prose">
      <h1>Posts</h1>
      {posts?.map((entry, index) => (
        <PostEntryCard key={"post-entry-" + index} {...entry} />
      ))}
    </div>
  );
}

export const metadata = {
  title: "Posts",
};
