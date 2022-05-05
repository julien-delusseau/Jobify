import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAppContext } from "./context/appContext";
import { Landing, Register, Error, ProtectedRoute } from "./pages";
import {
  SharedLayout,
  AddJob,
  AllJobs,
  Profile,
  Stats,
} from "./pages/dashboard";

function App() {
  const { showAlert, alertText, alertType } = useAppContext();

  if (showAlert) {
    toast[alertType](alertText);
  }

  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
