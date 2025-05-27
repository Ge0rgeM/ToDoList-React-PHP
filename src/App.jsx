import ToDoList from "./Pages/ToDoList"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter basename="/ToDoList-React-PHP">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/todolist"
                    element={
                        <ProtectedRoute>
                            <ToDoList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App
