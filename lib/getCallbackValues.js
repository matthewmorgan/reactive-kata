const {getCellValue, getCellByName} = require('./shared')
const {getValue} = require('./values')

const hasMatchingCallback = (callbackName) => cell => cell.callbacks ?
  cell.callbacks.filter(callback => callback.callbackName === callbackName).length > 0
  : false

const findCellsWithCallback = (state, callbackName) => state.filter(cell => hasMatchingCallback(callbackName)(cell))

const hasStateChanged = (state, cellsWithCallbacks) => cellsWithCallbacks
  .filter(cell => cell.callbacks.filter(callback => callback.savedState !== getCellValue(state, getCellByName(state, cell.name))).length > 0).length > 0



module.exports = {
  getCallbackValues : (state, callbackName) => hasStateChanged(state, findCellsWithCallback(state, callbackName)) ?
    findCellsWithCallback(state, callbackName).map(cell => getValue(state, cell.name)) :
    []
}
