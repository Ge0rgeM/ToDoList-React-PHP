import ToDoList from "./Pages/ToDoList"
import LoginRegister from "./Pages/LoginRegister"
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/ToDoList-React-PHP" element={<LoginRegister />} />
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
        // <>
        //     <LoginRegister />
        //     <Header />
        //     <Container />
        // </>
    );
}

export default App
