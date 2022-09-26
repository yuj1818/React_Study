import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthVideoUploadPage = Auth(VideoUploadPage, true);
  const AuthVideoDetailPage = Auth(VideoDetailPage, null);
  const AuthSubscriptionPage = Auth(SubscriptionPage, true);

  return (
      <Suspense fallback={(<div>Loading...</div>)}>
          <NavBar />
          <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
              <Routes>
                  <Route path="/" element={<AuthLandingPage />} />
                  <Route path="/login" element={<AuthLoginPage />} />
                  <Route path="/register" element={<AuthRegisterPage />} />
                  <Route path="/video/upload" element={<AuthVideoUploadPage />} />
                  <Route path="/video/:videoId" element={<AuthVideoDetailPage />} />
                  <Route path="/subscription" element={<AuthSubscriptionPage />} />
              </Routes>
          </div>
          <Footer />
      </Suspense>
  );
}

export default App;
