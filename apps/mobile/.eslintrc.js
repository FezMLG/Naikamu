module.exports = {
  root: true,
  ignorePatterns: ['*.js'],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'error',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'import/namespace': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'arrow-body-style': ['error'],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        alphabetize: { caseInsensitive: true, order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'builtin',
            pattern: 'react',
            position: 'before',
          },
          {
            group: 'internal',
            // group every import from @master-crm/* in modules from @master-crm/ui/*
            pattern: '@master-crm/!(ui)',
            position: 'before',
          },
          {
            group: 'internal',
            // minimatch pattern to group modules from @master-crm/ui except icons
            // https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/file-matching-patterns?view=azure-devops
            pattern: '@master-crm/ui/!(icons)',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: '@master-crm/ui/icons',
            position: 'before',
          },
          { group: 'internal', pattern: '@api/**' },
          { group: 'internal', pattern: '@components/**' },
          { group: 'internal', pattern: '@contextProviders/**' },
          { group: 'internal', pattern: '@config/**' },
          { group: 'internal', pattern: '@consts/**' },
          { group: 'internal', pattern: '@features/**' },
          { group: 'internal', pattern: '@layouts/**' },
          { group: 'internal', pattern: '@hocs/**' },
          { group: 'internal', pattern: '@hooks/**' },
          { group: 'internal', pattern: '@styles/**' },
          { group: 'internal', pattern: '@utils/**' },
          {
            group: 'internal',
            pattern: '@assets/**',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
    ],
    'react/function-component-definition': [
      2,
      { namedComponents: 'function-declaration' },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'never', props: 'never' },
    ],
    'react/jsx-sort-props': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      { replacements: { props: false, ref: false } },
    ],
  },
};
