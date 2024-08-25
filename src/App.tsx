import AboutPage from "pages/about/AboutPage";
import PlanPage from "pages/plan/PlanPage";
import RulesPage from "pages/rules/RulesPage";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainScreen from "./components/MainScreen";
import MapPage from "./pages/map/MapPage";
import PlayerPage from "./pages/player/PlayerPage";
import PlayersPage from "./pages/players/PlayersPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <MainScreen>
          <MapPage />
        </MainScreen>
      ),
    },
    {
      path: "/players",
      element: (
        <MainScreen>
          <PlayersPage />
        </MainScreen>
      ),
    },
    {
      path: "/players/:id",
      element: (
        <MainScreen>
          <PlayerPage />
        </MainScreen>
      ),
    },
    {
      path: "/rules",
      element: (
        <MainScreen>
          <RulesPage />
        </MainScreen>
      ),
    },
    {
      path: "/about",
      element: (
        <MainScreen>
          <AboutPage />
        </MainScreen>
      ),
    },
    {
      path: "/plan",
      element: (
        <MainScreen>
          <PlanPage />
        </MainScreen>
      ),
    },
  ],
  { basename: "/aukus-demo" },
);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
