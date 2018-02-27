const {hasOneMatch, hasMatchingName, replaceCell, getCellByName, getCellValue, getCurrentCallbacks} = require('./shared')
const {clone, mergeDeepRight} = require('ramda')

const makeCallbackObject = (cells, cellName, callbackName) => ({savedState: getCellValue(cells, getCellByName(cells, cellName)), callbackName})

const mergeCallbacks = (cells, cellName, callbackName) => ({callbacks: getCurrentCallbacks(getCellByName(cells, cellName)).concat([makeCallbackObject(cells, cellName, callbackName)])})

const setCallbacks = (cells, cellName, callbackName) => mergeDeepRight(
                                                                        getCellByName(cells, cellName),
                                                                        mergeCallbacks(cells, cellName, callbackName)
                                                                      )


module.exports = {
  addCallback : (state, cellName, callbackName) => hasOneMatch(state, hasMatchingName(cellName)) ?
    replaceCell(state, setCallbacks(state, cellName, callbackName), cellName) :
    new Error('Must have only one cell with that name')
}
