import "./globals.css";

export const metadata = {
  title: "NexaIT",
  description: "NexaIT - Your trusted technology partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="..."
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
