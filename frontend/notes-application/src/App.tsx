import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NewNote } from './NewNote'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type Tag = {
  label_id: string,
  value: string
}


function App() {
  return (
    <Container className='my-4'>
    <Routes>
      <Route path='/' element={<h1>Notes</h1>}></Route>
      <Route path='/new' element={<NewNote />}></Route>
      <Route path='/:id'>
        <Route index element={<h1>View</h1>}></Route>
        <Route path='edit' element={<h1>Edit</h1>}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
  )
}

export default App
