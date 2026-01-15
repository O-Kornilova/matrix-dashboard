import { TableProvider } from './context/TableContext'
import { Controls } from './components/Controls'
import { Table } from './components/Table'
import './App.css'

function App () {
  return (
    <TableProvider>
      <div className='app'>
        <h1>O.Kornilova Test Task</h1>
        <Controls />
        <Table />
      </div>
    </TableProvider>
  )
}

export default App
