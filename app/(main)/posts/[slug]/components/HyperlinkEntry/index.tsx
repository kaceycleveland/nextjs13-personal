import { ReactNode } from "react";
import Link from "next/link";
import { getOpenGraphData } from "./getOpenGraphData";

const possibleDomains = ["kleveland.dev"];

interface HyperlinkEntryProps {
  link: string;
  children?: ReactNode;
}

export default async function HyperlinkEntry({
  link,
  children,
}: HyperlinkEntryProps) {
  const isOgp = link.endsWith("(ogp)");
  const passedLink = isOgp ? link.substring(0, link.length - 5) : link;
  const url = new URL(passedLink);

  const isLocalLink = possibleDomains.some(
    (domain) => url.hostname.indexOf(domain) >= 0
  );

  if (!isOgp) {
    if (isLocalLink) {
      return <Link href={url.pathname}>{children}</Link>;
    }
    return (
      <Link
        className="text-sky-400 hover:text-sky-700 hover:underline"
        href={passedLink}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </Link>
    );
  }

  const ogMetadata = await getOpenGraphData(passedLink);
  // const ogImage = ogMetadata.ogImage as OgImage;
  //   console.log(result);

  // if (isLocalLink) {
  //   console.log(url.pathname);
  //   return (
  //     <Link href={url.pathname}>
  //       <span className="flex flex-col prose-headings:mb-1 prose-headings:mt-0 prose-p:mb-2">
  //         <h3>{ogMetadata.ogTitle}</h3>
  //         <p>{ogMetadata.ogDescription}</p>
  //       </span>
  //     </Link>
  //   );
  // }

  return (
    <Link
      href={isLocalLink ? url.pathname : passedLink}
      className="my-2 flex cursor-pointer flex-col gap-2 rounded-lg border bg-slate-50 p-4 no-underline shadow-none duration-300 ease-in-out hover:border-transparent hover:bg-white hover:shadow-lg prose-headings:mb-1 prose-headings:mt-0 prose-p:mb-2"
    >
      {/** These need to be spans for some reason or else the server and client fail to match */}
      <span className="text-xl font-bold">{ogMetadata.ogTitle}</span>
      <span>{ogMetadata.ogDescription}</span>
    </Link>
  );
}
