const {hasOneMatch, hasMatchingName, replaceCell, getCellValue, getCellByName} = require('./shared')
const {clone} = require('ramda')

const setCellValue = (cell, value) => Object.assign({}, clone(cell), {value})

module.exports = {
  getValue: (state, cellName) =>  hasOneMatch(state, hasMatchingName(cellName)) ?
    getCellValue(state, getCellByName(state, cellName)) :
    new Error('Must have only one cell with that name'),

  setValue: (state, cellName, value) => hasOneMatch(state, hasMatchingName(cellName)) ?
    replaceCell(state, setCellValue(getCellByName(state,cellName), value), cellName) :
    new Error('Must have only one cell with that name')
}
