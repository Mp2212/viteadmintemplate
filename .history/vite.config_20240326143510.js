import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://81.82.195.122:9003', // Your API base URL
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '') // Remove the '/api' prefix
                }
            }
        }
    };
});