import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from './Components/LoginPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={AppRouter}/>
)
