import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

import HomeBanner from "./pages/HomeBanner/HomeBanner";
import Portfolio from "./pages/Portfolio/Portfolio";
import Teams from "./pages/Teams/Teams";
import ContactMessage from "./pages/ContactMessage/ContactMessage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

//Single
import SingleHomeBanner from "./pages/SingleDetail/SingleHomeBanner/SingleHomeBanner";
import SinglePortfolio from "./pages/SingleDetail/SinglePortfolio/SinglePortfolio";
import SingleTeams from "./pages/SingleDetail/SingleTeams/SingleTeams";
import SingleContact from "./pages/SingleDetail/SingleContact/SingleContact";

// update
import UpdateSingleHomeBanner from "./pages/UpdateDetails/UpdateSingleHomeBanner/UpdateSingleHomeBanner";
import UpdateSinglePorfolio from "./pages/UpdateDetails/UpdateSinglePortfolio/UpdateSinglePortfolio";
import UpdateSingleTeams from "./pages/UpdateDetails/UpdateSingleTeams/UpdateSingleTeams";

//new
import NewHomeBanner from "./pages/NewDetails/NewHomeBanner/NewHomeBanner";
import NewPortfolio from "./pages/NewDetails/NewPortfolio/NewPortfolio";
import NewTeam from "./pages/NewDetails/NewTeam/NewTeam";

import { Toaster } from "react-hot-toast";
import Contact2Message from "./pages/Contact2Message/Contact2Message";
import SingleContact2 from "./pages/SingleDetail/SingleContact2/SingleContact2";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Login Page - Without Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* Wrap Layout Around These Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home-banner" element={<HomeBanner />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/messages" element={<ContactMessage />} />

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

            <Route path="/contact-2-messages" element={<Contact2Message />} />

            <Route path="/contact-2/:id" element={<SingleContact2 />} />


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
