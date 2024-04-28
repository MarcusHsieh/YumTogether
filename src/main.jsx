import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css"; // Ensure this file exists in the correct location

import ErrorPage from "./error-page"; // Error handling component

// Importing components and their respective loaders and actions
import Yum, {
  loader as yumLoader,
  // action as yumAction,
} from "./routes/yum";

import EditYum, {
  // action as yumEditAction,
} from "./routes/edit";

import Root, { 
  loader as rootLoader,
  action as rootAction,
} from "./routes/home";

import { 
  action as destroyAction,
} from "./routes/destroy";

import Index from "./routes/index"; // Default landing page
import Start from "./routes/root"; // Startup or initial page
import NamePrompt from './routes/name-prompt'; // Page to prompt user for name

import { UserProvider } from './context/UserContext'; // User context provider

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Root />, // Root component for the main application
    errorElement: <ErrorPage />, // Error handling
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />, // Error boundary for nested routes
        children: [
          { index: true, element: <Index /> }, // Default landing page when no specific path is given
          {
            path: "yums/:yumId",
            element: <Yum />,
            loader: yumLoader,
            // action: yumAction,
          },
          {
            path: "yums/:yumId/edit",
            element: <EditYum />,
            loader: yumLoader,
            // action: yumEditAction,
          },
          {
            path: "yums/:yumId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/create-user",
    element: <NamePrompt />,
  },
  {
    path: "/",
    element: <Start />, // Startup or initial page
    errorElement: <ErrorPage />, // Error handling
  },
]);

// Render the application with UserProvider for user context
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider> 
      <RouterProvider router={router} /> 
    </UserProvider> 
  </React.StrictMode>
);
