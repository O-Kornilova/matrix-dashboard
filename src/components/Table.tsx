import { useTableContext } from '../context/TableContext'
import { TableCell } from './TableCell'

export const Table = () => {
  const { data, N, getRowSum, getColumnPercentile, removeRow, setHoveredSum } =
    useTableContext()

  if (data.length === 0) {
    return (
      <div className='table-container'>
        <div className='empty-state'>
          <p>No data. Please generate a table using controls above.</p>
        </div>
      </div>
    )
  }

  const handleSumMouseEnter = (rowIndex: number) => {
    setHoveredSum(rowIndex)
  }

  const handleSumMouseLeave = () => {
    setHoveredSum(null)
  }

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Cell ID</th>
            {Array.from({ length: N }, (_, i) => (
              <th key={i}>N={i + 1}</th>
            ))}
            <th>Sum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>M={rowIndex + 1}</td>
              {row.map((cell, colIndex) => (
                <TableCell
                  key={cell.id}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  amount={cell.amount}
                />
              ))}
              <td
                className='cell-sum'
                onMouseEnter={() => handleSumMouseEnter(rowIndex)}
                onMouseLeave={handleSumMouseLeave}
              >
                {getRowSum(rowIndex)}
              </td>
              <td>
                <div className='row-actions'>
                  <button
                    className='btn-danger btn-remove-row'
                    onClick={() => removeRow(rowIndex)}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td className='cell-percentile'>60th percentile</td>
            {Array.from({ length: N }, (_, colIndex) => (
              <td key={colIndex} className='cell-percentile'>
                {getColumnPercentile(colIndex).toFixed(1)}
              </td>
            ))}
            <td className='cell-percentile'></td>
            <td className='cell-percentile'></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
