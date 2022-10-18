// vite.config.ts
import { defineConfig } from "file:///D:/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E7%BB%83%E4%B9%A0/React%E9%A1%B9%E7%9B%AE%E7%BB%83%E4%B9%A0/NewsSystem/node_modules/.pnpm/registry.npmmirror.com+vite@3.1.8_sass@1.55.0/node_modules/vite/dist/node/index.js";
import react from "file:///D:/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E7%BB%83%E4%B9%A0/React%E9%A1%B9%E7%9B%AE%E7%BB%83%E4%B9%A0/NewsSystem/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-react@2.1.0_vite@3.1.8/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\\u524D\u7AEF\u77E5\u8BC6\u7EC3\u4E60\\React\u9879\u76EE\u7EC3\u4E60\\NewsSystem";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    proxy: {
      "/api": { target: " http://localhost:3000/", changeOrigin: true }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTUyNERcdTdBRUZcdTc3RTVcdThCQzZcdTdFQzNcdTRFNjBcXFxcUmVhY3RcdTk4NzlcdTc2RUVcdTdFQzNcdTRFNjBcXFxcTmV3c1N5c3RlbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU1MjREXHU3QUVGXHU3N0U1XHU4QkM2XHU3RUMzXHU0RTYwXFxcXFJlYWN0XHU5ODc5XHU3NkVFXHU3RUMzXHU0RTYwXFxcXE5ld3NTeXN0ZW1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNSU4OSU4RCVFNyVBQiVBRiVFNyU5RiVBNSVFOCVBRiU4NiVFNyVCQiU4MyVFNCVCOSVBMC9SZWFjdCVFOSVBMSVCOSVFNyU5QiVBRSVFNyVCQiU4MyVFNCVCOSVBMC9OZXdzU3lzdGVtL3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgcHJldHRpZXIvcHJldHRpZXIgKi9cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHsgdGFyZ2V0OiAnIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8nLCBjaGFuZ2VPcmlnaW46IHRydWUgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUSxFQUFFLFFBQVEsMkJBQTJCLGNBQWMsS0FBSztBQUFBLElBQ2xFO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
