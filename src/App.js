import "./App.css";
import { RegForm } from "./components/RegForm";
import { Admin } from "./components/Admin";
import { Route, Routes } from "react-router-dom";
import { SwitchingForms } from "./components/forms/SwitchingForms";
import { FormikForm } from "./components/formik/FormikForm";
import { NewFormik } from "./components/formik/NewFormik";
import { FormikContainer } from "./components/reusable formik/FormikContainer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forms" element={<SwitchingForms />} />
        <Route path="/formik" element={<FormikForm />} />
        <Route path="/newformik" element={<NewFormik />} />
        <Route path="/register" element={<FormikContainer />} />
      </Routes>
    </div>
  );
}

export default App;
