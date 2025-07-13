import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

// Example: import your own extensions later from src/editor/…
new Editor({
  element: document.querySelector('#editor'),
  extensions: [
    StarterKit,
    // …add your custom extensions here
  ],
  content: '<p>Welcome to iFS_RTE!</p>',
})
