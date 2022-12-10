import React from "react";
import MarkdownIt from "markdown-it";
import { ICodeBlockFields } from "types/contentful";
import hljs from "highlight.js/lib/common";

import "./hljs-theme.css";
const md = new MarkdownIt({
  html: true,
  linkify: false,
});

const CodeSnippet = ({ code, language }: ICodeBlockFields) => {
  if (!code) return <div />;
  console.log("language", language);
  return (
    <pre
      className="whitespace-pre w-full overflow-auto font-mono"
      dangerouslySetInnerHTML={{
        __html: hljs.highlightAuto(code).value,
      }}
    />
  );
};

export default CodeSnippet;
