import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ListTodo from "./pages/Todos/List";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./pages/Todos/Create";
function App() {
  return (
    <div className="App">
      <div className="App">
        <Header />
        <Routes>
          <Route path="/todos" element={<ListTodo />} />
          <Route path="/todo/create" element={<CreateTodo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
