import localFont from "next/font/local";

const proximaNova = localFont({
  src: [
    {
      path: "../node_modules/@dannymichel/proxima-nova/files/proxima-nova-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@dannymichel/proxima-nova/files/proxima-nova-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export { proximaNova };
