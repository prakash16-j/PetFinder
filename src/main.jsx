import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './router/Router.jsx'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
 <>
    {/* Toast global */}
    <ToastContainer position="top-center" autoClose={2000} />

    {/* Router */}
    <RouterProvider router={routes} />
 </>
)
