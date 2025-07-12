// rollup.config.cjs
const path     = require('path');
const alias    = require('@rollup/plugin-alias').default;
const resolve  = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const esbuild  = require('rollup-plugin-esbuild').default;
const terser   = require('@rollup/plugin-terser').default;

module.exports = {
input: './lib/vanilla-editor.ts',
  plugins: [
    alias({
      entries: [
        { find: '@',   replacement: path.resolve(__dirname, 'lib') },
        { find: '@ui', replacement: path.resolve(__dirname, 'lib/ui') },
      ]
    }),
    resolve({ extensions: ['.js','.jsx','.ts','.tsx'] }),
    commonjs(),
    esbuild({
      include: /\.[jt]sx?$/,
      target: 'es2018',
      loaders: { '.tsx': 'tsx', '.ts': 'ts' }
    }),
    terser()
  ],
  output: {
    file: 'dist/novel.umd.min.js',
    format: 'umd',
    name: 'Novel',
    globals: { react: 'React', 'react-dom': 'ReactDOM' }
  },
  external: ['react', 'react-dom']
};
