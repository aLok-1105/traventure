import React from 'react'

export default function Signout() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // Check if the user is authenticated by checking for the presence of the token
        const checkAuthStatus = async () => {
          try {
            const response = await axios.get('http://localhost:8000/user/check-auth', { withCredentials: true });
            setIsAuthenticated(response.data.isAuthenticated);
          } catch (error) {
            console.error('Error checking auth status:', error);
            setIsAuthenticated(false);
          }
        };
    
        checkAuthStatus();
      }, []);

  return (
    <div></div>
  )
}
