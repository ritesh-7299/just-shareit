import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const Chat = React.lazy(() => import("../chat/Chat.js"));
const Home = React.lazy(() => import("../pages/Home.js"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));
const Login = React.lazy(() => import("../pages/Login"));
const CounterRedux = React.lazy(() => import("../pages/CounterRedux"));

function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/chat" Component={Chat} />
          <Route path="/login" Component={Login} />
          <Route path="/redux" Component={CounterRedux} />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Index;
