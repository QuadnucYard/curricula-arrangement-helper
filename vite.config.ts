import { rmSync } from "fs";
import path from "path";
import { type Plugin, type UserConfig, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import pkg from "./package.json";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import commonjsExternals from "vite-plugin-commonjs-externals";
import { escapeRegExp } from "lodash";

rmSync("dist", { recursive: true, force: true }); // v14.14.0

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
      "~/": `${pathSrc}/`,
    },
    extensions: [".js", ".ts", ".vue", ".json"],
  },
  plugins: [
    vue(),

    electron({
      main: {
        entry: "electron/main/index.ts",
        vite: withDebug({
          build: {
            outDir: "dist/electron/main",
          },
        }),
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: path.join(__dirname, "electron/preload/index.ts"),
        },
        vite: {
          build: {
            // For Debug
            sourcemap: "inline",
            outDir: "dist/electron/preload",
          },
        },
      },
      // Enables use of Node.js API in the Renderer-process
      // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      renderer: {},
    }),

    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],

      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      dts: "src/components.d.ts",
    }),

    Icons({
      autoInstall: true,
    }),

    commonjsExternals({
      externals: ["path", /^electron(\/.+)?$/],
    }),
  ],

  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },

  build: {
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
  },
});

function withDebug(config: UserConfig): UserConfig {
  if (process.env.VSCODE_DEBUG) {
    if (!config.build) config.build = {};
    config.build.sourcemap = true;
    config.plugins = (config.plugins || []).concat({
      name: "electron-vite-debug",
      configResolved(config) {
        const index = config.plugins.findIndex(p => p.name === "electron-main-watcher");
        // At present, Vite can only modify plugins in configResolved hook.
        (config.plugins as Plugin[]).splice(index, 1);
      },
    });
  }
  return config;
}
