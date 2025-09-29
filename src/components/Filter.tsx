import { Settings, Calendar, MapPin, Play, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterProps {
  formData: any;
  loading: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export const Filter = ({
  formData,
  loading,
  handleInputChange,
  handleSubmit,
  resetForm,
}: FilterProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex items-center mb-6">
        <Settings className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-800">API Parameters</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mapa</label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleciona o mapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PML">Preço médio por Lota</SelectItem>
                <SelectItem value="PMR">Preço médio nos Açores</SelectItem>
                <SelectItem value="DPL">Descargas por Lota</SelectItem>
                <SelectItem value="DPI">Descargas por Ilha</SelectItem>
                <SelectItem value="DNA">Descargas nos Açores</SelectItem>
                <SelectItem value="PPV">Pescado para venda</SelectItem>
                <SelectItem value="PCA">Pescado Comercializado nos Açores</SelectItem>
                <SelectItem value="PCI">Pescado Comercializado por Ilha</SelectItem>
                <SelectItem value="PCL">Pescado Comercializado por Lota</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lota ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Lota</label>
            <Select
              value={formData.lota_id}
              onValueChange={(value) => handleInputChange("lota_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleciona a Lota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="34">Ponta Delgada</SelectItem>
                <SelectItem value="PCL">Pescado Comercializado por Lota</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* FAO */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Especie</label>
            <Input
              value={formData.fao}
              onChange={(e) => handleInputChange("fao", e.target.value)}
              placeholder="e.g., all, 1, 2..."
            />
          </div>

          {/* Island */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Ilha
            </label>
            <Select
              value={formData.ilha_id}
              onValueChange={(value) => handleInputChange("ilha_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select island" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">São Jorge</SelectItem>
                <SelectItem value="1">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Start Date
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleInputChange("start_date", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Final Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Final Date
            </label>
            <input
              type="date"
              value={formData.final_date}
              onChange={(e) => handleInputChange("final_date", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Optional Day Date */}
          <div className="max-w-md">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Day Date (Optional)</label>
            <input
              type="date"
              value={formData.day_date}
              onChange={(e) => handleInputChange("day_date", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty if not needed</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Fetch Data
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};



interface CurrentParametersProps {
  formData: any;
  onEdit: () => void;
}

export const CurrentParameters = ({ formData, onEdit }: CurrentParametersProps) => (
  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-blue-800">Current Parameters</h3>
      <button
        onClick={onEdit}
        className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        <Settings className="w-4 h-4 mr-1" />
        Edit Parameters
      </button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      {Object.entries({
        Type: formData.type,
        Island: formData.ilha_id,
        Start: formData.start_date,
        End: formData.final_date,
      }).map(([label, value]) => (
        <div key={label}>
          <span className="font-medium text-blue-700">{label}:</span>
          <p className="text-blue-600">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

