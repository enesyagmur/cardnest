// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import AuthPage from "./pages/auth/AuthPage";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { observeAuthThunk } from "./features/auth/authThunks";
import PrivateRoute from "./components/route/PrivateRoute";
import PublicRoute from "./components/route/PublicRoute";
import Loading from "./components/Loading";
import NotFound from "./pages/notFound/NotFound";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import CollectionsPage from "./pages/collections/CollectionsPage";
import CardsPage from "./pages/cards/CardsPage";
import PracticePage from "./pages/practice/PracticePage";
import ExplorePage from "./pages/explore/ExplorePage";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(observeAuthThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Toaster position="top-right" />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
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
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Route>

          <Route
            path="/auth"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
