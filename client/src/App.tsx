import { FC } from "react";
import { AuthLayout } from "./components/Layout/AuthLayout";
import { UserRegister } from "./components/pages/UserRegister";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLogin } from "./components/pages/UserLogin";
import Kakeibo from "./components/pages/kakeibo/create";
import { AppLayout } from "./components/Layout/AppLayout";
import { MantineProvider } from "@mantine/core";

const App : FC = () => {
  
  return (
    <div>
      <MantineProvider 
        inherit
        theme={{
            focusRingStyles: {
              resetStyles: () => ({ outline: 'none' }),
              styles: (theme) => ({ outline: `2px solid ${theme.colors.orange[5]}` }),
              inputStyles: (theme) => ({ outline: `2px solid ${theme.colors.orange[5]}` }),
            },
          }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route path="register" element={<UserRegister/>}/>
              <Route path="login" element={<UserLogin/>}/>
            </Route>
            <Route path="/" element={<AppLayout/>}>
              <Route path="create" element={<Kakeibo/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  )
}

export default App
