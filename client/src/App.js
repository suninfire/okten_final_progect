import {Route, Routes} from "react-router";



import RegistrationComponent from "./components/Auth/RegistrationComponent";
import LoginComponent from "./components/Auth/LoginComponent";
import PubsComponent from "./components/Home/PubsComponent";
import TidingsComponent from "./components/Home/TidingsComponent";
import TopComponent from "./components/Home/TopComponent";
import HomePage from "./Pages/HomePage/HomePage";
import DrinkerPage from "./Pages/DrinkerPage/DrinkerPage";
import UserPage from "./Pages/UserPage/UserPage";
import AgeCheck from "./components/AgeCheck/AgeCheck";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PubProfileComponent from "./components/Pub/PubProfileComponent";
import PubTidingsComponent from "./components/Pub/PubTidingsComponent";
import PubResponsesComponent from "./components/Pub/PubResponsesComponent";

import './App.css'



export default function App() {

  return (
    <div class={'app'}>
<Routes>

   <Route path={'/'} element={<AgeCheck/>}/>

    <Route path={'/auth'} element={<AuthPage/>}>
        <Route path={'login'} element={<LoginComponent/>}/>
        <Route path={'registration'} element={<RegistrationComponent/>}/>
    </Route>


  <Route path={'/home'} element={<HomePage/>}>
      <Route path={'pubs'} element={<PubsComponent/>}/>
      <Route path={'tidings'} element={<TidingsComponent/>}/>
      <Route path={'top'} element={<TopComponent/>}/>
  </Route>

    <Route path={'/pub/:pubId'} element={<PubProfileComponent/>}>
        <Route path={'tidings'} element={<PubTidingsComponent/>}/>
        <Route path={'responses'} element={<PubResponsesComponent/>}/>
    </Route>

    <Route path={'/user'} element={<UserPage/>}/>

    <Route path={'/drinker'} element={<DrinkerPage/>}/>

</Routes>
    </div>
);
}

// .catch(error => {
//     if (error.response.statusText === "Unauthorized") {
//         return  auth.refresh(localStorage.getItem('refreshToken'))
//     }
// })