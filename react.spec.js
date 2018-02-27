const cases = require('./cases')
const {getValue, setValue, addCallback, getCallbackValues, removeCallback} = require('./react.js')

const checkOperation = (cells, operation) => {
  switch (operation.type) {
    case 'expect_cell_value':
      return {testPassed: expect(getValue(cells, operation.cell)).toEqual(operation.value) || true, state: cells}
    case 'set_value':
      return {testPassed: true, state: setValue(cells, operation.cell, operation.value)}
    case 'add_callback':
      return {testPassed: true, state: addCallback(cells, operation.cell, operation.name)}
    case 'expect_callback_values':
      return {testPassed: expect(getCallbackValues(cells, operation.callback)).toEqual(operation.values) || true, state: cells}
    case 'remove_callback':
      return {testPassed: true, state: removeCallback(cells, operation.cell, operation.name)}
  }
}

function* checkAll(cells, operations) {
  let currentCells = cells
  let index = 0
  while(index < operations.length){
    const result = checkOperation(currentCells, operations[index])
    index++
    currentCells = result.state
    yield result;
  }

}

describe('reactive kata', () => {
  cases.forEach((testCase) => {
    it(testCase.description, () => {

      const cells = testCase.input.cells
      let done = false
      const checkGenerator = checkAll(cells, testCase.input.operations)
      while( done === false){
        const result = checkGenerator.next()
        done = result.done
        if(!done)
          expect(result.value.testPassed).toBe(true)
      }
    })
  })
})

