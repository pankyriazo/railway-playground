declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST?: string;
      PORT?: number;
      RAILWAY_API_URL: string;
    }
  }
}

export {};
