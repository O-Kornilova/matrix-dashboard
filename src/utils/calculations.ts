import type { Cell, TableData } from '../types'

// Generate random 3-digit number
export const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100 // 100-999
}

// Generate initial table data
export const generateTableData = (M: number, N: number): TableData => {
  let cellId = 0
  const data: TableData = []

  for (let i = 0; i < M; i++) {
    const row: Cell[] = []
    for (let j = 0; j < N; j++) {
      row.push({
        id: cellId++,
        amount: generateRandomAmount()
      })
    }
    data.push(row)
  }

  return data
}

// Calculate sum of a row
export const calculateRowSum = (row: Cell[]): number => {
  return row.reduce((sum, cell) => sum + cell.amount, 0)
}

// Calculate 60th percentile for a column
export const calculate60thPercentile = (column: number[]): number => {
  const sorted = [...column].sort((a, b) => a - b)
  const index = Math.ceil(sorted.length * 0.6) - 1
  return sorted[index] || 0
}

// Get column values
export const getColumnValues = (
  data: TableData,
  colIndex: number
): number[] => {
  return data.map(row => row[colIndex]?.amount || 0)
}

// Find X nearest cells by amount
export const findNearestCells = (
  data: TableData,
  targetAmount: number,
  X: number,
  excludeRowIndex: number,
  excludeColIndex: number
): { rowIndex: number; colIndex: number }[] => {
  const cells: {
    rowIndex: number
    colIndex: number
    amount: number
    diff: number
  }[] = []

  data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (rowIndex === excludeRowIndex && colIndex === excludeColIndex) return
      cells.push({
        rowIndex,
        colIndex,
        amount: cell.amount,
        diff: Math.abs(cell.amount - targetAmount)
      })
    })
  })

  cells.sort((a, b) => {
    if (a.diff !== b.diff) {
      return a.diff - b.diff
    }
    return a.amount - b.amount
  })

  return cells
    .slice(0, X)
    .map(({ rowIndex, colIndex }) => ({ rowIndex, colIndex }))
}

// Calculate percentage of cell in row
export const calculatePercentage = (
  cellAmount: number,
  rowSum: number
): number => {
  return rowSum > 0 ? Math.round((cellAmount / rowSum) * 100) : 0
}

// Calculate heatmap intensity (0-1) based on max value in row
export const calculateHeatmapIntensity = (
  cellAmount: number,
  maxInRow: number
): number => {
  return maxInRow > 0 ? cellAmount / maxInRow : 0
}
