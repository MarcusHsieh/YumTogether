import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import ErrorPage from "./error-page"

import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact"

import EditContact, {
  action as editAction,
} from "./routes/edit";

// root loader, action
import Root, { 
  loader as rootLoader,
  action as rootAction, 
} from "./routes/root"; 

import { 
  action as destroyAction 
} from "./routes/destroy";

import Index from "./routes/index";

import StartupScreen from "./routes/startup-screen/start"

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartupScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/root",
    // element: <div>Hello world!</div>,
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        // wrap routes again so errorPage shows up in root outlet
        errorElement: <ErrorPage />,
        children: [
          // index instead of path, loads whenever no parent/outlet
          // put the "what would you like to do" page here
          { index: true, element: <Index /> },
          // contacts
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          // editor
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
