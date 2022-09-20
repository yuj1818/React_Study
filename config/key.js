if(process.env.NODE_ENV === 'productoin') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}