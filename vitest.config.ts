import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 30000, // 30秒に延長
    environment: 'node',
  },
});
