import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle, Fish } from 'lucide-react';
import axios from 'axios';

interface ApiResponse {
  success?: boolean;
  data?: any[];
  message?: string;
  [key: string]: any;
}

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLotacorData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare form data for axios
      const formData = {
        type: 'DPI',
        lota_id: 'all',
        fao: 'all',
        ilha_id: '7',
        start_date: '2025-09-16',
        final_date: '2025-09-20',
        day_date: ''
      };

      const response = await axios.post('/api/testQuery', formData, {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      setData(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotacorData();
  }, []);

  const renderChart = () => {
    if (!data || !Array.isArray(data.data)) return null;

    // Try to create a simple chart from the data
    const chartData = data.data.slice(0, 20).map((item, index) => ({
      index: index + 1,
      value: typeof item === 'object' && item !== null ? Object.keys(item).length : 1,
      ...item
    }));

    return (
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Visualization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Fish className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Lotacor API Explorer</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fetching fishery data from Lotacor API for the Azores region
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Island ID: 7 | Date Range: 2025-09-16 to 2025-09-20
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600">Fetching data from Lotacor API...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-3">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-red-800">Error Fetching Data</h3>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={fetchLotacorData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This error might be due to CORS restrictions. 
                The API might need to be accessed from the same domain or with proper CORS headers.
              </p>
            </div>
          </div>
        )}

        {/* Success State - Raw Data Display */}
        {data && !loading && !error && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">API Response</h2>
                <button 
                  onClick={fetchLotacorData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Refresh Data
                </button>
              </div>
              
              {/* Response Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                  <h4 className="font-semibold text-sm opacity-90">Status</h4>
                  <p className="text-xl font-bold">
                    {data.success !== false ? 'Success' : 'Failed'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                  <h4 className="font-semibold text-sm opacity-90">Data Points</h4>
                  <p className="text-xl font-bold">
                    {Array.isArray(data.data) ? data.data.length : 'N/A'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                  <h4 className="font-semibold text-sm opacity-90">Response Size</h4>
                  <p className="text-xl font-bold">
                    {new Blob([JSON.stringify(data)]).size} bytes
                  </p>
                </div>
              </div>

              {/* Raw JSON Response */}
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Raw JSON Response:</h3>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap break-words">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>

            {/* Chart Visualization */}
            {renderChart()}

            {/* Request Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Request Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-gray-700">Endpoint:</strong>
                  <p className="text-blue-600 break-all">https://lotacor.pt/api/testQuery</p>
                </div>
                <div>
                  <strong className="text-gray-700">Method:</strong>
                  <p className="text-gray-600">POST</p>
                </div>
                <div>
                  <strong className="text-gray-700">Content-Type:</strong>
                  <p className="text-gray-600">application/x-www-form-urlencoded</p>
                </div>
                <div>
                  <strong className="text-gray-700">Parameters:</strong>
                  <p className="text-gray-600">type=DPI, lota_id=all, fao=all, ilha_id=7</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;