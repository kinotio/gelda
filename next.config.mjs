/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_DATABASE_URL: process.env.SUPABASE_DATABASE_URL,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
}

export default nextConfig
