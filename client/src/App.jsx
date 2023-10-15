import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {
  HomeLayout,
  LandingPage,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddSubject,
  Stats,
  AllSubjects,
  Profile,
  Admin,
  EditSubject
} from "./pages";

import {action as registerAction} from "./pages/Register";
import {action as loginAction} from "./pages/Login";
import {action as addSubjectAction} from "./pages/AddSubject";
import {action as profileAction } from "./pages/Profile";
import {action as editSubjectAction} from "./pages/EditSubject";
import {action as deleteSubjectAction} from "./pages/DeleteSubject";

import {loader as dashboardLoader} from "./pages/DashboardLayout";
import {loader as allSubjectsLoader} from "./pages/AllSubjects";
import {loader as statsLoader} from "./pages/Stats";
import {loader as editSubjectLoader} from "./pages/EditSubject"
import {loader as adminLoader} from "./pages/Admin";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <LandingPage/>
      },
      {
        path: "register",
        element: <Register/>,
        action: registerAction
      },
      {
        path: "login",
        element: <Login/>,
        action: loginAction
      },
      {
        path: "dashboard",
        element: <DashboardLayout/>,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddSubject/>,
            action: addSubjectAction
          },
          {
            path: "stats",
            element: <Stats/>,
            loader: statsLoader
          },
          {
            path: "all-subjects",
            element: <AllSubjects/>,
            loader: allSubjectsLoader
          },
          {
            path: "profile",
            element: <Profile/>,
            action: profileAction
          },
          {
            path: "admin",
            element: <Admin/>,
            loader: adminLoader
          },
          {
            path: "edit-subject/:id",
            element: <EditSubject/>,
            loader: editSubjectLoader,
            action: editSubjectAction
          },
          {
            path: "delete-subject/:id",
            action: deleteSubjectAction
          }
        ]
      }
    ]
  }
]);

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
