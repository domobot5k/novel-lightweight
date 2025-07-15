import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

const editor = new Editor({
  element: document.querySelector('#editor'),
  extensions: [
    StarterKit,     // only the core kit
  ],
  content: '<p>Use the toolbar above to format your text.</p>',
})

// Wire up your static toolbar buttons
document.querySelectorAll('#toolbar button').forEach(button => {
  const cmd = button.dataset.command
  const arg = button.getAttribute('data-arg')
  button.addEventListener('click', () => {
    const chain = editor.chain().focus()
    if (arg) {
      chain[cmd](JSON.parse(arg)).run()
    } else {
      chain[cmd]().run()
    }
  })
})
