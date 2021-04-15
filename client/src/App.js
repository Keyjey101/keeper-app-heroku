import React from "react"
import { useRoutes } from "./Routes";
import {BrowserRouter} from "react-router-dom"
import Sidebar from "./partials/Sidebar"
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/authContext";
import Footer from "./partials/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  
  const {login, logout, userToken, userId} = useAuth()
  const isAuth = !!userToken
  
console.log(userId)

  const routes = useRoutes(isAuth)

  
  return (
 <AuthContext.Provider value ={{login, logout, userToken, userId, isAuth}}>
    <BrowserRouter>
    <Sidebar />
    <div className="container">
      {routes}
    </div>
    <Footer />
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
