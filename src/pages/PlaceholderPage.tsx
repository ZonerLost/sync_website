// src/pages/PlaceholderPage.tsx
import React from "react";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6">
      <h1 className="mb-2 text-xl font-semibold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500">
        This is the <span className="font-medium">{title}</span> page. Put your
        actual content here.
      </p>
    </div>
  );
};

export default PlaceholderPage;
