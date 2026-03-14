import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarBackground } from "@/components/StarBackground";
import { CursorEffect } from "@/components/CursorEffect";
import { PageTransitionWrapper } from "@/components/PageTransitionWrapper";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Monica Lai",
  description: "Personal portfolio website showcasing my projects and experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cormorant.className}>
        {/* Global star background - layer 0 */}
        <StarBackground />

        {/* Global cursor effect - layer 50 */}
        <CursorEffect />

        <div className="flex flex-col min-h-screen relative z-10">
          {/* Navigation bar appears on all pages */}
          <Navbar />

          {/* Main content area with page transitions */}
          <main className="flex-1">
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </main>

          {/* Footer appears on all pages */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
