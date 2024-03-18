
import "antd/dist/antd"
import './App.css';
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes }  from 'react-router-dom'
import Homepage from './pages/Homepage';
import Itempage from './pages/Itempage';
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BillsPage from "./pages/BillsPage";
import CustomerPage from "./pages/CustomerPage";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
<Route   path="/" element={
<ProtectedRoute>
<Homepage />
</ProtectedRoute>
}  />


<Route   path="/items" element={
<ProtectedRoute>
<Itempage />
</ProtectedRoute>
}  />

<Route   path="/cart" element={
<ProtectedRoute>
<CartPage />
</ProtectedRoute>
}  />

<Route   path="/bills" element={
<ProtectedRoute>
<BillsPage />
</ProtectedRoute>
}  />
<Route   path="/customers" element={
<ProtectedRoute>
<CustomerPage />
</ProtectedRoute>
}  />

<Route   path="/login" element={<Login />}  />
<Route   path="/register" element={<Register />}  />
      </Routes>
      </BrowserRouter>
    </>
  )
}



export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
    return children
  }
  else {
    return <Navigate to="/login" />
  }
}
