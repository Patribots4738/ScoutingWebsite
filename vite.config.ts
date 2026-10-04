import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const clientEnv = {
		API_KEY: env.API_KEY ?? env.VITE_API_KEY,
		AUTH_DOMAIN: env.AUTH_DOMAIN ?? env.VITE_AUTH_DOMAIN,
		DATABASE_URL: env.DATABASE_URL ?? env.VITE_DATABASE_URL,
		PROJECT_ID: env.PROJECT_ID ?? env.VITE_PROJECT_ID,
		STORAGE_BUCKET: env.STORAGE_BUCKET ?? env.VITE_STORAGE_BUCKET,
		MESSAGING_SENDER_ID:
			env.MESSAGING_SENDER_ID ?? env.VITE_MESSAGING_SENDER_ID,
		APP_ID: env.APP_ID ?? env.VITE_APP_ID,
		MEASUREMENT_ID: env.MEASUREMENT_ID ?? env.VITE_MEASUREMENT_ID
	};

	return {
		plugins: [react()],
		define: {
			'process.env': clientEnv
		},
		server: {
			host: true,
			hmr: {
				protocol: 'ws',
				host: 'localhost'
			}
		},
		resolve: {
			alias: {
				'@shared': path.resolve(__dirname, './shared'),
				'@api': path.resolve(__dirname, './api')
			}
		}
	};
});
