import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Createplan from './components/Createplan';
import Assignedplan from './components/Assignedplan';
import Resumework from './components/Resumework';
import Completed from './components/Completed';
import Lessonplan from './components/Lessonplan';
import Createuser from './components/Createuser';
import Createboard from './components/Createboard';
import Createclass from './components/Createclass';
import Createbooks from './components/Createbooks';
import Createpublications from './components/Createpublications';
import Addbook from './components/Addbook';
import Createlessonplan from './components/Createlessonplan';
import Admincompleted from './components/Admincompleted';
import Workinprogress from './components/Workinprogress';
import Adminsidenav from './components/Adminsidenav';
import Usersidebar  from './components/Usersidebar';
import Extra from './components/extra'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        {/* For User */}
        <Route path='/createplan' element={<Createplan />} />
        <Route path='/assignedplan' element={<Assignedplan />} />
        <Route path='/resumework' element={<Resumework />} />
        <Route path='/completed' element={<Completed />} />
        <Route path='/lessonplan' element={<Extra/>} />

        {/* For admin */}
        <Route path='/createuser' element={<Createuser />} />
        <Route path='/createboard' element={<Createboard />} />
        <Route path='/createclass' element={<Createclass />} />
        <Route path='/createbooks' element={<Createbooks />} />
        <Route path='/createpublications' element={<Createpublications />} />
        <Route path='/addbook' element={<Addbook />} />
        <Route path='/createlessonplan' element={<Createlessonplan />} />
        <Route path='/admincompleted' element={<Admincompleted />} />
        <Route path='/workinpro' element={<Workinprogress />} />
        <Route path='/admin' element={<Adminsidenav />} />
        <Route path='/user' element={<Usersidebar/>} />
        <Route path='/ex' element={<Lessonplan/>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
