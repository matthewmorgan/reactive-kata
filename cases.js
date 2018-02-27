module.exports = [
  {
    "description": "input cells have a value",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 10
        }
      ],
      "operations": [
        {
          "type": "expect_cell_value",
          "cell": "input",
          "value": 10
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "an input cell's value can be set",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 4
        }
      ],
      "operations": [
        {
          "type": "set_value",
          "cell": "input",
          "value": 20
        },
        {
          "type": "expect_cell_value",
          "cell": "input",
          "value": 20
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "compute cells calculate initial value",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] + 1
        }
      ],
      "operations": [
        {
          "type": "expect_cell_value",
          "cell": "output",
          "value": 2
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "compute cells take inputs in the right order",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "one",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "two",
          "type": "input",
          "initial_value": 2
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["one", "two"],
          "compute_function": inputs => inputs[0] + inputs[1] * 10
        }
      ],
      "operations": [
        {
          "type": "expect_cell_value",
          "cell": "output",
          "value": 21
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "compute cells update value when dependencies are changed",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] + 1
        }
      ],
      "operations": [
        {
          "type": "set_value",
          "cell": "input",
          "value": 3
        },
        {
          "type": "expect_cell_value",
          "cell": "output",
          "value": 4
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "compute cells can depend on other compute cells",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "times_two",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] * 2
        },
        {
          "name": "times_thirty",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] * 30
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["times_two", "times_thirty"],
          "compute_function": inputs => inputs[0] + inputs[1]
        }
      ],
      "operations": [
        {
          "type": "expect_cell_value",
          "cell": "output",
          "value": 32
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 3
        },
        {
          "type": "expect_cell_value",
          "cell": "output",
          "value": 96
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "compute cells fire callbacks",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] + 1
        }
      ],
      "operations": [
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 3
        },
        {
          "type": "expect_callback_values",
          "callback": "callback1",
          "values": [4]
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "callback cells only fire on change",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] < 3 ? 111 : 222
        }
      ],
      "operations": [
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 2
        },
        {
          "type": "expect_callback_values",
          "callback": "callback1",
          "values": []
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 4
        },
        {
          "type": "expect_callback_values",
          "callback": "callback1",
          "values": [222]
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "callbacks can be added and removed",
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 11
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] + 1
        }
      ],
      "operations": [
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback2"
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 31
        },
        {
          "type": "remove_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback3"
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 41
        },
        {
          "type": "expect_callback_values",
          "callback": "callback1",
          "values": [32]
        },
        {
          "type": "expect_callback_values",
          "callback": "callback2",
          "values": [32, 42]
        },
        {
          "type": "expect_callback_values",
          "callback": "callback3",
          "values": [42]
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "removing a callback multiple times doesn't interfere with other callbacks",
    "comments": [
      "Some incorrect implementations store their callbacks in an array",
      "and removing a callback repeatedly either removes an unrelated callback",
      "or causes an out of bounds access."
    ],
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] + 1
        }
      ],
      "operations": [
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback2"
        },
        {
          "type": "remove_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "remove_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "remove_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 2
        },
        {
          "type": "expect_callback_values",
          "callback": "callback1",
          "values": []
        },
        {
          "type": "expect_callback_values",
          "callback": "callback2",
          "values": [3]
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "callbacks should only be called once even if multiple dependencies change",
    "comments": [
      "Some incorrect implementations call a callback function too early,",
      "when not all of the inputs of a compute cell have propagated new values."
    ],
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "plus_one",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] + 1
        },
        {
          "name": "minus_one1",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] - 1
        },
        {
          "name": "minus_one2",
          "type": "compute",
          "inputs": ["minus_one1"],
          "compute_function": inputs => inputs[0] - 1
        },
        {
          "name": "output",
          "type": "compute",
          "inputs": ["plus_one", "minus_one2"],
          "compute_function": inputs => inputs[0] * inputs[1]
        }
      ],
      "operations": [
        {
          "type": "add_callback",
          "cell": "output",
          "name": "callback1"
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 4
        },
        {
          "type": "expect_callback_values",
          "callback": "callback1",
          "values": [10]
        }
      ]
    },
    "expected": {}
  },
  {
    "description": "callbacks should not be called if dependencies change but output value doesn't change",
    "comments": [
      "Some incorrect implementations simply mark a compute cell as dirty when a dependency changes,",
      "then call callbacks on all dirty cells.",
      "This is incorrect since the specification indicates only to call callbacks on change."
    ],
    "property": "react",
    "input": {
      "cells": [
        {
          "name": "input",
          "type": "input",
          "initial_value": 1
        },
        {
          "name": "plus_one",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] + 1
        },
        {
          "name": "minus_one",
          "type": "compute",
          "inputs": ["input"],
          "compute_function": inputs => inputs[0] - 1
        },
        {
          "name": "always_two",
          "type": "compute",
          "inputs": ["plus_one", "minus_one"],
          "compute_function": inputs => inputs[0] - inputs[1]
        }
      ],
      "operations": [
        {
          "type": "add_callback",
          "cell": "always_two",
          "name": "callback1"
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 2
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 3
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 4
        },
        {
          "type": "set_value",
          "cell": "input",
          "value": 5
        },
        {
          "type": "expect_callback_values",
          "callback": "callback1",
          "values": []
        }
      ]
    },
    "expected": {}
  }
]
