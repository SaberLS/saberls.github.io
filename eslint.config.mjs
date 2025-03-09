import js from '@eslint/js'
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'

import {includeIgnoreFile} from '@eslint/compat'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath (import.meta.url)
const __dirname = path.dirname (__filename)
const gitignorePath = path.resolve (
  __dirname,
  '.gitignore',
)

export default [
  includeIgnoreFile (gitignorePath), // ignore gitigonre files
  {
    'name': 'My ignores',
    'ignores': ['*package-lock.json'],
  },
  {
    'name': 'js',
    'files': [
      '**/*.js',
      '**/*.mjs',
    ],
    'languageOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
      'globals': {
        ...globals.browser,
      },
    },

    'plugins': {
      '@stylistic/js': stylisticJs,
    },

    'rules': {
      ...js.configs.recommended.rules,
      'constructor-super': 'error',
      'no-undef': 'error',
      'no-eq-null': 'error',
      'default-param-last': 'error',
      'default-case-last': 'error', // !! Enforce default clauses in switch statements to be last
      'init-declarations': [
        'error',
        'always',
      ], // !! Require or disallow initialization in variable declarations
      'yoda': [
        'error',
        'never',
      ], // !! Disallow "Yoda" conditions
      'no-eval': 'error', // !! Disallow the use of eval()
      'no-implied-eval': 'error', // !! Disallow the use of eval()-like methods setTimeout(), setInterval() or execScript()
      'no-implicit-coercion': 'error', // !! Disallow shorthand type conversions
      'no-implicit-globals': 'error', // !! Disallow declarations in the global scope
      'no-invalid-this': 'error', // !! Disallow use of this in contexts where the value of this is undefined
      'no-octal-escape': 'error', // !! Disallow octal escape sequences in string literals
      'no-undef-init': 'error', // !! Disallow initializing variables to undefined
      'no-sequences': 'error', // !! Disallow comma operators
      'no-throw-literal': 'error', // !! Disallow throwing literals as exceptions
      'no-undefined': 'error', // !! Disallow the use of undefined as an identifier
      'strict': [
        'error',
        'safe',
      ], // Require or disallow strict mode directives

      // * ----------- warnings ------------------
      'no-unused-vars': 'warn',
      'no-self-compare': 'warn', // Disallow comparisons where both sides are exactly the same
      'no-unmodified-loop-condition': 'warn',
      'no-unreachable-loop': 'warn', // Disallow loops with a body that allows only one iteration
      'no-useless-assignment': 'warn', // Disallow variable assignments when the value is not used
      'require-atomic-updates': 'warn', // Disallow assignments that can lead to race conditions due to usage of await or yield
      'eqeqeq': 'warn', // Only ===
      // Syntax things
      'camelcase': 'warn', // Enforce camlcase naming codefault-param-last
      'consistent-this': [
        'warn',
        'this',
      ], // Enforce consistent naming when capturing the current execution context
      'dot-notation': 'warn', // Enforce dot notation whenever possible
      'logical-assignment-operators': 'warn', // Enforce logical assignments
      'id-denylist': [
        'warn',
        'data',
        'err',
        'e',
        'cb',
        'callback',
      ], // Disallow common identifiers
      'id-length': 'warn', // Enforce minimum and maximum identifier lengths
      'prefer-rest-params': 'warn', // Require rest parameters instead of arguments
      'prefer-spread': 'warn', // Require spread operators instead of .apply()
      'new-cap': 'warn', // Require constructor names to begin with a capital letter
      'no-lone-blocks': 'warn', // Disallow unnecessary nested blocks
      'no-negated-condition': 'warn', // Disallow negated conditions
      'no-object-constructor': 'warn', // Disallow calls to the Object constructor without an argument
      'no-shadow': 'warn', // Disallow variable declarations from shadowing variables declared in the outer scope
      'no-unneeded-ternary': 'warn', // Disallow ternary operators when simpler alternatives exist
      'no-nested-ternary': 'warn', // Disallow nested ternary expressions
      'no-unused-expressions': 'warn', // Disallow unused expressions

      'no-useless-computed-key': 'warn', // Disallow unnecessary computed property keys in objects and classes
      'no-useless-concat': 'warn', // Disallow unnecessary concatenation of literals or template literals

      'prefer-template': 'warn', // Require template literals instead of string concatenation
      'no-useless-rename': 'warn', // Disallow renaming import, export, and destructured assignments to the same name
      'no-useless-return': 'warn', // Disallow redundant return statements
      'object-shorthand': 'warn', // Require or disallow method and property shorthand syntax for object literals
      'prefer-const': 'warn', // Require const declarations for variables that are never reassigned after declared
      'prefer-destructuring': 'warn', // Require destructuring from arrays and/or objects
      'prefer-exponentiation-operator': 'warn', // Disallow the use of Math.pow in favor of the ** operator
      'prefer-object-has-own': 'warn', // Disallow use of Object.prototype.hasOwnProperty.call() and prefer use of Object.hasOwn()
      'prefer-arrow-callback': 'warn', // Require using arrow functions for callbacks
      'prefer-object-spread': 'warn', // Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
      'prefer-promise-reject-errors': 'warn', // Require using Error objects as Promise rejection reasons
      'require-await': 'warn', // Require await in async functions
      ...stylisticJs.configs['all-flat'].rules,
      '@stylistic/js/eol-last': [
        'error',
        'always',
      ],
      '@stylistic/js/quotes': [
        'error',
        'single',
      ],
      '@stylistic/js/indent': [
        'error',
        2,
      ],
      '@stylistic/js/multiline-comment-style': 'off',
      '@stylistic/js/padded-blocks': 'off',
      '@stylistic/js/function-call-spacing': [
        'error',
        'always',
      ],
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/semi-style': [
        'error',
        'last',
      ],
      '@stylistic/js/semi': [
        'error',
        'never',
      ],
      '@stylistic/js/array-bracket-newline': ['error',
        'consistent'],
      '@stylistic/js/comma-dangle': ['error',
        'always-multiline'],
    },
  },
]
