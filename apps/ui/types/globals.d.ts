declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

declare const __IS_PRODUCTION__: boolean;
