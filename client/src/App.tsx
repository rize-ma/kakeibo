import { FC } from "react";
import { AuthLayout } from "./components/Layout/AuthLayout";
import { UserRegister } from "./components/pages/UserRegister";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLogin } from "./components/pages/UserLogin";

const App : FC = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path="register" element={<UserRegister/>}/>
            <Route path="login" element={<UserLogin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
