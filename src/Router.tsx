import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Auth";
import Auth from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Auth",
    element: <Auth />,
  },
]);

export default router;
