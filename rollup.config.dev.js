import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html';
import alias from '@rollup/plugin-alias';
import path from 'path';

import json from '@rollup/plugin-json';

import replace from '@rollup/plugin-replace';

import url from '@rollup/plugin-url';

import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export default {
  input: 'dev/main.tsx', // Main entry point
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // Self-executing function format
    sourcemap: 'inline',
    name: 'ReactApp',
    globals: { // Define global variable names for external dependencies
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  plugins: [
    alias({
      entries: [
        { find: '/src', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
    resolve({
      extensions: ['.tsx', '.ts', '.js'],
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      extensions: ['.js', '.ts', '.tsx'],
      exclude: /node_modules/,
      babelHelpers: 'bundled',
    }),
    json(),
    // postcss({
    //   extract: false,
    //   minimize: false,
    //   use: [
    //     ['sass', {
    //       implementation: require('sass'),
    //     }]
    //   ],
    //   plugins: [require('autoprefixer')],
    // }),
    // postcss({
    //   extract: false,
    //   minimize: false,     
    //   plugins: [
    //     postcssImport(),
    //     autoprefixer(),
    //   ],
    //   use: [
    //     [
    //       'sass',
    //       {
    //         includePaths: [path.resolve(__dirname, 'src')],
    //       },
    //     ],
    //   ],
    // }),
    postcss({
      extensions: ['.css', '.scss'],
      extract: false, // Ensures all styles are in one file
      minimize: false,      
      plugins: [
        postcssImport(), // Resolves imports from node_modules
        autoprefixer(),
      ],
      use: [
        [
          'sass',
          {
            includePaths: [
              path.resolve(__dirname, 'src'), // Makes `src` act as root for imports
              path.resolve(__dirname),       // Includes the project root
            ],
          },
        ],
      ],
    }),   
    alias({
      entries: [
        { find: 'react', replacement: path.resolve(__dirname, './node_modules/react') },
        { find: 'react-dom', replacement: path.resolve(__dirname, './node_modules/react-dom') }
      ],
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
          <script src="https://unpkg.com/react/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
          <script src="./bundle.js"></script>
        </body>
        </html>
      `,
    }),
    serve({
      open: true,
      contentBase: ['dist'],
      port: 3000,
      host: '127.0.0.1',
    }),
    livereload({
      watch: 'dist',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true, // Required for newer versions of Rollup
    }),  
    // url({
    //   include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
    //   limit: 8192,
    // }),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
      limit: 8192,
      fileName: '[name].[hash][extname]',
    }),
  ],
  external: ['react', 'react-dom'], // React and ReactDOM are external
};

