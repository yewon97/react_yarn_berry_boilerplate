// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import { readFileSync } from 'fs';
import { join } from 'path';

// .prettierrc 파일의 설정을 읽어옵니다.
const prettierConfig = JSON.parse(
  readFileSync(join(process.cwd(), '.prettierrc'), 'utf8'),
);

export default [
  // 1. 파일 매칭, globals, 그리고 React 설정 추가
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      // react 플러그인 경고 해결을 위해 React 버전을 자동 감지하도록 설정
      react: {
        version: 'detect',
      },
    },
  },
  // 2. @eslint/js의 기본 추천 규칙
  pluginJs.configs.recommended,
  // 3. typescript-eslint의 추천 규칙
  ...tseslint.configs.recommended,
  // 4. eslint-plugin-react의 flat 추천 규칙
  pluginReact.configs.flat.recommended,
  // 5. Prettier 통합: prettier 플러그인과 .prettierrc의 옵션 (여기서 semi 옵션은 별도로 false로 지정)
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': ['error', { ...prettierConfig }],
    },
  },
];
