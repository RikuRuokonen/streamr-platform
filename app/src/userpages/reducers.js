// TODO: Remove this file when userpages are production-ready. #userpages-on-demand
if (process.env.USERPAGES === 'on') {
    module.exports = {
        dashboard: require('./modules/dashboard/reducer').default, // eslint-disable-line global-require
        integrationKey: require('./modules/integrationKey/reducer').default, // eslint-disable-line global-require
        canvas: require('./modules/canvas/reducer').default, // eslint-disable-line global-require
        permission: require('./modules/permission/reducer').default, // eslint-disable-line global-require
        key: require('./modules/key/reducer').default, // eslint-disable-line global-require
        userPageStreams: require('./modules/userPageStreams/reducer').default, // eslint-disable-line global-require
        transactionHistory: require('./modules/transactionHistory/reducer').default, // eslint-disable-line global-require
    }
} else {
    module.exports = require('./stub.jsx') // eslint-disable-line global-require
}
