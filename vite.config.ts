import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { crx, defineManifest } from '@crxjs/vite-plugin';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Doodle Calendar',
  description: 'Googleカレンダーの予定テンプレート管理',
  version: '1.0',
  permissions: ['tabs', 'storage'],
  action: {
    default_popup: 'index.html'
  },
  icons: {
    '16': 'icons/icon16.png',
    '32': 'icons/icon32.png',
    '48': 'icons/icon48.png',
    '128': 'icons/icon128.png'
  },
  content_scripts: [
    {
      js: ['src/scripts/content.ts'],
      matches: ['https://calendar.google.com/calendar/*']
    }
  ]
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), crx({ manifest })]
});
