import { join } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs' // commonjs转es6, 前端代码不需要
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-css-only';
import scss from 'rollup-plugin-scss';
import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';
import del from 'rollup-plugin-delete';

export default {
  input: join(__dirname, '..', 'src/components/index.ts'),
  output: {
    format: 'umd',
    file: 'lib/umd/index.js',
    name: 'vue-3-mui',
    exports: 'named',
    globals: {
      vue: 'Vue',
    },
  },
  plugins: [
    terser(),
    nodeResolve(),
    scss({
      exclude: ['node_modules'],
      outputStyle: 'compressed',
      prefix: `@import "src/assets/styles/variable.scss";`,
    }),
    css(),
    vue({
      target: 'browser',
      css: false,
      exposeFilename: false,
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'runtime',
    }),
  ],
  external(id) {
    //这里排除的
    return /^vue/.test(id);
  },
};
