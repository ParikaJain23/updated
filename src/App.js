import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClippedDrawer from './layout';
import { UserTable } from './pages/UserTable';
import Login from './pages/Login';
import CreateIamRole from './pages/CreateIamRole';
import CustomerManaged from './pages/CustomerManaged';
import Cost from './pages/Cost';
import AddUserForm from './pages/AddUserForm';
import EditUserForm from './pages/EditUserForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ClippedDrawer />}>
                    <Route path="user-management" element={<UserTable />} />
                    <Route path="user-management/add-user" element={<AddUserForm />} />
                    <Route path="user-management/edit-user/:id" element={<EditUserForm />} />
                    <Route path="onboarding" element={<CreateIamRole />} />
                    <Route path="add-policy" element={<CustomerManaged />} />
                    <Route path="next" element={<Cost />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
