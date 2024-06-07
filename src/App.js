import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./components/Login";
import AdminBoardForm from "./components/AdminBoardForm";
import SalonSearch from "./components/SalonSearch";
import SalonSearch1 from "./components/SalonSearch1";
import OnBoardForm from "./components/OnBoardForm";
import MoreActions from "./components/MoreActions";
import SeventhComp from "./components/SeventhComp";
// import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import "./App.css";
import ManageShop from "./components/ManageShop";
import ProtectedRoute from "./components/ProtectedRoute";

export const Store = createContext();

const App = () => {
  const [isAuth, setisAuth] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Store.Provider value={[isAuth, setisAuth]}>
          {/* <div className="main-header">
            <img src="/assets/Logo 1.jpg" className="img-ele" alt="Logo" />
            <Header />
          </div> */}
          <NavBar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/admin-form"
              element={
                <ProtectedRoute>
                  <AdminBoardForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/salon-search"
              element={
                <ProtectedRoute>
                  <SalonSearch />
                </ProtectedRoute>
              }
            />
            <Route path="/salon-search/:salonCode" element={<SalonSearch1 />} />
            <Route
              path="/salon-search-on-board-form"
              element={
                <ProtectedRoute>
                  <OnBoardForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-shop"
              element={
                <ProtectedRoute>
                  <ManageShop />
                </ProtectedRoute>
              }
            />

            <Route
              path="/more-actions"
              element={
                <ProtectedRoute>
                  <MoreActions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-items"
              element={
                <ProtectedRoute>
                  <SeventhComp />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Store.Provider>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </>
  );
};

export default App;
