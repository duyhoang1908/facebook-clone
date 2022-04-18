import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "./firebase/config";
import "./App.css";
import HomePage from "./components/Home/HomePage";
import "./fontawesome-free-6.0.0-web/css/all.css";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ScrollToTop from "./utils/ScrollToTop";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const history = useNavigate();
  const [uid, setUid] = useState("")
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        history("/home/post")
      } else {
        history("/login")
      }
    });
      return unsubscribe
  }, []);

  return (
    <Fragment>
      <ScrollToTop>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home props={uid}/>}>
            <Route path="post" element={<HomePage />} />
            <Route path="messages" element={<Chat />} />
            <Route path="auth/:id" element={<Auth />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </Fragment>
  );
}

export default App;
