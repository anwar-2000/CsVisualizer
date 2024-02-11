import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayout from './layouts/RootLayout';
import LandingPage from './pages/LandingPage';
import Visualize from './pages/Visualize';


function App() {
  const routes = createBrowserRouter([
    {path : "" , element : <RootLayout /> , children : [
        {index : true , element : <LandingPage />},
        {path : "files" , element : <h4>My Files</h4>},
        {path : "visualize",element: <Visualize />}
      ]}
  ])
  return <RouterProvider router={routes} />
}

export default App;
