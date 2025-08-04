import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { formatDate } from "utils/utils";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { imageUrlBuilder } from "utils/sanity.client";
import { AllPostsSummaryQueryResult } from "../../../sanity.types";

export const PostEntryCard = (props: AllPostsSummaryQueryResult[0]) => {
  const { slug, image, title, description, creationDate } = props;

  return (
    <div className="group prose w-full max-w-none text-left prose-h3:my-0 prose-p:my-1 prose-a:no-underline md:prose-h3:my-0 md:prose-p:my-1">
      <Link href={`/posts/${slug?.current}`}>
        <div className="grid w-full grid-cols-12 place-content-center gap-2 gap-x-4 gap-y-0 rounded-lg border border-gray-300 bg-gray-50/60 p-4 shadow-none duration-300 ease-in-out hover:-translate-y-1 hover:border-gray-400 hover:bg-white/80 hover:shadow-lg hover:backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/20 dark:hover:border-gray-600 dark:hover:bg-gray-900/40">
          <div className="col-span-3 row-span-2 flex sm:col-span-2">
            {image && (
              <Image
                className="my-0 object-contain align-middle"
                alt="Post image"
                src={imageUrlBuilder
                  .image(image)
                  .width(120)
                  .height(120)
                  .toString()}
                width={120}
                height={120}
              />
            )}
          </div>
          <div className="col-span-9 row-span-2 sm:col-span-10 sm:row-span-1">
            <div className={"flex w-full items-center justify-between gap-3"}>
              <div
                className={cn(
                  "flex h-full flex-1 flex-col gap-0 sm:flex-row sm:justify-between sm:gap-3"
                )}
              >
                <h3 className="dark:text-slate-300">{title}</h3>
                <p
                  className={
                    "whitespace-nowrap text-sm text-slate-400 dark:text-slate-300"
                  }
                >
                  {creationDate && formatDate(creationDate)}
                </p>
              </div>
            </div>
          </div>
          <div className={"col-span-12 md:col-span-10"}>
            <p className="dark:text-slate-300">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostEntryCard;
