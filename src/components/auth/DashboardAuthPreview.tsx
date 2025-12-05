import React from "react";

const DashboardAuthPreview: React.FC = () => {
  return (
    <div
      className="
        relative  
        w-[780px] 
        h-screen 
        opacity-100
        rounded-[20px] 
        top-[10] 
        left-[160px]
        bg-gradient-to-br from-blue-50 to-sky-100
      "
    >
      <div
        className="
          absolute inset-4
          rounded-[20px]
          bg-white 
          shadow-xl 
          shadow-slate-300/40 
          overflow-hidden 
          flex items-center justify-center
        "
      >
        <img
          src="/images/Login.png"
          alt="Sync Mobile preview"
          className="h-full w-full object-top "
        />
      </div>
    </div>
  );
};

export default DashboardAuthPreview;
