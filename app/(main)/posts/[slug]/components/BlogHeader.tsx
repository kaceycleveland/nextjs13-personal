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
        "blog-post-title-container mt-8 mb-4 flex flex-col md:flex-row md:text-left items-center gap-3 pb-8 text-center border-b-2 border-slate-200 border-dashed"
      }
    >
      <div className="image-container lg:w-auto">
        <div
          className={
            "flex justify-center rounded-lg bg-slate-100 p-2 not-prose"
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
