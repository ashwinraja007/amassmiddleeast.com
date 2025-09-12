
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminStatus = localStorage.getItem("isAdminLoggedIn");
    if (adminStatus === "true") {
      // Redirect directly to blog editor
      navigate('/blog-editor', { replace: true });
    } else {
      // Redirect to login if not authenticated
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);

  // This component will redirect, so we don't need to render anything
  return null;
};

export default AdminDashboard;
