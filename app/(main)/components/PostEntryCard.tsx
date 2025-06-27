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
        <div className="grid w-full grid-cols-12 place-content-center gap-2 gap-x-4 gap-y-0 rounded-lg border bg-slate-50 p-4 shadow-none duration-300 ease-in-out hover:border-transparent hover:bg-white hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
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
              <span className="hidden items-center justify-end transition-all group-hover:translate-x-0.5 group-hover:text-sky-400 dark:group-hover:text-sky-300 md:flex md:justify-start">
                <span>Read more</span>
                <ChevronRightIcon className="inline-block h-4 w-4" />
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostEntryCard;
