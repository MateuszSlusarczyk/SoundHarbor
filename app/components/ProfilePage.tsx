/*import { useEffect, useState } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the API route
    async function fetchProfile() {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      setUser(data.user);
    }

    fetchProfile();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <img src={user.image} alt="Profile Image" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
*/