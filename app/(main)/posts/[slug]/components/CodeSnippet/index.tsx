import React from "react";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import theme from "./theme";
import "./syntax-theme.css";

const CodeSnippet = (props: any) => {
  const { code, language } = props.value;
  if (!code) return <div />;
  return (
    <div className="syntax-highlighter">
      <SyntaxHighlighter
        className="w-full overflow-auto whitespace-pre font-mono"
        language={language}
        style={theme as SyntaxHighlighterProps["style"]}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
