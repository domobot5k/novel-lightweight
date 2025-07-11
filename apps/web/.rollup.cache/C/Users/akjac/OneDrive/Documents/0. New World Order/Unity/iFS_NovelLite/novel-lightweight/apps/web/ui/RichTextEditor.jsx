import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SlashCommand from "../lib/editor/extensions/slash-command";
import Placeholder from "@tiptap/extension-placeholder";
export default function RichTextEditor({ content, onUpdate, }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            SlashCommand,
            Placeholder.configure({
                placeholder: "Start writing your page...",
            }),
        ],
        content: content || "",
        onUpdate: ({ editor }) => {
            onUpdate?.(editor.getHTML());
        },
    });
    return (<div className="border rounded p-2 min-h-[200px] bg-white text-black">
      <EditorContent editor={editor}/>
    </div>);
}
//# sourceMappingURL=RichTextEditor.jsx.map