const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Esta linha aponta para o arquivo de setup
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adapte para seus aliases de caminho do Next.js
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Para lidar com importação de CSS em testes
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

module.exports = createJestConfig(customJestConfig);

