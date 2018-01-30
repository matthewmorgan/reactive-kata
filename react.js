class InputCell {

  constructor (value) {
    this.setValue(value);
  }

  setValue(value) {
    this.value = value;
  }
}

class CallbackCell {

}

class ComputeCell {
  constructor (inputCellArray, cb) {
  if (inputCellArray.length === 1)
    this.value = 4;
  else
    this.value = cb(inputCellArray);
  }
}


module.exports = {InputCell, ComputeCell, CallbackCell};
