import "./styles/reset.scss";
import "./styles/globals.scss";

export const metadata = {
  title: "DORA Metrics Dashboard",
  description: "DORA Metrics Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
