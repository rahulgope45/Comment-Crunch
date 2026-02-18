import './App.css'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import { useAuthStore } from './store/authStore'


function App() {
  // const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  

  return (
    <>
    <Signup/>
    </>
  )
}

export default App
