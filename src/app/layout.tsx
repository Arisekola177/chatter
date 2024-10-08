// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css" 
// import { SessionProvider } from "next-auth/react";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Chatter",
//   description: "Discover new ideas and share your own on Chatter, a dynamic platform for information exchange, discussion, and connection.",
// };


// export default async function RootLayout({
//   children,
//    session,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

 
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//       <SessionProvider session={session}>
//       <div className="flex flex-col bg-slate-800 min-h-screen">
//         <Navbar />
//         <div className="flex-grow ">
//         {children}
//         <ToastContainer />
//         </div>
//         <Footer/>
//         </div>
//         </SessionProvider>
//         </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatter",
  description: "Discover new ideas and share your own on Chatter, a dynamic platform for information exchange, discussion, and connection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
      
          <div className="flex flex-col bg-slate-800 min-h-screen">
            <Navbar />
            <div className="flex-grow">
              {children}
              <ToastContainer />
            </div>
            <Footer />
          </div>
     
      </body>
    </html>
  );
}
