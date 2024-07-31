import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "node:path";
import express from "express";

var app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400');
    next();
});

export default defineConfig(() => {
    return {
        build: {
            outDir: 'build',
        },
        plugins: [react()],
        resolve: {
            alias: [
                {find: '@', replacement: path.resolve(__dirname, 'src')},
            ]
        },
        server:{
            cors: true,
            configureServer: ({ middleware }) => {
                middleware.use(app);
            }
        }
    };
});