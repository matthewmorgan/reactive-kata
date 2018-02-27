const {clone} = require('ramda')

const getComputeInputValues = (cells, inputNames) => cells
  .filter(cell => inputNames.filter(name => hasMatchingName(name)(cell)).length)
  .map(cell => getCellValue(cells, cell))

const getComputeCellValue = (cell, cells) => cell.compute_function(getComputeInputValues(cells, cell.inputs))

const getInputCellValue = (cell) => cell.value ? cell.value : cell.initial_value

const hasNMatches = (arr, pred, nMatches) => arr.filter(pred).length === nMatches

/// exported

const hasOneMatch = (arr, pred) => hasNMatches(arr, pred, 1)

const hasMatchingName = (name) => (cell) => cell.name === name

const replaceCell = (cells, cell, name) => clone(cells).filter(cell => !hasMatchingName(name)(cell)).concat([cell])

const getCellValue = (cells, selectedCell) => selectedCell.type === 'input' ?
  getInputCellValue(selectedCell) :
  getComputeCellValue(selectedCell, cells)

const getCellByName = (cells, name) => cells.filter(cell => hasMatchingName(name)(cell))[0]

const getCurrentCallbacks = cell => cell.callbacks ? cell.callbacks : []

module.exports = {
  hasOneMatch, hasMatchingName, replaceCell, getCellValue, getCellByName, getCurrentCallbacks
}
