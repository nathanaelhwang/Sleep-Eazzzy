import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";

export const metadata: Metadata = {
  title: "Sleep Eazzzy — a free CBT-I patient program",
  description:
    "A free, self-paced Cognitive Behavioral Therapy for Insomnia program. Seven short modules — most people see real change in 2 to 4 weeks. No prescription required.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
