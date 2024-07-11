import './App.css'
import { Route, Routes } from 'react-router-dom';
import Google from './pages/google';
import Custom from './pages/custom';
import Home from './pages/Home';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/google' element={<Google/>}/>
      <Route path='/custom' element={<Custom/>}/>
    </Routes>
  )
}

export default App
