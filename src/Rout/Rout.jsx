import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from '../Components/Home/Home'
import Cart from '../Components/Cart/Cart'
import Header from '../ShareModules/Header/Header'
import Footer from '../ShareModules/Footer/Footer'
const Rout = () => {
  return (
<Router>
<Header/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/cart' element={<Cart/>}/>
</Routes>
<Footer/>
</Router>
  )
}

export default Rout