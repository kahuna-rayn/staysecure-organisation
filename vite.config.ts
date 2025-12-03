import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// Plugin to fix import issues in ESM bundle
const fixImports = () => ({
  name: 'fix-imports',
  generateBundle(options, bundle) {
    // Fix imports in ESM bundle
    if (bundle['index.esm.js']) {
      const chunk = bundle['index.esm.js'];
      if (chunk.type === 'chunk') {
        let code = chunk.code;
        
        // Fix Fragment import from react/jsx-runtime
        code = code.replace(
          /import\s*{\s*jsx,\s*jsxs,\s*Fragment\s*}\s*from\s*["']react\/jsx-runtime["'];?\nimport\s+(\w+),\s*{\s*([^}]+)\s*}\s*from\s*["']react["'];?/,
          (match, defaultImport, namedImports) => {
            // Remove Fragment from jsx-runtime import and add to react import
            return `import { jsx, jsxs } from "react/jsx-runtime";\nimport ${defaultImport}, { Fragment, ${namedImports} } from "react";`;
          }
        );
        
        // Fix react-dom default import - react-dom doesn't have a default export
        code = code.replace(
          /import\s+(\w+)\s+from\s*["']react-dom["'];?/g,
          (match, importName) => {
            // Change to namespace import
            return `import * as ${importName} from "react-dom";`;
          }
        );
        
        chunk.code = code;
      }
    }
  },
});

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      skipDiagnostics: true, // Skip type checking during build - external deps will be provided by consuming app
    }),
    fixImports(),
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