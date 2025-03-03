import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

import HomeBanner from "./pages/HomeBanner/HomeBanner";
import Portfolio from "./pages/Portfolio/Portfolio";
import Teams from "./pages/Teams/Teams";
import ContactMessage from "./pages/ContactMessage/ContactMessage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Single
import SingleHomeBanner from "./pages/SingleDetail/SingleHomeBanner/SingleHomeBanner";
import SinglePortfolio from "./pages/SingleDetail/SinglePortfolio/SinglePortfolio";
import SingleTeams from "./pages/SingleDetail/SingleTeams/SingleTeams";
import SingleContact from "./pages/SingleDetail/SingleContact/SingleContact";

// Update
import UpdateSingleHomeBanner from "./pages/UpdateDetails/UpdateSingleHomeBanner/UpdateSingleHomeBanner";
import UpdateSinglePorfolio from "./pages/UpdateDetails/UpdateSinglePortfolio/UpdateSinglePortfolio";
import UpdateSingleTeams from "./pages/UpdateDetails/UpdateSingleTeams/UpdateSingleTeams";

// New
import NewHomeBanner from "./pages/NewDetails/NewHomeBanner/NewHomeBanner";
import NewPortfolio from "./pages/NewDetails/NewPortfolio/NewPortfolio";
import NewTeam from "./pages/NewDetails/NewTeam/NewTeam";

import { Toaster } from "react-hot-toast";
import Contact2Message from "./pages/Contact2Message/Contact2Message";
import SingleContact2 from "./pages/SingleDetail/SingleContact2/SingleContact2";
import { Context } from "./context/Context";
import { useContext } from "react";
import Profile from "./pages/Profile/Profile";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import PhotoAlbum from "./pages/PhotoAlbum/PhotoAlbum";
import SinglePhotoAlbum from "./pages/SingleDetail/SinglePhotoAlbum/SinglePhotoAlbum";
import UpdatePhotoAlbum from "./pages/UpdateDetails/UpdatePhotoAlbum/UpdatePhotoAlbum";
import NewPhotoAlbum from "./pages/NewDetails/NewPhotoAlbum/NewPhotoAlbum";


import Service1 from "./pages/Services/Service1/Service1";
import Service2 from "./pages/Services/Service2/Service2";
import Service3 from "./pages/Services/Service3/Service3";
import Service4 from "./pages/Services/Service4/Service4";
import Service5 from "./pages/Services/Service5/Service5";
import Service6 from "./pages/Services/Service6/Service6";
import Service7 from "./pages/Services/Service7/Service7";
import Service8 from "./pages/Services/Service8/Service8";
import Service9 from "./pages/Services/Service9/Service9";

function App() {
  const { user } = useContext(Context);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Register />}
          />

          {/* Protected Routes */}
          <Route element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home-banner" element={<HomeBanner />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/messages" element={<ContactMessage />} />
            <Route path="/contact-2-messages" element={<Contact2Message />} />
            <Route path="/photo-album" element={<PhotoAlbum />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/update-password" element={<UpdatePassword />} />

            <Route path="/home-banner/:id" element={<SingleHomeBanner />} />
            <Route
              path="/update-home-banner/:id"
              element={<UpdateSingleHomeBanner />}
            />
            <Route path="/new-home-banner" element={<NewHomeBanner />} />

            <Route path="/portfolio/:id" element={<SinglePortfolio />} />
            <Route
              path="/update-portfolio/:id"
              element={<UpdateSinglePorfolio />}
            />
            <Route path="/new-portfolio" element={<NewPortfolio />} />

            <Route path="/team/:id" element={<SingleTeams />} />
            <Route
              path="/update-team-member/:id"
              element={<UpdateSingleTeams />}
            />
            <Route path="/new-team-member" element={<NewTeam />} />

            <Route path="/contact/:id" element={<SingleContact />} />

            <Route path="/contact-2/:id" element={<SingleContact2 />} />

            <Route path="/contact-2/:id" element={<SingleContact2 />} />

            <Route path="/photoAlbum/:id" element={<SinglePhotoAlbum />} />
            <Route
              path="/update-photo-album/:id"
              element={<UpdatePhotoAlbum />}
            />
            <Route path="/new-photo-album" element={<NewPhotoAlbum />} />

            {/* Services */}
            <Route path="/wedding-photography/:id" element={<Service1 />} />
            <Route path="/wedding-cinematography/:id" element={<Service2 />} />
            <Route path="/pre-wedding-films/:id" element={<Service3 />} />
            <Route path="/pre-wedding-photography/:id" element={<Service4 />} />
            <Route path="/civil-marriage-photography/:id" element={<Service5 />} />
            <Route
              path="/engagement-photography-couple-portraits/:id"
              element={<Service6 />}
            />

            <Route path="/birthday-photography/:id" element={<Service7 />} />

            <Route path="/baby-shower-photography/:id" element={<Service8 />} />

            <Route path="/graduation-photography/:id" element={<Service9 />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
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
