import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  input: 'src/Api.ts',
  external: ['date-fns', 'date-fns-tz'],
  plugins: [typescript()],
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
});
