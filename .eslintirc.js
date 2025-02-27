module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  // parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['html', '@typescript-eslint', 'vue', 'prettier'],
  rules: {
    'prettier/prettiew': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    semi: [2, 'always'], // 语句强制分号结尾
    quotes: [2, 'double'], // 引号类型 ""
    'no-alert': 0, // 禁止使用alert
    'no-console': 2, // 禁止使用console
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-debugger': 2, // 禁止使用debugger
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-extra-semi': 2, // 禁止多余的冒号
    'no-multi-spaces': 1, // 不能用多余的空格
    // 'padding-line-between-statements': [
    //   'error',
    //   { let: STATEMENT_TYPE, const: STATEMENT_TYPE },
    // ],
    'newline-after-var': ['error', 'always'],
  },
};
