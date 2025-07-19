import React from "react";
import loadingAnimation from "./assets/loading.mp4"; 

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <video
        className="w-42 h-42 sm:w-58 sm:h-58 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96"
        src={loadingAnimation}
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default LoadingSpinner;
