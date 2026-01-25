import "@/styles/globals.css";
import "@/styles/responsive.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/components/CartContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </CartProvider>
  );
}
