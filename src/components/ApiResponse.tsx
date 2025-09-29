interface ApiResponseProps {
  data: any;
  formData: any;
  fetchData: () => void;
  resetForm: () => void;
}

export const ApiResponse = ({ data, formData, fetchData, resetForm }: ApiResponseProps) => (
  <div className="space-y-8">
    {/* Summary & Controls */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">API Response</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Refresh Data
          </button>
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            New Query
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <h4 className="font-semibold text-sm opacity-90">Status</h4>
          <p className="text-xl font-bold">{data.success !== false ? "Success" : "Failed"}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <h4 className="font-semibold text-sm opacity-90">Data Points</h4>
          <p className="text-xl font-bold">{Array.isArray(data.data) ? data.data.length : "N/A"}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <h4 className="font-semibold text-sm opacity-90">Response Size</h4>
          <p className="text-xl font-bold">{new Blob([JSON.stringify(data)]).size} bytes</p>
        </div>
      </div>

      {/* Raw JSON */}
      <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Raw JSON Response:</h3>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  </div>
);
