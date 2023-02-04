import { FC } from "react";
import { AuthLayout } from "./components/Layout/AuthLayout";
import { UserRegister } from "./components/pages/UserRegister";

const App : FC = () => {
  
  return (
    <div>
      <AuthLayout>
        <UserRegister/>
      </AuthLayout>
    </div>
  )
}

export default App
