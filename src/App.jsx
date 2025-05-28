import ToDoList from "./Pages/ToDoList"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter basename="/ToDoList-React-PHP/">
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} /> /* Redirect root to login, Because basename is converted "/" after build*/
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/todolist"
                    element={
                        <ProtectedRoute> /* This prevents directly going to /ToDoList-React-PHP/todolist unless the user is logged in*/
                            <ToDoList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App
