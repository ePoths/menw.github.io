import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./css/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { theme } from "./css/Theme";
import router from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle></GlobalStyle>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
