// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import SplashScreen from "./components/SplashScreen"
import { Home } from "./pages/Home.jsx";
import { Administrator } from "./pages/Administrator.jsx"
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Categorias } from "./pages/Categorias";
import { Historias } from "./pages/Historias";
import PeopleCardDetail from "./components/PeopleCardDetail";
import { Categoria } from "./pages/Categoria";
import { HistoriaPlayer } from "./pages/HistoriaPlayer.jsx";
import { Profile } from "./pages/Profile.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { VerifyEmail } from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
        // CreateRoutesFromElements function allows you to build route elements declaratively.
        // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
        // Root, on the contrary, create a sister Route, if you have doubts, try it!
        // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
        // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

        // Root Route: All navigation will start from here.
        <Route path="/" element={<Layout />} errorElement={<NotFound/>} >

            {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:id" element={<Categoria />} />
            <Route path="/historias" element={<Historias />} />
            <Route path="/historias/:id" element={<HistoriaPlayer />} />
            <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
            <Route path="/demo" element={<Demo />} />
            <Route path="/detailspeople/:contactID" element={<PeopleCardDetail />} />
            <Route path="/administrator" element={<Administrator />} />
             <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
    )
);