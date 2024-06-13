/** @type {import('next').NextConfig} */
const nextConfig = {
  middleware: [
    {
      matcher: '/:path*',
      src: 'middleware.ts'
    }
  ]
}

export default nextConfig
