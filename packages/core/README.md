<a href="https://novel.sh">
  <img alt="Novel is a Notion-style WYSIWYG editor with AI-powered autocompletions." src="https://novel.sh/opengraph-image.png">
  <h1 align="center">Novel-Lightweight</h1>
</a>

<p align="center">
  Fork of Novel.sh. Its lightweight, with custom uploader!
  Lot more coming soon!
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction

[Novel](https://novel.sh/) is a Notion-style WYSIWYG editor with AI-powered autocompletions by Steven-tey.
This is a fork with the aim of removing Vercel-blob, analytics so that your WYSIWYG editor remains lightweight and customized out of vercels's services

<br />

## Installation

To use Novel in a project, you can run the following command to install the `novel` [NPM package](https://www.npmjs.com/package/novel):

```
npm i novel-lightweight
```

Then, you can use it in your code like this:

```jsx
import { Editor } from "novel-lightweight";

export default function App() {
  const [data, setData] = useState("");

  return (
    <Editor
      defaultValue={data}
      disableLocalStorage={true}
      onUpdate={(editor) => {
        setData(editor?.storage.markdown.getMarkdown());
      }}
      handleImageUpload={async (file) => {
        const uploads = await startUpload([file]);
        if (uploads && uploads.length > 0) {
          return uploads[0].url;
        }
        return "www.example.com/failed-upload.png";
      }}
    />
  );
}
```

The `Editor` is a React component that takes in the following props:

| Prop                  | Type                           | Description                                                                                                                                                                                | Default                                                                                                                             |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `completionApi`       | `string`                       | The API route to use for the OpenAI completion API.                                                                                                                                        | `/api/generate`                                                                                                                     |
| `className`           | `string`                       | Editor container classname.                                                                                                                                                                | `"relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"` |
| `defaultValue`        | `JSONContent` or `string`      | The default value to use for the editor.                                                                                                                                                   | [`defaultEditorContent`](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/default-content.tsx)             |
| `extensions`          | `Extension[]`                  | A list of extensions to use for the editor, in addition to the [default Novel extensions](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/extensions/index.tsx). | `[]`                                                                                                                                |
| `editorProps`         | `EditorProps`                  | Props to pass to the underlying Tiptap editor, in addition to the [default Novel editor props](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/props.ts).        | `{}`                                                                                                                                |
| `onUpdate`            | `(editor?: Editor) => void`    | A callback function that is called whenever the editor is updated.                                                                                                                         | `() => {}`                                                                                                                          |
| `onDebouncedUpdate`   | `(editor?: Editor) => void`    | A callback function that is called whenever the editor is updated, but only after the defined debounce duration.                                                                           | `() => {}`                                                                                                                          |
| `debounceDuration`    | `number`                       | The duration (in milliseconds) to debounce the `onDebouncedUpdate` callback.                                                                                                               | `750`                                                                                                                               |
| `storageKey`          | `string`                       | The key to use for storing the editor's value in local storage.                                                                                                                            | `novel__content`                                                                                                                    |
| `disableLocalStorage` | `boolean`                      | Enabling this option will prevent read/write content from/to local storage.                                                                                                                | `false`                                                                                                                             |
| `handleImageUpload`   | `(file:File)=>Promise<string>` | [Optional] You can have your custom upload handler for images added. Takes in File as input and should return a promise which resolves to the url of the image                             | `null`                                                                                                                              |

> **Note**: Make sure to define an API endpoint that matches the `completionApi` prop (default is `/api/generate`). This is needed for the AI autocompletions to work. Here's an example: https://github.com/Ankur-Datta-4/novel-lightweight/blob/main/apps/web/app/api/generate/route.ts

## Setting Up Locally

To set up Novel locally, you'll need to clone the repository and set up the following environment variables:

- [OPTIONAL] `OPENAI_API_KEY` – your OpenAI API key (you can get one [here](https://platform.openai.com/account/api-keys))
- [OPTIONAL] `BLOB_READ_WRITE_TOKEN` – your Vercel Blob read/write token (currently [still in beta](https://vercel.com/docs/storage/vercel-blob/quickstart#quickstart), but feel free to [sign up on this form](https://vercel.fyi/blob-beta) for access)

To run the app locally, you can run the following commands:

```
pnpm i
pnpm build
pnpm dev
```

## Tech Stack

Novel is built on the following stack:

- [Next.js](https://nextjs.org/) – framework
- [Tiptap](https://tiptap.dev/) – text editor
- [OpenAI](https://openai.com/) - AI completions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI library
- [TailwindCSS](https://tailwindcss.com/) – styles
- [Cal Sans](https://github.com/calcom/font) – font

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/Ankur-Datta-4/novel-lightweight/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/Ankur-Datta-4/novel-lightweight/pull) to add new features/make quality-of-life improvements/fix bugs.

## License

Licensed under the [Apache-2.0 license](https://github.com/steven-tey/novel/blob/main/LICENSE.md).
