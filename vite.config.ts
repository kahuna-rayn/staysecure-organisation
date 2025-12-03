import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      skipDiagnostics: true, // Skip type checking during build - external deps will be provided by consuming app
    }),
  ],
  css: false, // Disable CSS processing for library build - CSS will be handled by consuming app
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
        'recharts',
        'react-to-print',
        'xlsx',
        'jspdf',
        'jspdf-autotable',
        'staysecure-auth',
        /^@\/hooks\//,
        /^@\/components\//,
        /^@\/integrations\//,
        /^@\/modules\//,
        /^@\/lib\//
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@supabase/supabase-js': 'Supabase',
          '@tanstack/react-query': 'ReactQuery',
          'react-router-dom': 'ReactRouterDOM',
          'staysecure-auth': 'StaySecureAuth'
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