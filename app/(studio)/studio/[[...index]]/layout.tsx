import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

/**
 * Temporary workaround for setting metadata for the Studio.
 * implemented necessary data according to the following source code: https://github.com/sanity-io/next-sanity/blob/main/src/studio/head/NextStudioHead.tsx
 * @todo remove this workaround when the issue is fixed
 * @see https://github.com/sanity-io/next-sanity/issues/333
 */
export const metadata: Metadata = {
  title: "Studio | EGGS Wiki",
  viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
  robots: "noindex",
};

export default function StudioLayout({ children }: PropsWithChildren) {
  return children;
}
