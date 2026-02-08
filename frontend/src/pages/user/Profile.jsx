import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-center mt-10">Please login to view profile</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <p className="text-lg">{user.name || 'N/A'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-lg">{user.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              user.role === 'ADMIN' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
