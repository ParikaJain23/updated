import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import ClippedDrawer from "./layout";
import UserTable from "./pages/UserTable";
import CreateIamRole from "./pages/CreateIamRole";
import CustomerManaged from "./pages/CustomerManaged";
import Cost from "./pages/Cost";
import AddUserForm from "./pages/AddUserForm";
import EditUserForm from "./pages/EditUserForm";
import CostExplorer from "./pages/CostExplorer";
import AwsDashboard from "./pages/AwsServicesDashboard";
import NotFound from "./components/auth/NotFound";
import Unauthorized from "./components/auth/NotAuthorized";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/not-authorized" element={<Unauthorized />} />

        {/* Protected Area */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ClippedDrawer />}>
            
            {/* AWS Dashboard */}
            <Route path="/aws-dashboard" element={<ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER", "READ_ONLY"]} />}>
              <Route index element={<AwsDashboard />} />
            </Route>

            {/* User Management */}
            <Route path="/user-management" element={<ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]} />}>
              <Route index element={<UserTable />} />
              <Route path="add-user" element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route index element={<AddUserForm />} />
              </Route>
              <Route path="edit-user/:id" element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route index element={<EditUserForm />} />
              </Route>
            </Route>

            {/* Cost Explorer */}
            <Route path="/cost-explorer" element={<ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER", "READ_ONLY"]} />}>
              <Route index element={<CostExplorer />} />
            </Route>

            {/* Onboarding */}
            <Route path="/onboarding" element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route index element={<CreateIamRole />} />
              <Route path="customer-managed" element={<CustomerManaged />} />
              <Route path="cost" element={<Cost />} />
            </Route>

          </Route>
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;




