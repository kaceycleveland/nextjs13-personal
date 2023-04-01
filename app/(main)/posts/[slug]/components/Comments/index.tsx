"use client";

import useUtterances from "./useUtterances";

export const Comments = () => {
  const { inViewRef, utterancesRef, loaded } = useUtterances({
    repo: "kleveland/next-personal-site",
  });
  return (
    <div className={"comments-in-view"} ref={inViewRef}>
      {!loaded && <div className={"loading-comments"}>Loading...</div>}
      <div ref={utterancesRef} className={"comments-render-container"}></div>
    </div>
  );
};
