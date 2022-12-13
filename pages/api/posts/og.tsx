import type { NextApiRequest, NextApiResponse } from "next";
import { getAbsoluteURL } from "utils/utils";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  const relativeUrl = (req.query["path"] as string) || "";
  const url = getAbsoluteURL(relativeUrl);
  await page.goto(url, { waitUntil: "networkidle0" });
  const data = await page.screenshot({
    type: "png",
  });
  await browser.close();
  // Set the s-maxage property which caches the images then on the Vercel edge
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  // write the image to the response with the specified Content-Type
  res.end(data);
}
