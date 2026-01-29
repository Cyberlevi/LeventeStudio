import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to inject GTM ID into HTML
function htmlEnvPlugin(): Plugin {
  return {
    name: 'html-env-plugin',
    transformIndexHtml(html) {
      const gtmId = process.env.VITE_GTM_ID || 'GTM-WZHLTWBD';
      return html.replace(/GTM-WZHLTWBD/g, gtmId);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), htmlEnvPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
