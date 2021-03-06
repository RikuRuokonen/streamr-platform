const path = require('path')

module.exports = exports = {
    extends: 'streamr',
    settings: {
        'import/resolver': {
            webpack: {
                config: path.resolve(__dirname, 'webpack.config.js'),
            },
        },
    },
}
