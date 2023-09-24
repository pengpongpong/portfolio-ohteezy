interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly SANITY_API_VERSION: string;
  readonly DOMAIN: string;
  readonly API_AWS: string;
  readonly URL_AWS: string;
  readonly GOOGLE_ID: string;
  readonly RESPONSE_HEADER_POLICY_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}