import { createBrowserRouter } from "react-router";
import { RootLayout } from "../components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import("../pages/HomePage")).HomePage }),
      },
      {
        path: "spaces",
        lazy: async () => ({ Component: (await import("../pages/SpacesPage")).SpacesPage }),
      },
      {
        path: "booking",
        lazy: async () => ({ Component: (await import("../pages/BookingPage")).BookingPage }),
      },
      {
        path: "menu",
        lazy: async () => ({ Component: (await import("../pages/MenuPage")).MenuPage }),
      },
      {
        path: "membership",
        lazy: async () => ({ Component: (await import("../pages/MembershipPage")).MembershipPage }),
      },
      {
        path: "about",
        lazy: async () => ({ Component: (await import("../pages/AboutPage")).AboutPage }),
      },
      {
        path: "contact",
        lazy: async () => ({ Component: (await import("../pages/ContactPage")).ContactPage }),
      },
      {
        path: "*",
        lazy: async () => ({ Component: (await import("../pages/NotFoundPage")).NotFoundPage }),
      },
    ],
  },
]);
