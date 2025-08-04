import { ImageResponse } from "@vercel/og";
import { getPostBySlug, imageUrlBuilder } from "utils/sanity.client";
import { formatDate } from "utils/utils";

export const runtime = "edge";

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPostBySlug(slug!);

  const { title, tags, description, image, creationDate } = post.data[0];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div tw="flex w-full h-full bg-slate-100 border-solid border-8 border-teal-500 p-8 items-center">
          <div tw="flex w-full items-center bg-white px-8 py-12">
            <div tw="flex w-1/4 justify-center">
              {/* eslint-disable-next-line */}
              <img
                tw="w-50 h-50"
                alt=""
                src={imageUrlBuilder
                  .image(image!)
                  .width(200)
                  .height(200)
                  .toString()}
              />
            </div>
            <div tw="flex-1 flex flex-col">
              <div tw="text-6xl w-full">{title}</div>
              <div tw="text-xl mt-5 w-full">{formatDate(creationDate)}</div>
              <div tw="text-2xl mt-5 w-full">{description}</div>
              <div tw="flex mt-5">
                {tags?.map((tag: string, key: number) => (
                  <div key={key} tw="text-white px-2 py-1 mr-2 bg-slate-500">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
