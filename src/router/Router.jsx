import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import LostPet from "../Pages/LostPet";
import FoundPet from "../Pages/FoundPet";
import About from "../Pages/About";
import AddPet from "../Pages/AddPet";
import AddFound from "../Pages/AddFound";
import Contact from "../Pages/Contact";

let routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <HomeLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },
      {
        path: "lost-pet",
        element: <LostPet />,
      },
      {
        path: "found-pet",
        element: <FoundPet />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "addpet",
        element: <AddPet />,
      },
      {
        path: "addfound",
        element: <AddFound />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
export default routes;
