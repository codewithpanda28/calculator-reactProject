"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  // State to track the current display value
  const [display, setDisplay] = useState("0")
  // State to track the calculation expression (e.g. "120 × 10.5")
  const [expression, setExpression] = useState("")
  // State to track the current operation
  const [operation, setOperation] = useState<string | null>(null)
  // State to track the previous value
  const [prevValue, setPrevValue] = useState<number | null>(null)
  // State to track if the calculator has just calculated a result
  const [calculated, setCalculated] = useState(false)

  /**
   * Handles number button clicks
   * @param num - The number that was clicked
   */
  const handleNumberClick = (num: string) => {
    // If we just calculated a result, start fresh
    if (calculated) {
      setDisplay(num)
      setExpression("")
      setCalculated(false)
      return
    }

    // If display is "0", replace it with the number
    // Otherwise append the number to the display
    setDisplay((prev) => (prev === "0" ? num : prev + num))
  }

  /**
   * Handles decimal point button click
   */
  const handleDecimalClick = () => {
    // If we just calculated a result, start fresh with "0."
    if (calculated) {
      setDisplay("0.")
      setExpression("")
      setCalculated(false)
      return
    }

    // Only add decimal if it doesn't already exist in the display
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".")
    }
  }

  /**
   * Handles operation button clicks (+, -, ×, ÷)
   * @param op - The operation that was clicked
   */
  const handleOperationClick = (op: string) => {
    // Convert current display to a number
    const currentValue = Number.parseFloat(display)

    // If we already have a previous value and an operation,
    // calculate the result before setting the new operation
    if (prevValue !== null && operation && !calculated) {
      const result = calculate(prevValue, currentValue, operation)
      setDisplay(result.toString())
      setExpression(`${result} ${op}`)
      setPrevValue(result)
    } else {
      // Otherwise, set the current value as the previous value
      setExpression(`${currentValue} ${op}`)
      setPrevValue(currentValue)
    }

    // Set the new operation and prepare for the next number
    setOperation(op)
    setCalculated(true)
  }

  /**
   * Handles equals button click
   */
  const handleEqualsClick = () => {
    // If we don't have a previous value or operation, do nothing
    if (prevValue === null || !operation) return

    // Convert current display to a number
    const currentValue = Number.parseFloat(display)

    // Calculate the result
    const result = calculate(prevValue, currentValue, operation)

    // Update the display and expression
    setDisplay(result.toString())
    setExpression(`${prevValue} ${operation} ${currentValue}`)

    // Reset the operation and previous value
    setOperation(null)
    setPrevValue(null)
    setCalculated(true)
  }

  /**
   * Handles clear button click
   */
  const handleClearClick = () => {
    // Reset all state
    setDisplay("0")
    setExpression("")
    setOperation(null)
    setPrevValue(null)
    setCalculated(false)
  }

  /**
   * Handles +/- button click to toggle between positive and negative
   */
  const handleToggleSign = () => {
    setDisplay((prev) => {
      // If the current value is 0, don't do anything
      if (prev === "0") return prev
      // Otherwise toggle the sign
      return prev.startsWith("-") ? prev.substring(1) : "-" + prev
    })
  }

  /**
   * Handles % button click to convert to percentage
   */
  const handlePercentage = () => {
    setDisplay((prev) => {
      const value = Number.parseFloat(prev) / 100
      return value.toString()
    })
  }

  /**
   * Calculates the result of an operation
   * @param a - First number
   * @param b - Second number
   * @param op - Operation to perform
   * @returns The result of the calculation
   */
  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "×":
        return a * b
      case "÷":
        return a / b
      default:
        return b
    }
  }

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Number keys
      if (/^[0-9]$/.test(e.key)) {
        handleNumberClick(e.key)
      }
      // Decimal key
      else if (e.key === ".") {
        handleDecimalClick()
      }
      // Operation keys
      else if (e.key === "+") {
        handleOperationClick("+")
      } else if (e.key === "-") {
        handleOperationClick("-")
      } else if (e.key === "*") {
        handleOperationClick("×")
      } else if (e.key === "/") {
        e.preventDefault() // Prevent browser's find functionality
        handleOperationClick("÷")
      }
      // Equals keys
      else if (e.key === "=" || e.key === "Enter") {
        handleEqualsClick()
      }
      // Clear keys
      else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        handleClearClick()
      }
      // Backspace key
      else if (e.key === "Backspace") {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1))
        } else {
          setDisplay("0")
        }
      }
    }

    // Add event listener
    window.addEventListener("keydown", handleKeyDown)

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [display, prevValue, operation, calculated])

  return (
    <div className="mx-auto z-10 relative w-full max-w-[280px] rounded-[12px] overflow-hidden bg-[#F0F0F3] shadow-[-10px_-10px_30px_0px_#FFF,_10px_10px_30px_0px_rgba(174,174,192,0.40)]">
      {/* Calculator display */}
      <div className="bg-black text-white p-4 flex flex-col items-end justify-end min-h-[180px]">
        {/* Expression display (e.g. "120 × 10.5") */}
        <div className="text-gray-500 text-lg mb-2 h-6">{expression}</div>
        {/* Result display */}
        <div className="text-4xl font-medium tracking-tighter">{display}</div>
      </div>

      {/* Calculator buttons */}
      <div className="p-3 grid grid-cols-4 gap-2 bg-[#F0F0F3]">
        {/* First row */}
        <Button
          onClick={handleClearClick}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          C
        </Button>
        <Button
          onClick={handleToggleSign}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          +/-
        </Button>
        <Button
          onClick={handlePercentage}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          %
        </Button>
        <Button
          onClick={() => handleOperationClick("÷")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-500 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          ÷
        </Button>

        {/* Second row */}
        <Button
          onClick={() => handleNumberClick("7")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          7
        </Button>
        <Button
          onClick={() => handleNumberClick("8")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          8
        </Button>
        <Button
          onClick={() => handleNumberClick("9")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          9
        </Button>
        <Button
          onClick={() => handleOperationClick("×")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-500 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          ×
        </Button>

        {/* Third row */}
        <Button
          onClick={() => handleNumberClick("4")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          4
        </Button>
        <Button
          onClick={() => handleNumberClick("5")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          5
        </Button>
        <Button
          onClick={() => handleNumberClick("6")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          6
        </Button>
        <Button
          onClick={() => handleOperationClick("-")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-500 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          -
        </Button>

        {/* Fourth row */}
        <Button
          onClick={() => handleNumberClick("1")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          1
        </Button>
        <Button
          onClick={() => handleNumberClick("2")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          2
        </Button>
        <Button
          onClick={() => handleNumberClick("3")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          3
        </Button>
        <Button
          onClick={() => handleOperationClick("+")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-500 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          +
        </Button>

        {/* Fifth row */}
        <Button
          onClick={() => handleNumberClick("0")}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 col-span-2 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          0
        </Button>
        <Button
          onClick={handleDecimalClick}
          className="bg-gray-100 hover:bg-gray-200 text-blue-400 font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),_inset_2px_2px_5px_rgba(174,174,192,0.2)]"
        >
          .
        </Button>
        <Button
          onClick={handleEqualsClick}
          className="bg-teal-400 hover:bg-teal-500 text-white font-medium text-xl rounded-full h-14 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),_inset_2px_2px_5px_rgba(0,0,0,0.1)]"
        >
          =
        </Button>
      </div>
    </div>
  )
}

