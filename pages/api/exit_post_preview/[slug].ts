import { NextApiRequest, NextApiResponse } from "next";

export default function exitPreview(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  res.clearPreviewData({});
  if (req.url && typeof slug === "string") {
    res.writeHead(307, { Location: `/posts/${slug}` });
  }
  res.end();
}
