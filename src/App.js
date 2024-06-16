//import navbar to be displayed on all pages
import Navbar from "./components/Navbar/Navbar";

//import browser router, route, and routes to set up  website's router with specific routes
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

//import SignUp for route declaration
import SignUp from "./pages/SignUp/SignUp";

//import LogIn for route declaration
import LogIn from "./pages/LogIn/LogIn";

//import Post for route declaration
import Post from "./pages/Post/Post";

//import NewPost functionality for home page
import NewPost from "./components/NewPost/NewPost";

//import Posts and Footer for home page
import Posts from "./components/Posts/Posts";
import Footer from "./components/Footer/Footer";


function App() {

  return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/post/:id" element={<Post/>} />
            {/*route for home page: places new post functionality at top, all user posts below, then footer at the bottom*/}
            <Route
              path="/"
              element={
                <div>
                  <div className="top-container">
                    <NewPost />
                  </div>
                  <div>
                    <Posts />
                  </div>
                  <div>
                    <Footer />
                  </div>
                </div>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
