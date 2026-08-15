import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import { proximaNova } from "@/lib/fonts";
import { PagePreloader } from "@/components/landing-v2/PagePreloader";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = h.get("x-locale") === "en" ? "en" : "es";
  const htmlLang = locale === "en" ? "en" : "es";

  return (
    <html
      lang={htmlLang}
      className={`${proximaNova.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(document.getElementById("sozu-landing-preloader"))return;var d=document.createElement("div");d.id="sozu-landing-preloader";d.style.cssText="position:fixed;inset:0;z-index:9999;background:#0b1218;display:flex;align-items:center;justify-content:center";var i=document.createElement("img");i.src="/sozucapital_logo_tb.png";i.alt="";i.width=64;i.height=64;i.style.cssText="border-radius:22%;opacity:0.92";d.appendChild(i);document.body.insertBefore(d,document.body.firstChild)}catch(e){}})();(function(){function fade(){try{var el=document.getElementById("sozu-landing-preloader");if(!el)return;el.style.transition="opacity 180ms ease, filter 180ms ease";el.style.opacity="0";el.style.filter="blur(8px)";el.style.pointerEvents="none";setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},180)}catch(e){}}window.addEventListener("sozu:landing-ready",fade,{once:true})})();`,
          }}
        />
        <PagePreloader />
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
