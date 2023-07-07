import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home';
import Volunteer from './Pages/Volunteer';
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/volunteer-registration",
    element: <Volunteer />,
  },
  {
    path: "/apl-registration",
    element: <Volunteer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={true}
      closeButton={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      transition={Slide}
      theme="light"
    />
  </>
);