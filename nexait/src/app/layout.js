import "./globals.css";

export const metadata = {
  title: "NexaIT",
  description: "NexaIT - Your trusted technology partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
