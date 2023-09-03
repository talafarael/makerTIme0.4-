const cache = require('memory-cache');

function setTempData(key, data, ttlMilliseconds) {
    cache.put(key, data, ttlMilliseconds);
}
function getTempData(key) {
    return cache.get(key);
}
function removeTempData(key) {
    cache.del(key);
}
module.exports = {
    setTempData,
    getTempData,
    removeTempData
};