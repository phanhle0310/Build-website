import { Outlet, ScrollRestoration } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
