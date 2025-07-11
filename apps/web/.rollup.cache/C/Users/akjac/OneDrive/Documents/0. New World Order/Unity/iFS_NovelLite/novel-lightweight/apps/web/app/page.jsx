"use client";
import RichTextEditor from "@/ui/RichTextEditor";
import { useState } from "react";
export default function EditorTestPage() {
    const [content, setContent] = useState("<p>Hello from iFStudio!</p>");
    return (<main className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">?? Editor Test</h1>

      <div className="border rounded p-4 bg-white text-black shadow-sm">
        <RichTextEditor content={content} onUpdate={(html) => {
            setContent(html);
            console.log("Editor updated:", html);
        }}/>
      </div>

      <p className="mt-6 text-sm text-gray-700">Live HTML output:</p>
      <pre className="mt-2 p-3 border rounded bg-gray-100 text-xs text-gray-800 whitespace-pre-wrap">
        {content}
      </pre>
    </main>);
}
//# sourceMappingURL=page.jsx.map