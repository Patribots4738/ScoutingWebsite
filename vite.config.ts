import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	// exposing all the env variables is *probably* unsafe so we should look into a better way to do this, but for now this is fine
	const clientEnv = {
		API_KEY: env.API_KEY ?? env.VITE_API_KEY,
		AUTH_DOMAIN: env.AUTH_DOMAIN ?? env.VITE_AUTH_DOMAIN,
		DATABASE_URL: env.DATABASE_URL ?? env.VITE_DATABASE_URL,
		PROJECT_ID: env.PROJECT_ID ?? env.VITE_PROJECT_ID,
		STORAGE_BUCKET: env.STORAGE_BUCKET ?? env.VITE_STORAGE_BUCKET,
		MESSAGING_SENDER_ID: env.MESSAGING_SENDER_ID ?? env.VITE_MESSAGING_SENDER_ID,
		APP_ID: env.APP_ID ?? env.VITE_APP_ID,
		MEASUREMENT_ID: env.MEASUREMENT_ID ?? env.VITE_MEASUREMENT_ID,
	};

	return {
		plugins: [preact()],
		define: {
			"process.env": clientEnv,
		},
		server: {
			hmr: {
				protocol: "ws",
				host: "localhost",
			},
		},
		resolve: {
			alias: {
				react: "preact/compat",
				"react-dom/test-utils": "preact/test-utils",
				"react-dom": "preact/compat",
				"react/jsx-runtime": "preact/jsx-runtime",
			},
		},
	};
});