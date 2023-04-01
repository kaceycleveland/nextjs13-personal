import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./utils/schemas/index.ts",
  outputPath: "./types/sanity.ts",
};

export default config;
