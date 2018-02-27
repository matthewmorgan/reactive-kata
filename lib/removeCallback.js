const {hasOneMatch, hasMatchingName, replaceCell, getCellByName, getCurrentCallbacks} = require('./shared')
const {clone} = require('ramda')

const removeCallbackFromCell = (cells, cellName, callbackName) => Object.assign({}, clone(getCellByName(cells, cellName)), {callbacks: getCurrentCallbacks(getCellByName(cells, cellName)).filter(callback => callback.callbackName !== callbackName)})

module.exports = {
  removeCallback:  (state, cellName, callbackName) =>  hasOneMatch(state, hasMatchingName(cellName)) ?
    replaceCell(state, removeCallbackFromCell(state, cellName, callbackName), cellName) :
    new Error('Must have only one cell with that name')
}
