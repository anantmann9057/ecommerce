
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Cart from "./pages/Cart"
  import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
    <Header></Header>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/cart' element={<Cart/>} />

       </Routes>
       <ToastContainer />
    </>
  )
}

export default App
