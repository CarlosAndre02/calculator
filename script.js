class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = null
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes(".")) return
        if (this.currentOperand.length >= 12) return
        this.currentOperand += number
    }

    updateOutput () {
        this.currentOperandElement.innerText = this.currentOperand
        this.previousOperandElement.innerText = this.operation != null ? `${Number(this.previousOperand)} ${this.operation}` : ''
    }

    chooseOperation (operand) {
        if (this.currentOperand == '') return
        if(this.previousOperand == ''){
            this.previousOperand = this.currentOperand
            this.currentOperand = ""
            this.operation = operand
            this.updateOutput()
            return
        }
        calculator.calculate(operand)
    }

    calculate (operand) {
        let previous = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        let total

        switch (this.operation) {
            case '+': total = previous + current 
                break;
            case '-': total = previous - current
                break;
            case 'x': total = previous * current
                break;
            case '÷': total = previous / current
                break;
            default:
                break;
        } 

        this.previousOperand = total
        this.currentOperand = ""
        this.operation = operand
        this.updateOutput()
    }

    equal () {
        if (this.currentOperand == '' || this.previousOperand == '') return

        this.calculate(this.operation)
        this.currentOperand = this.previousOperand
        this.previousOperand = ""
        this.operation = null
        this.updateOutput()
    }

    switchSignal () {
        let currentNumber = Number(this.currentOperand)
        this.currentOperand = currentNumber > 0 ? "-" + this.currentOperand : this.currentOperand.replace(/[-]/, '')
        this.updateOutput()
    }

    clear () {
        this.currentOperand = this.currentOperand.slice(0, -1)
        this.updateOutput()
    }

    allClear () {
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = null
        this.updateOutput()
    }
}
  
const previousOperand = document.querySelector(".previous-operand")
const currentOperand = document.querySelector(".current-operand")
const numbersBtn = document.querySelectorAll(".number-keys")
const operationsBtn = document.querySelectorAll(".operation-keys")
const equalBtn = document.querySelector(".equal-key")
const signal = document.querySelector(".switch-signal")
const clear = document.querySelector(".clear-key")
const allClear = document.querySelector(".allClear-key")

const calculator = new Calculator(previousOperand, currentOperand)

numbersBtn.forEach(button => {
button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateOutput()
    })
})

operationsBtn.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
    })
})

equalBtn.addEventListener("click", () => {
    calculator.equal()
})

clear.addEventListener("click", () => {
    calculator.clear()
})

allClear.addEventListener("click", () => {
    calculator.allClear()
})

signal.addEventListener("click", () => {
    calculator.switchSignal()
})