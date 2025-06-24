import "./App.css";
import Notification from "./components/directory/Notification.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
// import OkBadgeDate from './components/OkBadgeDate.jsx';

export default function App() {
  const Directory = lazy(() => import("./components/Directory"));

  return (
    <>
      <BrowserRouter>
        <div className="container mt-2">
          <div className="">
            <main className="MainSidebar">
              <Suspense fallback={"sdfsdf"}>
                <Routes>
                  <Route path="/directory" element={<Directory />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </BrowserRouter>

      <a href="/directory">Справочники</a>
      <Notification />
    </>
  );
}
