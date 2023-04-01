import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { formatDate } from "utils/utils";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Post } from "types/sanity";
import { imageUrlBuilder } from "utils/sanity.client";

export const PostEntryCard = (props: Post) => {
  const { slug, image, title, description, creationDate } = props;

  return (
    <div className="group prose prose-a:no-underline prose-h3:my-0 prose-p:my-1 md:prose-h3:my-0 md:prose-p:my-1 w-full max-w-none text-left">
      <Link href={`/posts/${slug?.current}`} className="blog-entry-title">
        <div className="grid grid-cols-12 gap-x-4 gap-y-0 place-content-center trasition-all border-1 w-full gap-2 rounded-lg border bg-slate-50 p-4 shadow-none duration-300 ease-in-out hover:border-transparent hover:bg-white hover:shadow-lg">
          <div className="col-span-3 row-span-2 sm:col-span-2 flex align-center">
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
            <div
              className={
                "blog-entry-text-container flex w-full items-center justify-between gap-3"
              }
            >
              <div
                className={cn(
                  "blog-entry-title-container flex h-full flex-1 flex-col gap-0 sm:flex-row sm:justify-between sm:gap-3"
                )}
              >
                <h3 className="blog-entry-title">{title}</h3>
                <p
                  className={
                    "blog-entry-date whitespace-nowrap text-sm text-slate-400"
                  }
                >
                  {creationDate && formatDate(creationDate)}
                </p>
              </div>
            </div>
          </div>
          <div className={"blog-entry-description col-span-12 md:col-span-10"}>
            <p>
              {description}
              <span className="items-center justify-end hidden md:flex md:justify-start group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all">
                <span>Read more</span>
                <ChevronRightIcon className="h-4 w-4 inline-block" />
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostEntryCard;
