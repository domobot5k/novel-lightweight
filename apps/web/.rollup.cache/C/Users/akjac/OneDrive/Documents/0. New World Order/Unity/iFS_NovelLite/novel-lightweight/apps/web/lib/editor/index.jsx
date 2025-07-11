"use client";
import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { defaultEditorProps } from "./props";
import { defaultExtensions } from "./extensions";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { defaultEditorContent } from "./default-content";
import { EditorBubbleMenu } from "./bubble-menu";
import { getPrevText } from "@/lib/editor";
import { ImageResizer } from "./extensions/image-resizer";
import { NovelContext } from "./provider";
export default function Editor({ completionApi = "/api/generate", className = "novel-relative novel-min-h-[500px] novel-w-full novel-max-w-screen-lg novel-border-stone-200 novel-bg-white sm:novel-mb-[calc(20vh)] sm:novel-rounded-lg sm:novel-border sm:novel-shadow-lg", defaultValue = defaultEditorContent, extensions = [], editorProps = {}, onUpdate = () => { }, onDebouncedUpdate = () => { }, debounceDuration = 750, storageKey = "novel__content", disableLocalStorage = false, handleImageUpload, }) {
    const [content, setContent] = useLocalStorage(storageKey, defaultValue);
    const [hydrated, setHydrated] = useState(false);
    const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
        const json = editor.getJSON();
        onDebouncedUpdate(editor);
        if (!disableLocalStorage) {
            setContent(json);
        }
    }, debounceDuration);
    const editor = useEditor({
        extensions: [...defaultExtensions, ...extensions],
        editorProps: {
            ...defaultEditorProps,
            ...editorProps,
        },
        onUpdate: (e) => {
            const selection = e.editor.state.selection;
            const lastTwo = getPrevText(e.editor, {
                chars: 2,
            });
            if (lastTwo === "++" && !isLoading) {
                e.editor.commands.deleteRange({
                    from: selection.from - 2,
                    to: selection.from,
                });
                complete(getPrevText(e.editor, {
                    chars: 5000,
                }));
                // complete(e.editor.storage.markdown.getMarkdown());
            }
            else {
                onUpdate(e.editor);
                debouncedUpdates(e);
            }
        },
        autofocus: "end",
    });
    const { complete, completion, isLoading, stop } = useCompletion({
        id: "novel",
        api: completionApi,
        onFinish: (_prompt, completion) => {
            editor?.commands.setTextSelection({
                from: editor.state.selection.from - completion.length,
                to: editor.state.selection.from,
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    const prev = useRef("");
    // Insert chunks of the generated text
    useEffect(() => {
        const diff = completion.slice(prev.current.length);
        prev.current = completion;
        editor?.commands.insertContent(diff);
    }, [isLoading, editor, completion]);
    useEffect(() => {
        // if user presses escape or cmd + z and it's loading,
        // stop the request, delete the completion, and insert back the "++"
        const onKeyDown = (e) => {
            if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
                stop();
                if (e.key === "Escape") {
                    editor?.commands.deleteRange({
                        from: editor.state.selection.from - completion.length,
                        to: editor.state.selection.from,
                    });
                }
                editor?.commands.insertContent("++");
            }
        };
        const mousedownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            stop();
            if (window.confirm("AI writing paused. Continue?")) {
                complete(editor?.getText() || "");
            }
        };
        if (isLoading) {
            document.addEventListener("keydown", onKeyDown);
            window.addEventListener("mousedown", mousedownHandler);
        }
        else {
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("mousedown", mousedownHandler);
        }
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("mousedown", mousedownHandler);
        };
    }, [stop, isLoading, editor, complete, completion.length]);
    // Default: Hydrate the editor with the content from localStorage.
    // If disableLocalStorage is true, hydrate the editor with the defaultValue.
    useEffect(() => {
        if (!editor || hydrated)
            return;
        const value = disableLocalStorage ? defaultValue : content;
        if (value) {
            editor.commands.setContent(value);
            setHydrated(true);
        }
    }, [editor, defaultValue, content, hydrated, disableLocalStorage]);
    return (<NovelContext.Provider value={{
            completionApi,
            handleUserImageUpload: handleImageUpload,
        }}>
      <div onClick={() => {
            editor?.chain().focus().run();
        }} className={className}>
        {editor && <EditorBubbleMenu editor={editor}/>}
        {editor?.isActive("image") && <ImageResizer editor={editor}/>}
        <EditorContent editor={editor}/>
      </div>
    </NovelContext.Provider>);
}
//# sourceMappingURL=index.jsx.map