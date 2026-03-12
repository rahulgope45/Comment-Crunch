import './App.css'
import { Route,Routes,Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/LoginPage'
import Signup from './pages/Signup'
import { useAuthStore } from './store/authStore'
import Home from './pages/Home'


function App() {
  // const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  

  return (
    <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </main>
  )
}

export default App
