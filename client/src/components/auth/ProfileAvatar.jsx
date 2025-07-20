import React from "react";

const ProfileAvatar = ({ user, size = 40 }) => {
  const avatarSize = `${size}px`;

  // Get image URL if available (e.g., from Google OAuth or user profile)
  const imageUrl = user?.image;

  // Fallback: use the first letter from name or email
  const fallbackLetter =
    user?.name?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "?";

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt="User avatar"
        className="rounded-full object-cover"
        style={{ width: avatarSize, height: avatarSize }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-teal-600 text-white flex items-center justify-center font-bold"
      style={{
        width: avatarSize,
        height: avatarSize,
        fontSize: size * 0.5,
      }}
    >
      {fallbackLetter}
    </div>
  );
};

export default ProfileAvatar;
