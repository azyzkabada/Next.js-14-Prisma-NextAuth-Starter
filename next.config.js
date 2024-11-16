/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Autorise les images externes des domaines spécifiés
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" }, // GitHub avatars
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google avatars
    ],
  },
};

// Exporte la configuration pour Next.js
module.exports = nextConfig;
