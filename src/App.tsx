import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AboutPage from "pages/about/AboutPage";
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
  ],
  { basename: "/aukus-demo" },
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a6d4fa",
    },
    text: {
      primary: "#fff",
      secondary: "#a6d4fa",
    },
    background: {
      default: "#242424",
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
