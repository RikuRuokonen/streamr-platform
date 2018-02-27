const WARN = 1, ERROR = 2

module.exports = exports = {

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:flowtype/recommended'
    ],

    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true,
            destructuring: true
        }
    },

    env: {
        es6: true,
        node: true,
        browser: true,
        mocha: true,
        jest: true
    },

    plugins: [
        'react',
        'mocha',
        'flowtype'
    ],

    settings: {
        onlyFilesWithFlowAnnotation: true
    },

    rules: {
        'no-debugger': WARN,
        'no-console': [
            WARN,
            {
                allow: [
                    'warn',
                    'error'
                ]
            }
        ],
        'semi': [ERROR, 'never'],
        'no-unused-vars': WARN,
        'curly': [ERROR, 'all'],
        'keyword-spacing': [ERROR, {
            before: true,
            after: true
        }],
        'quotes': [ERROR, 'single'],
        'space-before-function-paren': [ERROR, {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'space-before-blocks': [ERROR, 'always'],
        'space-in-parens': [ERROR, 'never'],
        'space-unary-ops': [ERROR, {
            words: true,
            nonwords: false
        }],
        'brace-style': [ERROR, '1tbs'],
        'newline-per-chained-call': [ERROR, {
            ignoreChainWithDepth: 2
        }],
        'object-curly-newline': [ERROR, {
            ObjectExpression: {
                minProperties: 1
            },
            ObjectPattern: 'never'
        }],
        'indent': [ERROR, 4, {
            SwitchCase: WARN,
            MemberExpression: WARN,
            ObjectExpression: WARN
        }],
        'object-property-newline': [ERROR, {
            allowMultiplePropertiesPerLine: true
        }],
        'no-empty': [ERROR, {
            allowEmptyCatch: true,
        }],
        'react/jsx-curly-spacing': [ERROR, {
            when: 'never',
            children: true
        }],
        'eol-last': [ERROR, 'always'],
        'jsx-quotes': [ERROR, 'prefer-double'],
        'no-multiple-empty-lines': [ERROR, {
            max: 1,
            maxBOF: 0
        }],
        'no-trailing-spaces': ERROR,
        'template-curly-spacing': [ERROR, 'never'],
        'no-unexpected-multiline': ERROR,
        'wrap-iife': [ERROR, 'inside'],
        'flowtype/define-flow-type': ERROR,
        'react/jsx-indent': [ERROR, 4]
    }
}