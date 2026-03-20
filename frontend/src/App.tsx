import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/LoginPage'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Application from './pages/Application'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import ModelDetailPage from './pages/ABoutModel'
import AboutPage from './pages/AboutProject'
import ContactRedirect from './pages/AboutUs'

function App() {
const {isCheckingAuth,checkAuth} = useAuth()

useEffect(()=>{
  checkAuth();
},[])

if(isCheckingAuth){
  return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <span className="font-sans text-xs uppercase tracking-widest opacity-40">
          Loading...
        </span>
      </div>
    );
}

 
    return (
    <main>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactRedirect />} />
        <Route path='/model' element={<ModelDetailPage />} />
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
