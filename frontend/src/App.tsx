import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/LoginPage'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Application from './pages/Application'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'

function App() {

const {checkAuth} = useAuth()

useEffect(()=>{
  checkAuth();
},[])

  return (
    <main>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={
          <ProtectedRoute>
            <Application />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
  )
}

export default App
