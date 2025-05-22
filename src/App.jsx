// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from "./pages/landing/LandingPage";
import Auth from "./pages/auth/Auth";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { observeAuthThunk } from "./features/auth/authThunks";
import PrivateRoute from "./components/route/PrivateRoute";
import PublicRoute from "./components/route/PublicRoute";
import Loading from "./components/Loading";
import NotFound from "./pages/notFound/NotFound";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(observeAuthThunk());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
