import { NextApiRequest, NextApiResponse } from "next";

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  res.setPreviewData({});
  if (req.url && typeof slug === "string") {
    res.writeHead(307, { Location: `/posts/${slug}` });
  }
  res.end();
}
