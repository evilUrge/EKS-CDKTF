# Typescript CORE
Provides standard build dependencies and configurations for typescript packages.

## How to use
1. When creating a new package in this monorepo, install the following workspace via
```bash
yarn add workspace:typescript-core -D
```
2. Create a `tsconfig.json` file with the following content
```json
{
  "extends": "typescript-core/tsconfig.json",
  "compilerOptions": {
    "outDir": "build"
  }
}
```
3. Create a `jest.config.js` file with the following content
```js
export default {
  preset: "typescript-core"
};
```
