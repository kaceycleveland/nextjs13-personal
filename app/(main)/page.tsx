import { PostEntryCard } from "./components/PostEntryCard";

import { getPostsSummary } from "utils/sanity.client";
import FloatingParticles from "../components/floating-particles";

export default async function Home() {
  const posts = await getPostsSummary();

  return (
    <div className="flex h-full flex-col">
      <FloatingParticles />
      <div className="relative m-auto flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-8 text-center text-4xl md:text-6xl">
        <div className="prose prose-lg md:prose-xl text-left prose-slate dark:prose-invert max-w-2xl prose-h1:mb-1 prose-h2:mb-1 prose-h2:mt-1 prose-p:mt-1">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-slate-100">
            Hi there! 👋
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-orange-600 dark:text-orange-400">
            I'm Kacey
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A software developer passionate about building digital experiences
          </p>
        </div>
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
