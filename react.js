class Cell {
  constructor() {
    this.subscribers = []
  }

  addSubscriber(sub) {
    this.subscribers.push(sub)
  }

  notify() {}
  runCallbacks() {}
}

class InputCell extends Cell {
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

  notify() {
    this.subscribers.forEach(sub => sub.updateValue())
  }

}


class ComputeCell extends Cell {
  constructor(inputCells, fn) {
    super()
    this.fn = fn
    this.inputCells = inputCells
    this.inputCells.forEach(cell => cell.addSubscriber(this))
    this.value = fn(inputCells)
    this.callbacks = []
  }

  getValue() {
    return this.fn(this.inputCells)
  }

  notify() {
    this.subscribers.forEach(sub => sub.updateValue())
  }

  updateValue() {
    let newValue = this.fn(this.inputCells)
    if (newValue !== this.value) {
      console.log('old value was', this.value, 'new value is', newValue)
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
