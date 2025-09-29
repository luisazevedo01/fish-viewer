import { Loader2 } from "lucide-react";

export const Loader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
      <p className="text-lg text-gray-600">Fetching data from Lotacor API...</p>
    </div>
  </div>
);
