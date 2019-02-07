module.exports = {
    root: true,
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'extends': 'plugin:vue/essential',
    
    'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module'
    },
    // check if imports actually resolve
    settings: {
        'import/resolver': {
        webpack: {
            config: 'build/webpack.base.conf.js'
        }
        }
    },
    'rules': {
        'no-console': 0,
        'editor.formatOnSave': true,
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
    }
};