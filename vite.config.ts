import path from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            include: ['./src/**/*.ts'],
        })
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'ts-iron-tree',
            fileName: 'ts-iron-tree',
        }

    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
})