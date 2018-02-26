class NotifyingCell {
  constructor() {
    this.subscribers = []
  }

  addSubscriber(sub) {
    this.subscribers.push(sub)
  }

  notify() {
    this.subscribers.forEach(sub => sub.updateValue())
  }
}

class InputCell extends NotifyingCell {
  constructor(value) {
    super()
    this.value = value
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.updateValue(value)
  }

  updateValue(value) {
    if (value !== this.value) {
      this.value = value
      this.notify()
    }
  }
}


class ComputeCell extends NotifyingCell {
  constructor(inputCells, fn) {
    super()
    this.fn = fn
    this.inputCells = inputCells
    this.inputCells.forEach(cell => cell.addSubscriber(this))
    this.value = this.fn(this.inputCells)
    this.callbacks = []
  }

  // this cell's values are computed on request
  getValue() {
    this.updateValue()
    return this.value
  }

  updateValue(){
    let newValue = this.fn(this.inputCells)
    if (newValue !== this.value) {
      this.value = newValue
      this.notify()
      this.runCallbacks()
    }

  }

  runCallbacks() {
    this.callbacks.forEach(cb => cb.run(this))
  }

  addCallback(cb) {
    this.callbacks.push(cb)
  }

  removeCallback(cb) {
    this.callbacks = this.callbacks.filter(c => c !== cb)
  }
}


class CallbackCell {
  constructor(fn) {
    this.fn = fn
    this.values = []
  }

  run(cell) {
    this.values.push(this.fn(cell))
  }

  getValue() {
    return this.values
  }
}


export {InputCell, ComputeCell, CallbackCell}
