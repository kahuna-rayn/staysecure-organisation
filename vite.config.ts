import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OrganisationManagement',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@supabase/supabase-js',
        '@tanstack/react-query',
        'react-router-dom',
        'react-dropzone',
        'papaparse',
        /^@\/components\/ui\/.*/,
        /^@\/hooks\/.*/,
        /^@\/integrations\/.*/,
        /^@\/components\/.*/,
        /^@\/modules\/.*/,
        /^@\/lib\/.*/,
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@supabase/supabase-js': 'Supabase',
          '@tanstack/react-query': 'ReactQuery',
          'react-router-dom': 'ReactRouterDOM'
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});