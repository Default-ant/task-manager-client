import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { Toaster } from "sonner";
import { Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { Navbar, Sidebar } from "./components";
import {
  Dashboard,
  Login,
  TaskDetail,
  Tasks,
  Trash,
  Users,
  StatusPage,
} from "./pages";
import { setOpenSidebar } from "./redux/slices/authSlice";

const App = () => {
  const theme = "light";
  const { user, isSidebarOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  // Wait for Redux to hydrate
  if (user === undefined) return null;
  console.log("User state:", user);

  // Redirect if user is not authenticated
  const ProtectedLayout = () => {
    if (!user || !user.name || !user.email) {
      return <Navigate to="/log-in" state={{ from: location }} replace />;
    }

    return (
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="w-1/5 h-screen bg-white dark:bg-[#1f1f1f] sticky top-0 hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Transition
          show={isSidebarOpen}
          as="div"
          enter="transition-opacity duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={`md:hidden w-full h-full bg-black/40 transition-transform duration-700 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={() => dispatch(setOpenSidebar(false))}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 pt-5">
                <button
                  onClick={() => dispatch(setOpenSidebar(false))}
                  className="flex justify-end items-end"
                >
                  <IoMdClose size={25} />
                </button>
              </div>
              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        </Transition>

        <div className="flex-1 overflow-y-auto">
          <Navbar />
          <div className="p-4 2xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className={theme}>
      <div className="w-full min-h-screen bg-[#f3f4f6] dark:bg-[#0d0d0df4]">
        <Routes>
          {/* Public route */}
          <Route path="/log-in" element={<Login />} />

          {/* Protected layout and routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={<div>Test route works!</div>} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/completed/:status?" element={<Tasks />} />
            <Route path="/in-progress/:status?" element={<Tasks />} />
            <Route path="/todo/:status?" element={<Tasks />} />
            <Route path="/trashed" element={<Trash />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/team" element={<Users />} />
            <Route path="/status" element={<StatusPage />} />
          </Route>
        </Routes>
      </div>

      <Toaster richColors position="top-center" />
    </main>
  );
};

export default App;