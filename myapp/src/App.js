import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Crud from './Crud';
import { useState } from 'react';


function App() {
  const[openmodal,setOpenModal]=useState(false);
  return (
    <>
    <body>
      <center>
        <h2 style={{backgroundColor:"rgb(169 209 235)",color:"black",padding:"10px"}}>Employee Managment App</h2>
        <div className='d-flex'>
          <div className='w-50'>
            <h2>Employee List</h2>
          </div>
          <div className='w-50'>
            <button className='openModalbtn' class="btn btn-primary" onClick={() => {setOpenModal(true)}}>Add Employee</button>
          </div>
        </div>
        {openmodal && <Crud closeModal={setOpenModal}/>}
      </center>
    </body>
    </>
  );
}

export default App;
