import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import About from './pages/About';
import Play from './pages/Play';
import Error from './pages/Error';

// Assets
import "./assets/css/style.css";

const Root = () => <Outlet />

// Router
const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "*",
          element: <Error />,
        },        
        {
          path: "/achievements",
          element: <Achievements />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/about",
          element: <About />,
        },              
        {
          path: "/play",
          element: <Play />,
        },               
      ],      
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
,
)

