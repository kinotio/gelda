declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'

      SUPABASE_URL: string
      SUPABASE_ANON_KEY: string
      SUPABASE_DATABASE_URL: string

      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
