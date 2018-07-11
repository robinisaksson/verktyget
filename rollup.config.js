import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: [
    {
      name: 'verktyget',
      file: 'dist/verktyget.js',
      format: 'umd'
    },
    {
      file: 'dist/verktyget.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/verktyget.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    babel()
    // resolve() // use resolve to find dependencies
    // commonjs() // convert dependencies to an ES module
  ]
};
