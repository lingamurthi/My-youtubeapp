import { Provider } from "react-redux";
import Body from "./Components/Body";
import Head from "./Components/Head";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./Components/MainContainer";
import WatchPage from "./Components/WatchPage";
import Searchquery from "./Components/Searchquery";

const appRouter = createBrowserRouter([
  {
 

      path: "/",
      element: <><Head/><Body/></>,
  
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/results",
        element: <Searchquery />,
      },
    ],

  },
]);



function App() {
  return (
    <Provider store={store}>
      <div className="">
      
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
