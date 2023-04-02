const theme = {
  'code[class*="language-"]': {
    background: "var(--backgroundColor)",
    color: "var(--defaultColor)",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    MozTabSize: "2",
    OTabSize: "2",
    tabSize: "2",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    background: "var(--backgroundColor)",
    color: "var(--defaultColor)",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    MozTabSize: "2",
    OTabSize: "2",
    tabSize: "2",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    padding: "1em",
    margin: "0.5em 0",
    overflow: "auto",
    borderRadius: "0.3em",
  },
  'code[class*="language-"]::-moz-selection': {
    background: "var(--lightOne)",
    color: "inherit",
  },
  'code[class*="language-"] *::-moz-selection': {
    background: "var(--lightOne)",
    color: "inherit",
  },
  'pre[class*="language-"] *::-moz-selection': {
    background: "var(--lightOne)",
    color: "inherit",
  },
  'code[class*="language-"]::selection': {
    background: "var(--lightOne)",
    color: "inherit",
  },
  'code[class*="language-"] *::selection': {
    background: "var(--lightOne)",
    color: "inherit",
  },
  'pre[class*="language-"] *::selection': {
    background: "var(--lightOne)",
    color: "inherit",
  },
  ':not(pre) > code[class*="language-"]': {
    padding: "0.2em 0.3em",
    borderRadius: "0.3em",
    whiteSpace: "normal",
  },
  comment: {
    color: "var(--comment)",
    fontStyle: "italic",
  },
  prolog: {
    color: "var(--comment)",
  },
  cdata: {
    color: "var(--comment)",
  },
  doctype: {
    color: "var(--defaultColor)",
  },
  punctuation: {
    color: "var(--defaultColor)",
  },
  entity: {
    color: "var(--defaultColor)",
    cursor: "help",
  },
  "attr-name": {
    color: "var(--variableName)",
  },
  "class-name": {
    color: "var(--variableName)",
  },
  //   "maybe-class-name": {
  //     color: "var(--maybeVariableName)",
  //   },
  boolean: {
    color: "var(--variableName)",
  },
  constant: {
    color: "var(--variableName)",
  },
  number: {
    color: "var(--variableName)",
  },
  atrule: {
    color: "var(--variableName)",
  },
  keyword: {
    color: "var(--keyword)",
  },
  property: {
    color: "var(--tokenSelector)",
  },
  tag: {
    color: "var(--tokenSelector)",
  },
  symbol: {
    color: "var(--tokenSelector)",
  },
  deleted: {
    color: "var(--tokenSelector)",
  },
  important: {
    color: "var(--tokenSelector)",
  },
  selector: {
    color: "var(--tokenSelectorTwo)",
  },
  string: {
    color: "var(--tokenSelectorTwo)",
  },
  char: {
    color: "var(--tokenSelectorTwo)",
  },
  builtin: {
    color: "var(--tokenSelectorTwo)",
  },
  inserted: {
    color: "var(--tokenSelectorTwo)",
  },
  regex: {
    color: "var(--tokenSelectorTwo)",
  },
  "attr-value": {
    color: "var(--tokenSelectorTwo)",
  },
  "attr-value > .token.punctuation": {
    color: "var(--tokenSelectorTwo)",
  },
  variable: {
    color: "var(--variableColor)",
  },
  operator: {
    color: "var(--variableColor)",
  },
  function: {
    color: "var(--variableColor)",
  },
  url: {
    color: "var(--tokenFunction)",
  },
  "attr-value > .token.punctuation.attr-equals": {
    color: "var(--defaultColor)",
  },
  "special-attr > .token.attr-value > .token.value.css": {
    color: "var(--defaultColor)",
  },
  ".language-css .token.selector": {
    color: "var(--tokenSelector)",
  },
  ".language-css .token.property": {
    color: "var(--defaultColor)",
  },
  ".language-css .token.function": {
    color: "var(--tokenFunction)",
  },
  ".language-css .token.url > .token.function": {
    color: "var(--tokenFunction)",
  },
  ".language-css .token.url > .token.string.url": {
    color: "var(--tokenSelectorTwo)",
  },
  ".language-css .token.important": {
    color: "var(--keyword)",
  },
  ".language-css .token.atrule .token.rule": {
    color: "var(--keyword)",
  },
  ".language-javascript .token.operator": {
    color: "var(--keyword)",
  },
  ".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation":
    {
      color: "var(--punctuation)",
    },
  ".language-json .token.operator": {
    color: "var(--defaultColor)",
  },
  ".language-json .token.null.keyword": {
    color: "var(--variableName)",
  },
  ".language-markdown .token.url": {
    color: "var(--defaultColor)",
  },
  ".language-markdown .token.url > .token.operator": {
    color: "var(--defaultColor)",
  },
  ".language-markdown .token.url-reference.url > .token.string": {
    color: "var(--defaultColor)",
  },
  ".language-markdown .token.url > .token.content": {
    color: "var(--variableColor)",
  },
  ".language-markdown .token.url > .token.url": {
    color: "var(--tokenFunction)",
  },
  ".language-markdown .token.url-reference.url": {
    color: "var(--tokenFunction)",
  },
  ".language-markdown .token.blockquote.punctuation": {
    color: "var(--comment)",
    fontStyle: "italic",
  },
  ".language-markdown .token.hr.punctuation": {
    color: "var(--comment)",
    fontStyle: "italic",
  },
  ".language-markdown .token.code-snippet": {
    color: "var(--tokenSelectorTwo)",
  },
  ".language-markdown .token.bold .token.content": {
    color: "var(--variableName)",
  },
  ".language-markdown .token.italic .token.content": {
    color: "var(--keyword)",
  },
  ".language-markdown .token.strike .token.content": {
    color: "var(--tokenSelector)",
  },
  ".language-markdown .token.strike .token.punctuation": {
    color: "var(--tokenSelector)",
  },
  ".language-markdown .token.list.punctuation": {
    color: "var(--tokenSelector)",
  },
  ".language-markdown .token.title.important > .token.punctuation": {
    color: "var(--tokenSelector)",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  namespace: {
    Opacity: "0.8",
  },
  "token.tab:not(:empty):before": {
    color: "var(--tokenWhitespace)",
  },
  "token.cr:before": {
    color: "var(--tokenWhitespace)",
  },
  "token.lf:before": {
    color: "var(--tokenWhitespace)",
  },
  "token.space:before": {
    color: "var(--tokenWhitespace)",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item": {
    marginRight: "0.4em",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
    background: "var(--lightOne)",
    color: "var(--toolbarText)",
    padding: "0.1em 0.4em",
    borderRadius: "0.3em",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
    background: "var(--lightOne)",
    color: "var(--toolbarText)",
    padding: "0.1em 0.4em",
    borderRadius: "0.3em",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
    background: "var(--lightOne)",
    color: "var(--toolbarText)",
    padding: "0.1em 0.4em",
    borderRadius: "0.3em",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
  },
  ".line-highlight.line-highlight": {
    background: "hsla(230, 8%, 24%, 0.05)",
  },
  ".line-highlight.line-highlight:before": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
    padding: "0.1em 0.6em",
    borderRadius: "0.3em",
    boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)",
  },
  ".line-highlight.line-highlight[data-end]:after": {
    background: "var(--lightOne)",
    color: "var(--defaultColor)",
    padding: "0.1em 0.6em",
    borderRadius: "0.3em",
    boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.2)",
  },
  "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":
    {
      backgroundColor: "hsla(230, 8%, 24%, 0.05)",
    },
  ".line-numbers.line-numbers .line-numbers-rows": {
    borderRightColor: "var(--tokenWhitespace)",
  },
  ".command-line .command-line-prompt": {
    borderRightColor: "var(--tokenWhitespace)",
  },
  ".line-numbers .line-numbers-rows > span:before": {
    color: "var(--lineNumbers)",
  },
  ".command-line .command-line-prompt > span:before": {
    color: "var(--lineNumbers)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-1": {
    color: "var(--tokenSelector)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-5": {
    color: "var(--tokenSelector)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-9": {
    color: "var(--tokenSelector)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-2": {
    color: "var(--tokenSelectorTwo)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-6": {
    color: "var(--tokenSelectorTwo)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-10": {
    color: "var(--tokenSelectorTwo)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-3": {
    color: "var(--variableColor)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-7": {
    color: "var(--variableColor)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-11": {
    color: "var(--variableColor)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-4": {
    color: "var(--keyword)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-8": {
    color: "var(--keyword)",
  },
  ".rainbow-braces .token.token.punctuation.brace-level-12": {
    color: "var(--keyword)",
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
    backgroundColor: "var(--deleteDiffOne)",
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
    backgroundColor: "var(--deleteDiffOne)",
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection":
    {
      backgroundColor: "var(--deleteDiffTwo)",
    },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection":
    {
      backgroundColor: "var(--deleteDiffTwo)",
    },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection":
    {
      backgroundColor: "var(--deleteDiffTwo)",
    },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection":
    {
      backgroundColor: "var(--deleteDiffTwo)",
    },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection": {
    backgroundColor: "var(--deleteDiffTwo)",
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection": {
    backgroundColor: "var(--deleteDiffTwo)",
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection": {
    backgroundColor: "var(--deleteDiffTwo)",
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection": {
    backgroundColor: "var(--deleteDiffTwo)",
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
    backgroundColor: "var(--insertDiffOne)",
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
    backgroundColor: "var(--insertDiffOne)",
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection":
    {
      backgroundColor: "var(--insertDiffTwo)",
    },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection":
    {
      backgroundColor: "var(--insertDiffTwo)",
    },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection":
    {
      backgroundColor: "var(--insertDiffTwo)",
    },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection":
    {
      backgroundColor: "var(--insertDiffTwo)",
    },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection": {
    backgroundColor: "var(--insertDiffTwo)",
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection": {
    backgroundColor: "var(--insertDiffTwo)",
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection": {
    backgroundColor: "var(--insertDiffTwo)",
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection": {
    backgroundColor: "var(--insertDiffTwo)",
  },
  ".prism-previewer.prism-previewer:before": {
    borderColor: "hsl(0, 0, 95%)",
  },
  ".prism-previewer-gradient.prism-previewer-gradient div": {
    borderColor: "hsl(0, 0, 95%)",
    borderRadius: "0.3em",
  },
  ".prism-previewer-color.prism-previewer-color:before": {
    borderRadius: "0.3em",
  },
  ".prism-previewer-easing.prism-previewer-easing:before": {
    borderRadius: "0.3em",
  },
  ".prism-previewer.prism-previewer:after": {
    borderTopColor: "hsl(0, 0, 95%)",
  },
  ".prism-previewer-flipped.prism-previewer-flipped.after": {
    borderBottomColor: "hsl(0, 0, 95%)",
  },
  ".prism-previewer-angle.prism-previewer-angle:before": {
    background: "var(--white)",
  },
  ".prism-previewer-time.prism-previewer-time:before": {
    background: "var(--white)",
  },
  ".prism-previewer-easing.prism-previewer-easing": {
    background: "var(--white)",
  },
  ".prism-previewer-angle.prism-previewer-angle circle": {
    stroke: "var(--defaultColor)",
    strokeOpacity: "1",
  },
  ".prism-previewer-time.prism-previewer-time circle": {
    stroke: "var(--defaultColor)",
    strokeOpacity: "1",
  },
  ".prism-previewer-easing.prism-previewer-easing circle": {
    stroke: "var(--defaultColor)",
    fill: "transparent",
  },
  ".prism-previewer-easing.prism-previewer-easing path": {
    stroke: "var(--defaultColor)",
  },
  ".prism-previewer-easing.prism-previewer-easing line": {
    stroke: "var(--defaultColor)",
  },
};

export default theme;
