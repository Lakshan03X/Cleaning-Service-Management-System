import React from "react";
import ProfileAvatar from "../../components/auth/ProfileAvatar";

const ProfileModal = ({ user, onClose }) => {
  const displayName = user?.fullName || user?.name || "No name";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full relative">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">User Profile</h2>
        <div className="flex flex-col items-center space-y-4 mb-5">
          <ProfileAvatar user={user} size={64} />
          <p className="text-center text-gray-900 font-medium">{displayName}</p>
          <p className="text-center text-gray-500 text-sm">{user?.email || "No email"}</p>
        </div>

        <button
          onClick={onClose}
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
