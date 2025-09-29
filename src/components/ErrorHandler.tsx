import { AlertCircle } from "lucide-react";

interface ErrorHandlerProps {
  error: string;
  onRetry: () => void;
  onEdit: () => void;
}

export const ErrorHandler = ({ error, onRetry, onEdit }: ErrorHandlerProps) => (
  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
    <div className="flex items-center mb-3">
      <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
      <h3 className="text-lg font-semibold text-red-800">Error Fetching Data</h3>
    </div>
    <p className="text-red-700 mb-4">{error}</p>
    <div className="flex gap-3">
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Edit Parameters
      </button>
    </div>
    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-sm text-yellow-800">
        <strong>Note:</strong> This error might be due to CORS restrictions.
      </p>
    </div>
  </div>
);
