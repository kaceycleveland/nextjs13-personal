import { PostEntryCard } from "./components/PostEntryCard";

import { getGithubActivity } from "utils/github-graphql";
import { GithubActivity } from "./components/GithubActivity";
import { getPostsSummary } from "utils/sanity.client";
import FloatingParticles from "../components/floating-particles";

export default async function Home() {
  const posts = await getPostsSummary();
  const githubActivity = await getGithubActivity();

  return (
    <div className="flex h-full flex-col">
      <FloatingParticles />
      <div className="relative m-auto flex flex-col items-center justify-center py-20 text-center text-4xl md:text-6xl">
        <GithubActivity activity={githubActivity} />
        <h1
          className={`animate-color-rotate bg-gradient-to-r from-orange-600 to-teal-600 bg-4x bg-clip-text bg-left-bottom p-2 font-monoton text-transparent`}
        >
          Kacey Cleveland
        </h1>
      </div>
      <div className="h-full w-full bg-slate-100 py-4 dark:bg-slate-800">
        <div className="prose mx-auto my-4 text-center">
          <h2 className="text-slate-500 dark:text-slate-300">Recent Posts</h2>
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
