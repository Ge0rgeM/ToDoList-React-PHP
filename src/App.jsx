import ToDoList from "./Pages/ToDoList"
import LoginRegister from "./Pages/LoginRegister"
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter basename="/ToDoList-React-PHP/">
            <Routes>
                <Route path="/" element={<LoginRegister />} />
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
