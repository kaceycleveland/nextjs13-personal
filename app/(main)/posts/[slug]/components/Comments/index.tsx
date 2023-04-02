"use client";

import useUtterances from "./useUtterances";

export const Comments = () => {
  const { inViewRef, utterancesRef, loaded } = useUtterances({
    repo: "kleveland/next-personal-site",
  });
  return (
    <div ref={inViewRef}>
      {!loaded && <div>Loading...</div>}
      <div ref={utterancesRef}></div>
    </div>
  );
};
