import globals from "globals";
import js from "@eslint/js";
import svelteParser from "svelte-eslint-parser";
import sveltePlugin from "eslint-plugin-svelte";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/** @type { import("eslint").Linter.Config[] } */
export default [
    {
        files: ["**/*.{jsx,cjs,mjs,ts,tsx,cts,mts,svelte}"]
    },
    {
        ignores: [
            ".DS_Store",
            "node_modules",
            ".env",
            ".env.*",
            "!.env.example",
            "*.js",
            "!.config.js",
            "build",
            "*.config.{js,ts,cjs,mjs,cts,mts}",
            ".svelte-kit",
            ".vercel",
            "static",
            "pnpm-lock.yaml",
            "package-lock.json",
            "yarn.lock"
        ]
    },
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ["./tsconfig.json"],
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".svelte"]
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        },
        rules: {
            "no-undef": "off",
            "no-explicit-any": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/explicit-member-accessibility": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    format: [
                        "camelCase",
                        "UPPER_CASE"
                    ],
                    selector: [
                        "function",
                        "variable",
                        "parameter",
                        "classProperty",
                        "classMethod"
                    ],
                    leadingUnderscore: "allow"
                }
            ],
            "no-multiple-empty-lines": [
                "error",
                { max: 1 }
            ],
            indent: [
                "error",
                4,
                { SwitchCase: 1 }
            ],
            quotes: [
                "error",
                "double"
            ],
            semi: [
                "error",
                "always"
            ]
        }
    },
    {
        ignores: ["**/*.ts"],
        plugins: {
            svelte: sveltePlugin
        },
        processor: sveltePlugin.processors.svelte,
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                project: ["./tsconfig.json"],
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".svelte"]
            }
        },
        rules: {
            ...sveltePlugin.configs.recommended.rules
        }
    },
    {
        ignores: ["**/*.{ts,svelte}"],
        ...js.configs.recommended
    }
]