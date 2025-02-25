import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomeBanner from "./pages/HomeBanner/HomeBanner";
import Portfolio from "./pages/Portfolio/Portfolio";
import Teams from "./pages/Teams/Teams";
import ContactMessage from "./pages/ContactMessage/ContactMessage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* Protected Routes */}
          {user?.user ? (
            <>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home-banner" element={<HomeBanner />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/messages" element={<ContactMessage />} />
              </Route>
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontFamily: "Sora, serif",
              fontSize: "18px",
              fontWeight: "600",
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
