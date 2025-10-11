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
      external: (id) => {
        // External dependencies that should not be bundled
        if (id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime') return true;
        if (id === '@supabase/supabase-js' || id === '@tanstack/react-query') return true;
        if (id === 'react-router-dom' || id === 'react-dropzone' || id === 'papaparse') return true;
        
        // External patterns for LEARN-specific imports
        if (id.startsWith('@/hooks/')) return true;
        if (id.startsWith('@/components/')) return true;
        if (id.startsWith('@/integrations/')) return true;
        if (id.startsWith('@/modules/')) return true;
        if (id.startsWith('@/lib/')) return true;
        
        return false;
      },
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