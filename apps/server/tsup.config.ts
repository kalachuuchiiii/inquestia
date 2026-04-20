
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server.ts'],
  outDir: 'dist',
  clean: true,
  format: ['esm'],
  dts: false,
  sourcemap: true,
  target: 'node24',
  bundle: true,
  splitting: false,
  noExternal: [/^@inquestia\/.*/],
  external: ['express', 'mongoose', 'jsonwebtoken', 'cors', 'cookie-parser', 'bcryptjs', 'axios', 'zod']
});