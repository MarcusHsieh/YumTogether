import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css"; 

import ErrorPage from "./error-page"; 

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

import CalorieTracker from "./routes/calorie-tracker";
import DciCalc from "./routes/dci-calc";
import DciResult from "./routes/dci-result";

import Index from "./routes/index"; 
import Start from "./routes/root"; // startup page
import NamePrompt from './routes/name-prompt'; 

import { UserProvider } from './context/UserContext'; 
import { YumsProvider } from "./context/YumsContext";
import { DCIProvider } from "./context/DCIContext";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Root />, 
    errorElement: <ErrorPage />, 
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />, 
        children: [
          { index: true, element: <Index /> }, 
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
          {
            path: "dci-calc",
            element: <DciCalc />,
          },
          {
            path: "dci-result",
            element: <DciResult />,
          },
          {
            path: "cal-tracker",
            element: <CalorieTracker />,
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
    element: <Start />, 
    errorElement: <ErrorPage />, 
  },
]);

// render application with contexts
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider> 
      <YumsProvider>
        <DCIProvider>
          <RouterProvider router={router} /> 
        </DCIProvider>
      </YumsProvider>
    </UserProvider> 
  </React.StrictMode>
);
