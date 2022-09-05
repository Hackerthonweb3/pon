module.exports = {
    extends: ['next/core-web-vitals', 'turbo', 'prettier'],
    rules: {
        '@next/next/no-html-link-for-pages': ['error', 'src/pages'],
        '@next/no-page-custom-font': 'off',
        'turbo/no-undeclared-env-vars': 'off',
        'react-hooks/exhaustive-deps': 'off',
    },
}
