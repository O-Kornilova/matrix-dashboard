import { useTableContext } from '../context/TableContext'
import {
  calculatePercentage,
  calculateHeatmapIntensity
} from '../utils/calculations'

type Props = {
  rowIndex: number
  colIndex: number
  amount: number
}

export const TableCell = ({ rowIndex, colIndex, amount }: Props) => {
  const {
    incrementCell,
    setHoveredCell,
    hoveredSum,
    nearestCells,
    getRowSum,
    data
  } = useTableContext()

  const isNearest = nearestCells.some(
    cell => cell.rowIndex === rowIndex && cell.colIndex === colIndex
  )

  const showPercentage = hoveredSum === rowIndex

  const handleClick = () => {
    incrementCell(rowIndex, colIndex)
  }

  const handleMouseEnter = () => {
    setHoveredCell({ rowIndex, colIndex, amount })
  }

  const handleMouseLeave = () => {
    setHoveredCell(null)
  }

  const getDisplayValue = () => {
    if (showPercentage) {
      const rowSum = getRowSum(rowIndex)
      return `${calculatePercentage(amount, rowSum)}%`
    }
    return amount
  }

  const getBackgroundColor = () => {
    if (isNearest) return ''

    if (showPercentage) {
      const row = data[rowIndex]
      const maxInRow = Math.max(...row.map(cell => cell.amount))
      const intensity = calculateHeatmapIntensity(amount, maxInRow)

      const lightness = Math.round(50 - intensity * 30)
      return `hsl(220, 50%, ${lightness}%)`
    }

    return ''
  }

  const style = {
    backgroundColor: getBackgroundColor()
  }

  const className = `cell-regular ${isNearest ? 'cell-nearest' : ''} ${
    showPercentage ? 'cell-heatmap' : ''
  }`

  return (
    <td
      className={className}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {getDisplayValue()}
    </td>
  )
}
