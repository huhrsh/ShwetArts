import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Gallery from './Pages/Gallery';
import SignUp from './Pages/SignUp';
import { UserProvider } from './context';
import SignIn from './Pages/SignIn';
import Contacts from './Pages/Contacts';
import Store from './Pages/Store';
import Courses from './Pages/Courses';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <App /> },
      { path: "gallery/:style", element: <Gallery /> },
      { path: 'sign-up', element: <SignUp /> },
      {path:'sign-in', element:<SignIn/>},
      {path:'courses', element:<Courses/>},
      {path:'contacts', element:<Contacts/>},
      {path:'store', element:<Store/>},
    ]
  },
  {
    // path: "about",element:
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);