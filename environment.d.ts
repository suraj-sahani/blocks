declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      IMAGEKIT_PRIVATE_KEY: string;
      IMAGEKIT_PUBLIC_KEY: string;
      SESSION_SECRET: string;
      NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: string;
      NEXT_PUBLIC_MAPBOX_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
