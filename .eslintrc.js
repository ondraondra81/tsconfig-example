module.exports = {
    extends: [
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        //'plugin:import/errors',
        //'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    env: {
        browser: true,
    },
    plugins: ['@typescript-eslint', 'import'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
            node: {
                extensions: ['.js', 'jsx', '.ts', '.tsx', '.mjs', '.json'],
            },
        },
        'import/extensions': ['.js', 'jsx', '.ts', '.tsx', '.mjs'],
    },
    rules: {
        strict: 'error',
        indent: [2, 4, { 'offsetTernaryExpressions': false }],
        'import/no-unresolved': 1,
        'import/no-extraneous-dependencies': 1,
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': 'interface',
                'format': ['PascalCase'],
                'custom': {
                    'regex': '^I[A-Z]',
                    'match': true
                }
            }
        ],
        // 'import/prefer-default-export': 1,
        'no-undef': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/342
        'no-underscore-dangle': [
            'error',
            { allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] },
        ],
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/type-annotation-spacing': 0,
    },
};
