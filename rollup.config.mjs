import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'src/Api.ts',

  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },

  external: [
    'date-fns',
    'date-fns-tz'
  ],

  plugins: [
    typescript()
  ],
});
