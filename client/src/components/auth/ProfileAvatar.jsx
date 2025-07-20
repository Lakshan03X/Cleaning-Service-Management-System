import React from "react";

const ProfileAvatar = ({ user, size = 40 }) => {
  const avatarSize = `${size}px`;
  const letter = user?.email?.[0]?.toUpperCase() || "?";

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt="User avatar"
        className="rounded-full object-cover"
        style={{ width: avatarSize, height: avatarSize }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-teal-600 text-white flex items-center justify-center font-bold"
      style={{ width: avatarSize, height: avatarSize, fontSize: size * 0.5 }}
    >
      {letter}
    </div>
  );
};

export default ProfileAvatar;
