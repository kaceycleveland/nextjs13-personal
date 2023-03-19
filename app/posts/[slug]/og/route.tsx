import { ImageResponse } from "@vercel/og";
import { IBlogPost } from "types/contentful";
import { formatDate } from "utils/utils";
import { PostPageProps } from "../page";

export const config = {
  runtime: "experimental-edge",
};

if (!process.env.CONTENTFUL_SPACE) throw new Error("No Contentful Space");
if (!process.env.CONTENTFUL_DELIVERY_API_KEY)
  throw new Error("No Contentful Delivery API Key");
if (!process.env.CONTENTFUL_DELIVERY_PREVIEW_API_KEY)
  throw new Error("No Contentful Delivery Preview API Key");

const space = process.env.CONTENTFUL_SPACE;
const environment = process.env.CONTENTFUL_ENVIRONMENT;
const accessToken = process.env.CONTENTFUL_DELIVERY_API_KEY;

export async function GET(request: Request, { params }: PostPageProps) {
  const slug = params.slug;
  console.info(
    `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?access_token=${accessToken}&content_type=blog-post&fields.slug[in]=${slug}`
  );
  const data = await fetch(
    `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?access_token=${accessToken}&content_type=blog-post&fields.slug[in]=${slug}`
  ).then((response) =>
    response.json().then((data) => {
      return data;
    })
  );
  const { fields, sys } = data.items[0] as IBlogPost;
  let { title, coverImage, description, tags } = fields;
  coverImage = data.includes["Asset"].find(
    (asset: any) => asset.sys.id === (coverImage as any).sys.id
  );
  tags = tags?.map((tag) => {
    const foundTag = data.includes["Entry"].find(
      (tagEntry: any) => tagEntry.sys.id === (tag as any).sys.id
    );
    return foundTag;
  });
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
              <img
                tw="w-50 h-50"
                alt=""
                src={`https:${coverImage?.fields.file.url}`}
              />
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
