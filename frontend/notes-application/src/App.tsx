import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<h1>Notes</h1>}></Route>
      <Route path='/new-note' element={<h1>New</h1>}></Route>
      <Route path='/:id'>
        <Route index element={<h1>View</h1>}></Route>
        <Route path='edit' element={<h1>Edit</h1>}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    
  )
}

export default App
