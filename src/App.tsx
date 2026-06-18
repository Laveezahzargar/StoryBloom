import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GenerateBlog from "./pages/GenerateBlog";
import ViewBlog from "./pages/ViewBlog";
import ProtectedRoute from "./components/protectedRoute";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/generate"
                    element={
                        <ProtectedRoute>
                            <GenerateBlog />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/blog/:id"
                    element={
                        <ProtectedRoute>
                            <ViewBlog />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;