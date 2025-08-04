import { PostEntryCard } from "./components/PostEntryCard";
import HeaderSection from "./components/HeaderSection";

import { getPostsSummary } from "utils/sanity.client";
import FloatingParticles from "../components/floating-particles";

export default async function Home() {
  const posts = await getPostsSummary();

  return (
    <div className="flex h-full flex-col overflow-x-hidden overflow-y-hidden">
      <div className="absolute inset-0 pt-16 overflow-hidden">
        <FloatingParticles className="w-full h-full" />
      </div>
      <div className="relative m-auto flex flex-col items-center justify-center px-4 py-20 text-center text-4xl sm:px-6 md:px-8 md:text-6xl">
        <HeaderSection />
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
