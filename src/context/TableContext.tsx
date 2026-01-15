import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { TableData, Cell, HoveredCell, HoveredSum } from '../types'
import {
  generateTableData,
  calculateRowSum,
  calculate60thPercentile,
  getColumnValues,
  findNearestCells,
  generateRandomAmount
} from '../utils/calculations'

type TableContextType = {
  M: number
  N: number
  X: number
  data: TableData
  hoveredCell: HoveredCell
  hoveredSum: HoveredSum
  nearestCells: { rowIndex: number; colIndex: number }[]
  setM: (value: number) => void
  setN: (value: number) => void
  setX: (value: number) => void
  generateTable: (m: number, n: number) => void
  incrementCell: (rowIndex: number, colIndex: number) => void
  setHoveredCell: (cell: HoveredCell) => void
  setHoveredSum: (rowIndex: HoveredSum) => void
  addRow: () => void
  removeRow: (rowIndex: number) => void
  getRowSum: (rowIndex: number) => number
  getColumnPercentile: (colIndex: number) => number
}

const TableContext = createContext<TableContextType | undefined>(undefined)

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [M, setM] = useState(5)
  const [N, setN] = useState(5)
  const [X, setX] = useState(5)
  const [data, setData] = useState<TableData>([])
  const [hoveredCell, setHoveredCell] = useState<HoveredCell>(null)
  const [hoveredSum, setHoveredSum] = useState<HoveredSum>(null)
  const [nearestCells, setNearestCells] = useState<
    { rowIndex: number; colIndex: number }[]
  >([])

  const generateTable = (m: number, n: number) => {
    const newData = generateTableData(m, n)
    setData(newData)
    setM(m)
    setN(n)
    setHoveredCell(null)
    setHoveredSum(null)
    setNearestCells([])
  }

  const incrementCell = (rowIndex: number, colIndex: number) => {
    setData(prevData => {
      const newData = prevData.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex
            ? { ...cell, amount: cell.amount + 1 }
            : cell
        )
      )
      return newData
    })
  }

  const handleSetHoveredCell = (cell: HoveredCell) => {
    setHoveredCell(cell)
    if (cell) {
      const nearest = findNearestCells(
        data,
        cell.amount,
        X,
        cell.rowIndex,
        cell.colIndex
      )
      setNearestCells(nearest)
    } else {
      setNearestCells([])
    }
  }

  const addRow = () => {
    if (N === 0) return
    const newRow: Cell[] = []
    let maxId = 0
    data.forEach(row => {
      row.forEach(cell => {
        if (cell.id > maxId) maxId = cell.id
      })
    })

    for (let i = 0; i < N; i++) {
      newRow.push({
        id: ++maxId,
        amount: generateRandomAmount()
      })
    }

    setData([...data, newRow])
    setM(data.length + 1)
  }

  const removeRow = (rowIndex: number) => {
    const newData = data.filter((_, idx) => idx !== rowIndex)
    setData(newData)
    setM(newData.length)
  }

  const getRowSum = (rowIndex: number): number => {
    if (!data[rowIndex]) return 0
    return calculateRowSum(data[rowIndex])
  }

  const getColumnPercentile = (colIndex: number): number => {
    const columnValues = getColumnValues(data, colIndex)
    return calculate60thPercentile(columnValues)
  }

  return (
    <TableContext.Provider
      value={{
        M,
        N,
        X,
        data,
        hoveredCell,
        hoveredSum,
        nearestCells,
        setM,
        setN,
        setX,
        generateTable,
        incrementCell,
        setHoveredCell: handleSetHoveredCell,
        setHoveredSum,
        addRow,
        removeRow,
        getRowSum,
        getColumnPercentile
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext must be used within TableProvider')
  }
  return context
}
