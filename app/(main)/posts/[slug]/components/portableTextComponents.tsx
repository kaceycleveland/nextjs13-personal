import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { imageUrlBuilder } from "utils/sanity.client";
import CodeSnippet from "./CodeSnippet";

const ImageComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={imageUrlBuilder
        .image(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
};

export const portableTextComponents = {
  types: {
    image: ImageComponent,
    myCodeField: CodeSnippet,
  },
};
