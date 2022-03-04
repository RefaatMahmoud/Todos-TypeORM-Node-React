import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ListTodo from "./pages/Todos/List";
import CreateTodo from "./pages/Todos/Create";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/todos" element={<ListTodo />} />
        <Route path="/todo/create" element={<CreateTodo />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick
        pauseOnHover
      />
      <ToastContainer />
    </div>
  );
}

export default App;
