/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "mosaic.scdn.co" },
      { hostname: "image-cdn-ak.spotifycdn.com" },
      { hostname: "i.scdn.co" },
      { hostname: "t.scdn.co" },
      { hostname: "blend-playlist-covers.spotifycdn.com" },
    ],
  },
};

export default nextConfig;
