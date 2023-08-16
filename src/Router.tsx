import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import World from "./pages/World";
import Account from "./pages/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/world",
    element: <World />,
  },
  {
    path: "/account",
    element: <Account />,
  },
]);

export default router;
