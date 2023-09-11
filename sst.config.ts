import type { SSTConfig } from "sst";
import { AstroSite,type StackContext } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "oh-teezy-portfolio",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }: StackContext) {

      const site = new AstroSite(stack, "site", {
        environment: {
          PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID!,
          PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET!,
          SANITY_API_VERSION: process.env.SANITY_API_VERSION!,
          DOMAIN: "https://mp-galerie.com",
          API_AWS: process.env.API_AWS!,
          URL_AWS: process.env.URL_AWS!,
          GOOGLE_ID: process.env.GOOGLE_ID!,
        },
        customDomain: {
          domainName: "mp-galerie.com",
          domainAlias: "www.mp-galerie.com"
        }
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
