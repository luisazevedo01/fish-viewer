import { useState } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { ApiResponse } from "./components/ApiResponse";
import { CurrentParameters, Filter } from "./components/Filter";
import { Loader } from "./components/Loader";
import { ErrorHandler } from "./components/ErrorHandler";

function App() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    type: "DPI",
    lota_id: "all",
    fao: "all",
    ilha_id: "7",
    start_date: "2025-01-16",
    final_date: "2025-01-20",
    day_date: "",
  });

  const fetchLotacorData = async (customData?: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/api/testQuery", customData || formData, {
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      console.log(response);
      setData(response.data);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLotacorData();
  };

  const resetForm = () => {
    setFormData({
      type: "DPI",
      lota_id: "all",
      fao: "all",
      ilha_id: "7",
      start_date: "2025-01-16",
      final_date: "2025-01-20",
      day_date: "",
    });
    console.log("reset form");
    setData(null);
    setError(null);
    setShowForm(true);
  };
  console.log(data, !loading, !error);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <Header />

        {showForm && (
          <Filter
            formData={formData}
            loading={loading}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
          />
        )}

        {!showForm && !loading && !error && data && (
          <CurrentParameters
            formData={formData}
            onEdit={() => setShowForm(true)}
          />
        )}

        {loading && <Loader />}

        {error && (
          <ErrorHandler
            error={error}
            onRetry={() => fetchLotacorData()}
            onEdit={() => setShowForm(true)}
          />
        )}

        {data && !loading && !error && (
          <ApiResponse
            data={data}
            formData={formData}
            fetchData={() => fetchLotacorData()}
            resetForm={resetForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
