import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json'; // Import the JSON plugin
import path from 'path';

import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

import url from '@rollup/plugin-url';

const isProduction = process.env.NODE_ENV === 'production';

console.log('SASS Include Paths:', path.resolve(__dirname, 'src'), path.resolve(__dirname, '.'));

export default {
  input: './index.js',
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: 'react-chatandnotify-widget',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    sourcemap: !isProduction,
  },
  external: ['react', 'react-dom'],
  plugins: [
    alias({
      entries: [
        { find: '/src', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
    // postcss({
    //   extract: 'styles.css', // Ensures styles are extracted into a separate file
    //   minimize: isProduction,
    //   sourceMap: !isProduction,
    //   plugins: [
    //     postcssImport(), // Handles imports from node_modules
    //     autoprefixer(),
    //   ],
    // }),    
    // postcss({
    //   extract: 'styles.css',
    //   minimize: isProduction,
    //   sourceMap: !isProduction,
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
      extract: 'styles.css', // Ensures all styles are in one file
      minimize: isProduction,
      sourceMap: !isProduction,
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
    resolve({
      extensions: ['.tsx', '.ts', '.js'],
    }),
    commonjs(),
    babel({
      exclude: /node_modules/,
      extensions: ['.js', '.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    json(), // Add the JSON plugin here
    // url({
    //   include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
    //   limit: 8192,
    // }),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
      limit: 8192,
      fileName: '[name].[hash][extname]',
    }),
    isProduction && terser(),
    image(),
    alias({
      entries: [
        { find: 'react', replacement: path.resolve(__dirname, './node_modules/react') },
        { find: 'react-dom', replacement: path.resolve(__dirname, './node_modules/react-dom') },
        { find: 'react/jsx-runtime', replacement: path.resolve(__dirname, './node_modules/react/jsx-runtime') },
      ],
    }),
  ],
};
