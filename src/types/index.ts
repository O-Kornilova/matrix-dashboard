export type CellId = number
export type CellValue = number

export interface Cell {
  id: CellId
  amount: CellValue
}

export type TableData = Cell[][]

export interface HoveredCell {
  rowIndex: number
  colIndex: number
  amount: CellValue
}

export type HoveredSum = number | null
