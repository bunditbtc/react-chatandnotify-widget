import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import path from 'path';

// const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true

export default {
  input: './index.js', // Entry point
  output: {
    file: 'lib/index.js', // Output file
    format: 'umd', // UMD format for library
    name: 'react-chat-widget',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    sourcemap: !isProduction,
  },
  external: ['react', 'react-dom'],
  plugins: [
    alias({
      entries: [
        { find: 'src', replacement: path.resolve(__dirname, 'src') }, // Alias 'src' points to 'src' folder
      ],
    }),
    // Resolves node_modules
    resolve({
      extensions: ['.tsx', '.ts', '.js'],
    }),
    // Converts CommonJS modules to ES6
    commonjs(),
    // Transpile JS/TS with Babel
    babel({
      exclude: /node_modules/,
      extensions: ['.js', '.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    // Handle SCSS and CSS
    postcss({
      extract: 'styles.css', // Extracts CSS to a separate file
      minimize: isProduction, // Minify CSS in production
      sourceMap: !isProduction,
      plugins: [     
        require('postcss-preset-env')(), 
        require('cssnano')()
      ], 
      use: [
        [
          'sass',
          {
            includePaths: [path.resolve(__dirname, 'src')],  // Configure sass to resolve imports from 'src'
          },
        ],
      ],   
     

    }),
    // Minify JS in production
    isProduction && terser(),
    // Handle images
    image(),
    // Aliases for modules
    alias({
      entries: [        
        { find: 'react', replacement: path.resolve(__dirname, './node_modules/react') },
        { find: 'react-dom', replacement: path.resolve(__dirname, './node_modules/react-dom') },
        { find: 'react/jsx-runtime', replacement: path.resolve(__dirname, './node_modules/react/jsx-runtime') }
      ]
    }),
  ],
};
