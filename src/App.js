import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClippedDrawer from './layout';
import { UserTable } from './pages/UserTable';
import Login from './pages/Login';
import CreateIamRole from './pages/CreateIamRole';
import CustomerManaged from './pages/CustomerManaged';
import Cost from './pages/Cost';
import AddUserForm from './pages/AddUserForm';
import EditUserForm from './pages/EditUserForm';
import { ToastContainer } from 'react-toastify';
import CostExplorer from './pages/CostExplorer';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import AwsDashboard from './pages/AwsServicesDashboard';

function App() {
  const userRole = localStorage.getItem('role');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const hasAccess = (allowedRoles) => {
    return allowedRoles.includes(userRole);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/" 
          element={isAuthenticated ? <ClippedDrawer /> : <Navigate to="/login" replace/>}
        >
          <Route
            path="user-management"
            element={hasAccess(['ADMIN', 'READ_ONLY']) ? <UserTable /> : <Navigate to="/not-authorized" />}
          />
          <Route
            path="user-management/add-user"
            element={hasAccess(['ADMIN']) ? <AddUserForm /> : <Navigate to="/not-authorized" />}
          />
          <Route
            path="user-management/edit-user/:id"
            element={hasAccess(['ADMIN']) ? <EditUserForm /> : <Navigate to="/not-authorized" />}
          />
          <Route
            path="onboarding"
            element={hasAccess(['ADMIN']) ? <CreateIamRole /> : <Navigate to="/not-authorized" />}
          />
          <Route
            path="aws-dashboard"
            element={hasAccess(['ADMIN', 'CUSTOMER']) ? <AwsDashboard /> : <Navigate to="/not-authorized" />}
          />
          <Route
            path="cost-explorer"
            element={hasAccess(['ADMIN', 'CUSTOMER']) ? <CostExplorer /> : <Navigate to="/not-authorized" />}
          />
          <Route
            path="add-policy"
            element={hasAccess(['ADMIN', 'CUSTOMER', 'READ_ONLY']) ? <CustomerManaged /> : <Navigate to="/not-authorized" />}
          />
          <Route
            path="next"
            element={hasAccess(['ADMIN', 'CUSTOMER', 'READ_ONLY']) ? <Cost /> : <Navigate to="/not-authorized" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;