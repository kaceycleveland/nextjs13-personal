import { PostEntryCard } from "./components/PostEntryCard";

import { getGithubActivity } from "utils/github-graphql";
import { GithubActivity } from "./components/GithubActivity";
import { getPostsSummary } from "utils/sanity.client";

export default async function Home() {
  const posts = await getPostsSummary();
  const githubActivity = await getGithubActivity();

  return (
    <div className="flex h-full flex-col">
      <div className="relative max-w-none overflow-hidden pt-12 pb-10 sm:pb-20">
        <div className="relative m-auto flex flex-col-reverse items-center justify-center text-center text-4xl md:text-6xl">
          <h1
            className={`animate-color-rotate bg-gradient-to-r from-orange-600 to-teal-600 bg-4x bg-clip-text bg-left-bottom p-2 font-monoton text-transparent`}
          >
            Kacey Cleveland
          </h1>
          <GithubActivity activity={githubActivity} />
        </div>
      </div>
      <div className="h-full w-full bg-slate-100 py-4">
        <div className="prose mx-auto my-4 text-center">
          <h2 className="text-slate-500">Recent Posts</h2>
        </div>
        <div className="mx-auto flex flex-col gap-3 px-8 sm:max-w-[90%] sm:px-4 lg:max-w-3xl">
          {posts?.map((entry, index) => (
            <PostEntryCard key={"post-entry-" + index} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 240;
