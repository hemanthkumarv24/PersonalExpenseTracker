import './App.css'
import LandingPage from './landing-page/LandingPage'
import SignIn from './sign-in/SignIn'
import SignUp from './sign-up/SignUp'
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dash/Dashboard';


function App() {

  return (
    <>
<ConfigProvider>
<Router>
<Routes>

      {/* <LandingPage/> */}
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

</Routes>
</Router>
</ConfigProvider>
    </>
  )
}

export default App
