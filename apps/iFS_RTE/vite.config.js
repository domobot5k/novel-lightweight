import { defineConfig } from 'vite'

export default defineConfig({
  base: './',           // all assets load relatively for file:///
  root: 'src',
  build: {
    outDir: '../dist',     // output folder
    emptyOutDir: true,  // clean before each build
    assetsDir: 'assets' // JS/CSS go here
  },
})