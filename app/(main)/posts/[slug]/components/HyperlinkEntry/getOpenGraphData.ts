import { cache } from "react";
import ogs from "open-graph-scraper";

interface OgMetadata {
  ogTitle?: string;
  ogDescription?: string;
  requestUrl: string;
  ogImage?: OgImage;
}

interface OgImage {
  url: string;
  width: number | null;
  height: number | null;
  type: string | null;
}

export const getOpenGraphData = cache(async (link: string) => {
  const { error, result, response } = await ogs({ url: link }).catch(
    (err) => err
  );

  return result as OgMetadata;
});
