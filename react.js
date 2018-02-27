const {getValue, setValue} = require('./lib/values')
const {addCallback} = require('./lib/addCallback')
const {removeCallback} = require('./lib/removeCallback')
const {getCallbackValues} = require('./lib/getCallbackValues')

module.exports = {
  getValue, setValue, addCallback, getCallbackValues, removeCallback
}
