import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import cn from "classnames";
import Image from "next/image";
import CodeSnippet from "./CodeSnippet";
import { ReactNode } from "react";
import HyperlinkEntry from "./HyperlinkEntry";

const stringToId = (text?: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const options: Options = {
  renderText: (text) => {
    return text.split("\n").reduce((children: any, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      if (
        node.nodeType === BLOCKS.EMBEDDED_ENTRY &&
        node.data.target.fields.code
      )
        return <CodeSnippet markdown={node.data.target.fields.code} />;
      return <div>Embeded</div>;
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      let id;
      if (node.content[0].nodeType === "text") {
        id = node.content[0].value;
      }
      const stringId = stringToId(id);
      return (
        <a href={`#${stringId}`}>
          <h2
            className={cn(
              "group mb-4 mt-4 flex cursor-pointer scroll-m-24 items-center gap-2 not-prose"
            )}
            id={stringId}
          >
            <span>{children}</span>
            <Image
              src="/link.svg"
              className="opacity-0 transition-all group-hover:opacity-100"
              width={20}
              height={20}
              alt="link"
            />
          </h2>
        </a>
      );
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      let id;
      if (node.content[0].nodeType === "text") {
        id = node.content[0].value;
      }
      const stringId = stringToId(id);
      return (
        <a href={`#${stringId}`}>
          <h3
            className={cn(
              "group mb-1 mt-4 flex cursor-pointer scroll-m-24 items-center gap-1 not-prose"
            )}
            id={stringId}
          >
            <span>{children}</span>
            <Image
              src="/link.svg"
              className="opacity-0 transition-all group-hover:opacity-100"
              width={15}
              height={15}
              alt="link"
            />
          </h3>
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      if (
        node.nodeType === BLOCKS.EMBEDDED_ENTRY &&
        node.data.target.fields.code
      )
        return <CodeSnippet markdown={node.data.target.fields.code} />;
      return <div>Embeded</div>;
    },
    // [BLOCKS.HEADING_3]: (node, children) => (
    //   <h2 className={cn(headers.h3, "mb-1 mt-4")}>{children}</h2>
    // ),
    // [BLOCKS.HEADING_4]: (node, children) => (
    //   <h2 className={cn(headers.h4, "mb-1 mt-4")}>{children}</h2>
    // ),
    // [BLOCKS.HEADING_5]: (node, children) => (
    //   <h2 className={cn(headers.h5, "mb-1 mt-4")}>{children}</h2>
    // ),
    // [BLOCKS.HEADING_6]: (node, children) => (
    //   <h2 className={cn(headers.h6, "mb-1 mt-4")}>{children}</h2>
    // ),
    // [BLOCKS.PARAGRAPH]: (node, children) => {
    //   return <div>{children}</div>;
    // },
    [INLINES.HYPERLINK]: (node, children) => (
      // @ts-ignore: NextJS server component
      <HyperlinkEntry link={node.data.uri}>{children}</HyperlinkEntry>
    ),
  },
};

export const RichTextRender = ({ body }: { body: Document }): ReactNode => {
  if (!body) return null;
  return <>{documentToReactComponents(body, options)}</>;
};
