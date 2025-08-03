import { PostEntryCard } from "./components/PostEntryCard";

import { getPostsSummary } from "utils/sanity.client";
import FloatingParticles from "../components/floating-particles";

export default async function Home() {
  const posts = await getPostsSummary();

  return (
    <div className="flex h-full flex-col">
      <div className="relative m-auto flex flex-col items-center justify-center px-4 py-20 text-center text-4xl sm:px-6 md:px-8 md:text-6xl">
        <FloatingParticles className="absolute left-1/2 -top-full md:-top-1/2" />
        <div className="prose prose-lg prose-slate max-w-2xl text-left dark:prose-invert md:prose-xl prose-h1:mb-1 prose-h2:my-1 prose-p:mt-1">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 md:text-5xl">
            Hi there! 👋
          </h1>
          <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 md:text-2xl">
            I&apos;m Kacey
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
            A software developer passionate about building digital experiences
          </p>
        </div>
      </div>
      <div className="h-full w-full py-4">
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
