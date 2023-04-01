import { NextApiRequest, NextApiResponse } from "next";

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  res.setPreviewData({});
  // leiten den benutzer zur homepage
  // weiterleitung zu einer vorschaufähigen route
  if (req.url && typeof slug === "string") {
    res.writeHead(307, { Location: `/posts/${slug}` });
  }
  res.end();
}
