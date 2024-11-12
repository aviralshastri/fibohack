"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { CubeIcon } from "@radix-ui/react-icons";
import { BotIcon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  chatbot?: boolean;
}

const Layout = ({
  children,
  showNavbar = true,
  showFooter = true,
  chatbot = true
}: LayoutProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isHomePage && showNavbar && (
        <header>
          <Navbar />
        </header>
      )}
      <main className="flex-grow">{children}</main>
      {!isHomePage && showFooter && (
        <footer>
          <Footer />
        </footer>
      )}
      <Link
        href="/tools"
        className="fixed bottom-5 left-5 z-50 font-bold text-2xl text-white bg-black px-4 py-2 rounded-full flex items-center"
      >
        <CubeIcon className="w-7 h-7 mr-2" />
        <span>TOOLS</span>
      </Link>
      
      {chatbot && (
        <Link
          href="/tools/chatbot"
          className="fixed bottom-5 right-5 z-50 font-bold text-2xl text-white bg-black px-4 py-2 rounded-full flex items-center space-x-2"
        >
          <BotIcon size={35} />
          <span>Jal Saathi</span>
        </Link>
      )}
    </div>
  );
};

export default Layout;