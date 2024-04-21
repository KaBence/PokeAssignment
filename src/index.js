import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import About from './routes/About';
import FrontPage from './routes/FrontPage';
import { RouterProvider, createHashRouter} from "react-router-dom"
import Details from './routes/Details';

const router = createHashRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <FrontPage/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/pokemon/:id",
        element: <Details/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);
