import { getImageDimensions } from "@sanity/asset-utils";
import { imageUrlBuilder } from "utils/sanity.client";
import CodeSnippet from "./CodeSnippet";
import Image from "next/image";

const ImageComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      unoptimized
      src={imageUrlBuilder.image(value).fit("max").auto("format").url()}
      alt={value.alt || " "}
      loading="lazy"
      width={width}
      height={height}
    />
  );
};

export const portableTextComponents = {
  types: {
    image: ImageComponent,
    codeBlock: CodeSnippet,
  },
};
