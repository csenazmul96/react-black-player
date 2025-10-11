import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  publicDir: command === 'serve' ? 'public' : false, // Enable public folder in dev mode
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'ReactBlackPlayer',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'esm.' : ''}js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React',
        },
        exports: 'named',
      },
    },
  },
}));
