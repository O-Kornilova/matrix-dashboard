import { useEffect, useState } from 'react'
import { useTableContext } from '../context/TableContext'

export const Controls = () => {
  const { M, N, setX, generateTable, addRow } = useTableContext()

  const [mInput, setMInput] = useState('5')
  const [nInput, setNInput] = useState('5')
  const [xInput, setXInput] = useState('5')

  useEffect(() => {
    setMInput(M.toString())
  }, [M])

  useEffect(() => {
    setNInput(N.toString())
  }, [N])

  const handleGenerate = () => {
    const mValue = Math.max(0, Math.min(100, parseInt(mInput) || 0))
    const nValue = Math.max(0, Math.min(100, parseInt(nInput) || 0))
    const xValue = parseInt(xInput) || 0

    setX(xValue)
    generateTable(mValue, nValue)
  }

  return (
    <div className='controls'>
      <div className='controls-inputs'>
        <div className='input-group'>
          <label>M (Rows: 0-100)</label>
          <input
            type='number'
            min='0'
            max='100'
            value={mInput}
            onChange={e => setMInput(e.target.value)}
          />
        </div>

        <div className='input-group'>
          <label>N (Columns: 0-100)</label>
          <input
            type='number'
            min='0'
            max='100'
            value={nInput}
            onChange={e => setNInput(e.target.value)}
          />
        </div>

        <div className='input-group'>
          <label>X (Nearest cells)</label>
          <input
            type='number'
            min='0'
            value={xInput}
            onChange={e => setXInput(e.target.value)}
          />
        </div>
      </div>

      <div className='controls-buttons'>
        <button className='btn-primary' onClick={handleGenerate}>
          Generate Table
        </button>
        <button className='btn-success' onClick={addRow} disabled={N === 0}>
          Add Row
        </button>
      </div>
    </div>
  )
}
