import "@/styles/globals.css";
import Providers from "./providers";
const title = "Novel – Notion-style WYSIWYG editor with AI-powered autocompletions";
const description = "Novel is a Notion-style WYSIWYG editor with AI-powered autocompletions. Built with Tiptap, OpenAI, and Vercel AI SDK.";
export const metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
    twitter: {
        title,
        description,
        card: "summary_large_image",
        creator: "@steventey",
    },
    metadataBase: new URL("https://novel.sh"),
    themeColor: "#ffffff",
};
export default function RootLayout({ children }) {
    return (<html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>);
}
//# sourceMappingURL=layout.jsx.map