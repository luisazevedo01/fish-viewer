import { Fish } from "lucide-react";

export const Header = () => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center mb-4">
      <Fish className="w-12 h-12 text-blue-600 mr-3" />
      <h1 className="text-4xl font-bold text-gray-800">Lotacor API Explorer</h1>
    </div>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Dynamically fetch fishery data from Lotacor API for the Azores region
    </p>
  </div>
);
