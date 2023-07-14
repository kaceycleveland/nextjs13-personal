import { DefaultDocumentNodeResolver } from "sanity/desk";
import Iframe from "sanity-plugin-iframe-pane";
import { SanityDocument } from "sanity";
import { Post } from "types/sanity";

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(post: Post) {
  const slug = post.slug?.current;
  return slug
    ? `${window.location.protocol}//${window.location.host}/api/draft?slug=${slug}&secret=${process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN}`
    : `${window.location.host}`;
}

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc as Post),
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
