module.exports = {
  parser: '@typescript-eslint/parser', // 在ts项目中必须执行解析器为@typescript-eslint/parser，才能正确的检测和规范TS代码
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:react/recommended', // 为了检测和规范React代码的书写必须安装插件eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier 将prettier作为ESLint规范来使用.
    'prettier/@typescript-eslint', // Uses eslint-config-prettier解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/no-deprecated': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off', // 关闭interface命名开头为 I 时的警告
  },
};
