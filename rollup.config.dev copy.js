import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html';
import alias from '@rollup/plugin-alias';
import path from 'path';

import scss from 'rollup-plugin-scss';

export default {
  input: 'dev/main.tsx', // Main entry point
  output: {
    file: 'dist/bundle.js', // Output for development
    format: 'iife', // Self-executing function format, suitable for browsers
    sourcemap: 'inline', // Inline source maps for debugging
    name: 'ReactApp'
  },
  plugins: [
    resolve({
      extensions: ['.tsx', '.ts', '.js'],
    }),
    commonjs(), // To handle CommonJS imports
    babel({
      extensions: ['.js', '.ts', '.tsx'],
      exclude: /node_modules/,
      babelHelpers: 'bundled',
    }),
    scss({
      // output: path.join(__dirname, 'styles.css'), // Output compiled CSS to 'build/styles.css'       
      importer: [function(url) {
        // Resolve SCSS absolute imports like /src/scss/_common.scss
        if (url.startsWith('/src')) {
          return { file: path.resolve(__dirname, url.substr(1)) }; // Resolve the absolute path
        }
        return null; // Let it fall back to default import behavior
      }]
    }),
    postcss({
      extract: false, // Styles are injected in the head (development)
      minimize: false,     
      use: [
        ['sass', {
          implementation: require('sass'),
        }]
      ],
      plugins: [require('autoprefixer')] // Autoprefixer for CSS
    }),
    alias({
      entries: [
        { find: 'react', replacement: path.resolve(__dirname, './node_modules/react') },
        { find: 'react-dom', replacement: path.resolve(__dirname, './node_modules/react-dom') }
      ]
    }),
    html({
      title: 'React App',
      template: () => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>React App</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/dist/bundle.js"></script>
        </body>
        </html>
      `
    }),
    serve({
      open: true,
      contentBase: ['dist'], // Serve from 'dist'
      port: 3000,
      host: '127.0.0.1'
    }),
    livereload({
      watch: 'dist', // Enable live reload for 'dist'
    }),
  ],
  external: ['react', 'react-dom'], // React and ReactDOM are external
};
