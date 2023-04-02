import Image from "next/image";
import { formatDate } from "utils/utils";

export const BlogHeader = ({
  imgUrl,
  title,
  created,
  author,
}: {
  imgUrl?: string;
  title?: string;
  created?: string;
  author?: string;
}) => {
  return (
    <div
      className={
        "mt-8 mb-4 flex flex-col items-center gap-3 border-b-2 border-dashed border-slate-200 pb-8 text-center md:flex-row md:text-left"
      }
    >
      <div className="lg:w-auto">
        <div
          className={
            "not-prose flex justify-center rounded-lg bg-slate-100 p-2"
          }
        >
          {imgUrl && (
            <Image
              className="overflow-hidden rounded-lg"
              src={imgUrl}
              width={140}
              height={140}
              alt="Post image"
            />
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="">
          <h1 className="mb-0 md:max-w-lg">{title}</h1>
          <h4 className="mt-2 mb-0">{formatDate(created)}</h4>
          <h4 className="mt-1">{author}</h4>
        </div>
      </div>
    </div>
  );
};
