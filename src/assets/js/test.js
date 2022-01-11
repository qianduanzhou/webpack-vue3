new Promise(resolve => {
    resolve('test')
}).then(res => {
    module.exports = res
})