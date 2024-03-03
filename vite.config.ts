import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Google Calendar Template",
  description:
    "Add the reading time to Chrome Extension documentation articles",
  version: "1.0",
  permissions: ["activeTab", "scripting", "storage"],
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      js: ["src/scripts/content.ts"],
      matches: ["https://calendar.google.com/calendar/*"],
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
