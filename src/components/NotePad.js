import React from 'react'
import WhiteboardPage from './WhiteboardPage'
import AdminClientDetail from './AdminClientDetail'
import Takeaway from './Takeaway'

import '../styles/Notepad.css'

function NotePad() {
  return (
    <div className='notepad'>
      <AdminClientDetail/>
      <WhiteboardPage/>
      <Takeaway/>
    </div>
  )
}

export default NotePad
