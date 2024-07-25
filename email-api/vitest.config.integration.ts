import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/integration/**/*.spec.ts', '!tests'],
    setupFiles: ['tests/helpers/db/setup.ts'],
  },
})