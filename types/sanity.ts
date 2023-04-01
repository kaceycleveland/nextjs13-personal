import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Created — `date`
   *
   *
   */
  creationDate?: string;

  /**
   * Last Updated — `date`
   *
   *
   */
  lastUpdatedDate?: string;

  /**
   * Preview Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Tags — `array`
   *
   *
   */
  tags?: Array<SanityKeyed<string>>;

  /**
   * Content — `array`
   *
   *
   */
  content?: Array<
    | SanityKeyed<SanityBlock>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;

        /**
       * Alternative text — `text`
       *
       * Some of your visitors cannot see images, 
              be they blind, color-blind, low-sighted; 
              alternative text is of great help for those 
              people that can rely on it to have a good idea of 
              what's on your page.
       */
        alt?: string;

        /**
         * Is Inline? — `boolean`
         *
         *
         */
        isInline?: boolean;
      }>
    | SanityKeyed<Code>
  >;
}

export type Documents = Post;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Code = any;
