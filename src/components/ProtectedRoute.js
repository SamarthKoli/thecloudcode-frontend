import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';

const ProtectedRoute = ({ children }) => {
    const { isAdmin } = useAuth();
    
    if (!isAdmin) {
        return <LoginPage />;
    }
    
    return children;
};

export default ProtectedRoute;
