// Root layout — minimal pass-through.
// The actual <html> and <body> are defined in app/[locale]/layout.tsx
// which is the locale-aware root for all routes.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
