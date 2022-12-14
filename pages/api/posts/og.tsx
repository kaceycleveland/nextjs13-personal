import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { formatDate } from "utils/utils";
import { createClient } from "contentful";
import { IBlogPostFields } from "types/contentful";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

export const config = {
  runtime: "experimental-edge",
};

if (!process.env.CONTENTFUL_SPACE) throw new Error("No Contentful Space");
if (!process.env.CONTENTFUL_DELIVERY_API_KEY)
  throw new Error("No Contentful Delivery API Key");
if (!process.env.CONTENTFUL_DELIVERY_PREVIEW_API_KEY)
  throw new Error("No Contentful Delivery Preview API Key");

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
  adapter: fetchAdapter,
});

export default async function OpenGraphImage(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") as string;
  const { fields, sys } = await client
    .getEntries<IBlogPostFields>({
      content_type: "blog-post",
      "fields.slug[in]": slug,
    })
    .then((resp) => resp.items[0]);
  const { title, coverImage, description, tags } = fields;
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
            <div tw="flex w-60 justify-center">
              <img alt="" src={`https:${coverImage?.fields.file.url}`} />
            </div>
            <div tw="flex-1 flex flex-col">
              <div tw="text-6xl w-full">{title}</div>
              <div tw="text-xl mt-5 w-full">{formatDate(sys.createdAt)}</div>
              <div tw="text-2xl mt-5 w-full">{description}</div>
              <div tw="flex mt-5">
                {tags?.map((tag, key) => (
                  <div
                    key={key}
                    tw="text-white px-2 py-1 mr-2"
                    style={{ backgroundColor: tag.fields.color }}
                  >
                    {tag.fields.tag}
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
