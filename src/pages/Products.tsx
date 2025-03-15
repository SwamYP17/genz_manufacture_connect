
import { useState } from "react";
import { Lightbulb, Package, ArrowRight, PlusCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { 
  GlassCard, 
  AnimatedContainer, 
  Input, 
  Button, 
  Badge 
} from "@/components/ui-components";

// Material cost estimation data
const materialCosts = {
  "Plastic": { min: 2, max: 10, unit: "kg" },
  "Metal": { min: 5, max: 30, unit: "kg" },
  "Wood": { min: 3, max: 15, unit: "kg" },
  "Fabric": { min: 5, max: 25, unit: "m²" },
  "Electronics": { min: 10, max: 200, unit: "unit" },
  "Glass": { min: 8, max: 40, unit: "m²" },
  "Rubber": { min: 4, max: 20, unit: "kg" },
  "Paper/Cardboard": { min: 1, max: 5, unit: "kg" },
};

interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
}

// Initial product form data
const initialProductData = {
  name: "",
  description: "",
  category: "",
  targetPrice: "",
  materials: [] as Material[],
};

const Products = () => {
  const [productData, setProductData] = useState(initialProductData);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });
  const [profitMargin, setProfitMargin] = useState(30); // Default 30%

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addMaterial = () => {
    if (!selectedMaterial || !materialQuantity || isNaN(Number(materialQuantity)) || Number(materialQuantity) <= 0) {
      return;
    }

    const material = selectedMaterial as keyof typeof materialCosts;
    const cost = materialCosts[material];
    
    // Random cost within the range
    const costPerUnit = Math.floor(Math.random() * (cost.max - cost.min + 1)) + cost.min;

    const newMaterial: Material = {
      id: Date.now().toString(),
      name: selectedMaterial,
      quantity: Number(materialQuantity),
      unit: cost.unit,
      costPerUnit,
    };

    setProductData((prev) => ({
      ...prev,
      materials: [...prev.materials, newMaterial],
    }));

    // Reset inputs
    setSelectedMaterial("");
    setMaterialQuantity("");

    // Recalculate cost estimation
    const updatedMaterials = [...productData.materials, newMaterial];
    calculateCostEstimation(updatedMaterials);
  };

  const removeMaterial = (id: string) => {
    const updatedMaterials = productData.materials.filter((m) => m.id !== id);
    
    setProductData((prev) => ({
      ...prev,
      materials: updatedMaterials,
    }));

    // Recalculate cost estimation
    calculateCostEstimation(updatedMaterials);
  };

  const calculateCostEstimation = (materials: Material[]) => {
    // Calculate materials cost
    const materialsCost = materials.reduce((sum, material) => {
      return sum + material.quantity * material.costPerUnit;
    }, 0);

    // Add manufacturing overhead (20-40% of materials cost)
    const minOverhead = materialsCost * 0.2;
    const maxOverhead = materialsCost * 0.4;

    // Add labor costs (30-50% of materials + overhead)
    const minLabor = (materialsCost + minOverhead) * 0.3;
    const maxLabor = (materialsCost + maxOverhead) * 0.5;

    // Calculate total min and max costs
    const minCost = materialsCost + minOverhead + minLabor;
    const maxCost = materialsCost + maxOverhead + maxLabor;

    setEstimatedCost({
      min: Math.round(minCost),
      max: Math.round(maxCost),
    });
  };

  const validateStep = () => {
    if (step === 1) {
      const newErrors: Record<string, string> = {};
      
      if (!productData.name) newErrors.name = "Product name is required";
      if (!productData.description) newErrors.description = "Description is required";
      if (!productData.category) newErrors.category = "Category is required";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const calculateSuggestedPrice = () => {
    const avgCost = (estimatedCost.min + estimatedCost.max) / 2;
    return Math.round(avgCost * (1 + profitMargin / 100));
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="Product Name"
              name="name"
              placeholder="e.g., Smart Water Bottle"
              value={productData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-genz-gray-dark">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your product idea..."
                value={productData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-genz-gray bg-white/70 backdrop-blur-sm placeholder:text-genz-gray-medium resize-none focus:border-genz-blue transition-all"
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>
            
            <Input
              label="Category"
              name="category"
              placeholder="e.g., Electronics, Fashion, Home"
              value={productData.category}
              onChange={handleInputChange}
              error={errors.category}
            />
            
            <div className="pt-4 flex justify-end">
              <Button onClick={nextStep} rightIcon={<ArrowRight size={16} />}>
                Next: Materials & Costs
              </Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-genz-gray-dark mb-1.5 block">
                  Material
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-genz-gray bg-white/70 backdrop-blur-sm text-genz-gray-dark focus:border-genz-blue transition-all"
                >
                  <option value="">Select a material</option>
                  {Object.keys(materialCosts).map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-24">
                <Input
                  label="Quantity"
                  type="number"
                  value={materialQuantity}
                  onChange={(e) => setMaterialQuantity(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              
              <Button
                onClick={addMaterial}
                variant="subtle"
                size="icon"
                disabled={!selectedMaterial || !materialQuantity}
                className="mb-1.5"
              >
                <PlusCircle size={18} />
              </Button>
            </div>
            
            {productData.materials.length > 0 ? (
              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-genz-dark mb-2">Materials List:</h4>
                <div className="space-y-2">
                  {productData.materials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between bg-white p-2 rounded-md"
                    >
                      <div>
                        <span className="font-medium text-genz-dark">{material.name}</span>
                        <span className="text-genz-gray-dark ml-2">
                          {material.quantity} {material.unit}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-genz-gray-dark mr-3">
                          ${material.costPerUnit}/unit
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 h-8 w-8"
                          onClick={() => removeMaterial(material.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/50 rounded-lg p-6 text-center">
                <Package size={32} className="mx-auto text-genz-gray-medium mb-2" />
                <p className="text-genz-gray-dark">
                  Add materials to see cost estimation
                </p>
              </div>
            )}
            
            {productData.materials.length > 0 && (
              <div className="mt-6 p-4 bg-genz-blue/10 rounded-xl">
                <h4 className="text-lg font-semibold text-genz-dark mb-2">Cost Estimation</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-genz-gray-dark">Materials Cost:</p>
                    <p className="text-lg font-medium text-genz-dark">
                      ${productData.materials.reduce((sum, m) => sum + m.quantity * m.costPerUnit, 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-genz-gray-dark">Estimated Total Cost:</p>
                    <p className="text-lg font-medium text-genz-dark">
                      ${estimatedCost.min} - ${estimatedCost.max}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="text-sm font-medium text-genz-gray-dark mb-1 block">
                    Profit Margin: {profitMargin}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(Number(e.target.value))}
                    className="w-full h-2 bg-genz-blue-light rounded-lg appearance-none cursor-pointer accent-genz-blue"
                  />
                </div>
                
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-genz-gray-dark">Suggested Retail Price:</p>
                  <p className="text-xl font-semibold text-genz-blue">
                    ${calculateSuggestedPrice()}
                  </p>
                </div>
              </div>
            )}
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button 
                onClick={() => console.log("Save product data:", productData)}
                disabled={productData.materials.length === 0}
              >
                Save Product Idea
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Layout>
      <AnimatedContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-display font-bold text-genz-dark mb-1">Product Ideation</h1>
          <p className="text-genz-gray-dark">Design your product and estimate manufacturing costs</p>
        </motion.div>

        <div className="flex mb-6">
          <div className="flex items-center w-full">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                step >= 1 ? "bg-genz-blue" : "bg-genz-gray-medium"
              }`}
            >
              1
            </div>
            <div className={`h-1 flex-1 ${step >= 2 ? "bg-genz-blue" : "bg-genz-gray"}`}></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                step >= 2 ? "bg-genz-blue" : "bg-genz-gray-medium"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <GlassCard>
          {renderForm()}
        </GlassCard>

        <div className="bg-genz-blue-light rounded-xl p-4 flex items-start space-x-4">
          <div className="p-2 bg-white rounded-full">
            <Lightbulb size={24} className="text-genz-blue" />
          </div>
          <div>
            <h3 className="font-medium text-genz-dark mb-1">Product Design Tip</h3>
            <p className="text-sm text-genz-gray-dark">
              Consider manufacturing constraints early in your design process. 
              Simple designs with fewer components are usually cheaper and easier to produce.
            </p>
          </div>
        </div>
      </AnimatedContainer>
    </Layout>
  );
};

export default Products;
