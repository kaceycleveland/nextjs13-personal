import { getPostsSummary } from "utils/sanity.client";
import PostEntryCard from "app/(main)/components/PostEntryCard";

export default async function PostPage() {
  const posts = await getPostsSummary();
  return (
    <div className="prose mx-auto flex flex-col gap-3 px-8 text-center sm:max-w-[90%] sm:px-4 lg:max-w-3xl">
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
