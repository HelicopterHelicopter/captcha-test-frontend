import './App.css'
import { Route, Routes } from 'react-router-dom';
import Google from './pages/google';
import Custom from './pages/custom';
import Home from './pages/Home';
import AWS from './pages/aws';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/google' element={<Google/>}/>
      <Route path='/custom' element={<Custom/>}/>
      <Route path='/aws' element={<AWS/>}/>
    </Routes>
  )
}

export default App
