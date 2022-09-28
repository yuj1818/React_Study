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
import FilmAndAnimationPage from "./views/CategoryPage/FilmAndAnimationPage";
import AutosAndVehiclesPage from "./views/CategoryPage/AutosAndVehiclesPage";
import MusicPage from "./views/CategoryPage/MusicPage";
import PetsAndAnimalsPage from "./views/CategoryPage/PetsAndAnimalsPage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthVideoUploadPage = Auth(VideoUploadPage, true);
  const AuthVideoDetailPage = Auth(VideoDetailPage, null);
  const AuthSubscriptionPage = Auth(SubscriptionPage, true);
  const AuthFilmAndAnimationPage = Auth(FilmAndAnimationPage, null);
  const AuthAutosAndVehiclesPage = Auth(AutosAndVehiclesPage, null);
  const AuthMusicPage = Auth(MusicPage, null);
  const AuthPetsAndAnimalsPage = Auth(PetsAndAnimalsPage, null);

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
                  <Route path="/category/film_and_animation" element={<AuthFilmAndAnimationPage />} />
                  <Route path="/category/autos_and_vehicles" element={<AuthAutosAndVehiclesPage />} />
                  <Route path="/category/music" element={<AuthMusicPage />} />
                  <Route path="/category/pets_and_animals" element={<AuthPetsAndAnimalsPage />} />
              </Routes>
          </div>
          <Footer />
      </Suspense>
  );
}

export default App;
