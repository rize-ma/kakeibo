import { FC } from "react";
import { AuthLayout } from "./components/Layout/AuthLayout";
import { UserRegister } from "./components/pages/UserRegister";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLogin } from "./components/pages/UserLogin";
import {Create} from "./components/pages/kakeibo/Create";
import { AppLayout } from "./components/Layout/AppLayout";
import { MantineProvider } from "@mantine/core";
import {AppRouter} from "./components/AppRouter";
import { DateSearch } from "./components/pages/kakeibo/DateSearch";
import { KakeiboDetails } from "./components/pages/kakeibo/kakeiboDetails";
import { Graph } from "./components/pages/kakeibo/Graph";

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
            <Route path="/" element={<AppRouter/>}/>
            <Route path="auth" element={<AuthLayout/>}>
              <Route path="register" element={<UserRegister/>}/>
              <Route path="login" element={<UserLogin/>}/>
            </Route>
            <Route path="kakeibo" element={<AppLayout/>}>
              <Route path="create" element={<Create/>}/>
              <Route path="calender" element={<DateSearch/>}/>
              <Route path="calender/:kakeiboId" element={<KakeiboDetails/>}/>
              <Route path="graph" element={<Graph/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  )
}

export default App
