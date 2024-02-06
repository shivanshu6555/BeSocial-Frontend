import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)));
  const isAuth = useSelector((state) => state.token);
  console.log("serverURL",process.env.REACT_APP_SERVER_URL);
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/home' element={isAuth ? <Homepage/> : <Navigate to="/" />} />
          <Route exact path='/profile/:userId' element={isAuth ? <ProfilePage/> : <Navigate to="/" />} />
        </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
