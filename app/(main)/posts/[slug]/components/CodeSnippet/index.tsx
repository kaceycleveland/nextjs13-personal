import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/common";

import "./hljs-theme.css";
const md = new MarkdownIt({
  html: true,
  linkify: false,
});

const CodeSnippet = (props: any) => {
  console.log(props);
  const { code } = props.value;
  if (!code) return <div />;
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
