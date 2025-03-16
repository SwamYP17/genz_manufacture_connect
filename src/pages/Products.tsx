
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Trash, PlusCircle, Save } from "lucide-react";
import SaveEstimationModal from "@/components/SaveEstimationModal";
import { 
  AnimatedContainer, 
  GlassCard, 
  Input, 
  Button, 
  Badge 
} from "@/components/ui-components";

// Material cost estimation data - converted to INR (approximate conversion rate: 1 USD = 75 INR)
const materialCosts = {
  "Plastic": { min: 150, max: 750, unit: "kg" },
  "Metal": { min: 375, max: 2250, unit: "kg" },
  "Wood": { min: 225, max: 1125, unit: "kg" },
  "Fabric": { min: 375, max: 1875, unit: "m²" },
  "Electronics": { min: 750, max: 15000, unit: "unit" },
  "Glass": { min: 600, max: 3000, unit: "m²" },
  "Rubber": { min: 300, max: 1500, unit: "kg" },
  "Paper/Cardboard": { min: 75, max: 375, unit: "kg" },
};

interface Material {
  name: string;
  quantity: number;
  costPerUnit: number;
}

interface ProductData {
  name: string;
  description: string;
  category: string;
  materials: Material[];
  laborCost: number;
  otherCosts: number;
}

const Products = () => {
  const [step, setStep] = useState(1);
  const [materialOptions] = useState(Object.keys(materialCosts));
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState(1);
  const [materialCostPerUnit, setMaterialCostPerUnit] = useState(0);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    category: "",
    materials: [],
    laborCost: 0,
    otherCosts: 0,
  });

  const [profitMargin, setProfitMargin] = useState(30);
  
  const [errors, setErrors] = useState({
    name: "",
    materials: "",
  });

  // Calculate estimated cost
  const estimatedCost = {
    min: Math.round(
      productData.materials.reduce((sum, m) => sum + m.quantity * m.costPerUnit * 0.85, 0) +
      productData.laborCost +
      productData.otherCosts
    ),
    max: Math.round(
      productData.materials.reduce((sum, m) => sum + m.quantity * m.costPerUnit * 1.15, 0) +
      productData.laborCost * 1.2 +
      productData.otherCosts * 1.1
    ),
  };

  const handleAddMaterial = () => {
    if (!selectedMaterial) {
      return;
    }

    const newMaterial: Material = {
      name: selectedMaterial,
      quantity: materialQuantity,
      costPerUnit: materialCostPerUnit || 
        Math.round(
          (materialCosts[selectedMaterial as keyof typeof materialCosts].min + 
           materialCosts[selectedMaterial as keyof typeof materialCosts].max) / 2
        ),
    };

    setProductData({
      ...productData,
      materials: [...productData.materials, newMaterial],
    });

    // Reset material inputs
    setSelectedMaterial("");
    setMaterialQuantity(1);
    setMaterialCostPerUnit(0);
  };

  const handleRemoveMaterial = (index: number) => {
    const updatedMaterials = [...productData.materials];
    updatedMaterials.splice(index, 1);
    setProductData({
      ...productData,
      materials: updatedMaterials,
    });
  };

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    
    if (material) {
      // Set default cost per unit based on the average of min and max
      const { min, max } = materialCosts[material as keyof typeof materialCosts];
      setMaterialCostPerUnit(Math.round((min + max) / 2));
    } else {
      setMaterialCostPerUnit(0);
    }
  };

  const validateStep1 = () => {
    const newErrors = {
      name: !productData.name ? "Product name is required" : "",
      materials: productData.materials.length === 0 ? "At least one material is required" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateSuggestedPrice = () => {
    const avgCost = (estimatedCost.min + estimatedCost.max) / 2;
    return Math.round(avgCost * (1 + profitMargin / 100));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-genz-dark">Product Details</h2>
            
            <div className="space-y-4">
              <Input
                label="Product Name"
                placeholder="e.g., Eco-friendly Water Bottle"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                error={errors.name}
              />
              
              <div className="space-y-2">
                <Input
                  label="Product Description (Optional)"
                  placeholder="Brief description of your product"
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Input
                  label="Product Category (Optional)"
                  placeholder="e.g., Kitchenware, Electronics, Fashion"
                  value={productData.category}
                  onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-genz-dark">Materials</h3>
                {errors.materials && <p className="text-xs text-red-500">{errors.materials}</p>}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="w-full sm:w-[calc(40%-0.75rem)]">
                  <label className="text-sm font-medium text-genz-gray-dark">Material Type</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-genz-gray bg-white/70 backdrop-blur-sm"
                    value={selectedMaterial}
                    onChange={handleMaterialChange}
                  >
                    <option value="">Select material</option>
                    {materialOptions.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-[calc(20%-0.75rem)]">
                  <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    value={materialQuantity}
                    onChange={(e) => setMaterialQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div className="w-full sm:w-[calc(30%-0.75rem)]">
                  <Input
                    label="Cost per Unit (₹)"
                    type="number"
                    min="0"
                    value={materialCostPerUnit}
                    onChange={(e) => setMaterialCostPerUnit(parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="w-full sm:w-[calc(10%-0.75rem)] flex items-end">
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    disabled={!selectedMaterial}
                    className="w-full h-[46px] rounded-xl bg-genz-blue text-white flex items-center justify-center hover:bg-genz-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
              </div>
              
              {productData.materials.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-genz-gray-dark">Added Materials:</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {productData.materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
                      >
                        <div>
                          <span className="font-medium text-genz-dark">{material.name}</span>
                          <div className="flex items-center">
                            <span className="text-sm text-genz-gray-dark mr-3">
                              {formatCurrency(material.costPerUnit)}/unit
                            </span>
                            <Badge variant="default">
                              Qty: {material.quantity}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemoveMaterial(index)}
                        >
                          <Trash size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-genz-dark">Additional Costs</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-medium text-genz-dark mb-4">Materials Summary</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-genz-gray-dark">Materials Cost:</p>
                    <p className="text-lg font-medium text-genz-dark">
                      {formatCurrency(productData.materials.reduce((sum, m) => sum + m.quantity * m.costPerUnit, 0))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-genz-gray-dark">Estimated Total Cost:</p>
                    <p className="text-lg font-medium text-genz-dark">
                      {formatCurrency(estimatedCost.min)} - {formatCurrency(estimatedCost.max)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Labor Cost (₹)"
                  type="number"
                  min="0"
                  value={productData.laborCost}
                  onChange={(e) => setProductData({ ...productData, laborCost: parseInt(e.target.value) || 0 })}
                  placeholder="Total labor cost for production"
                />
                
                <Input
                  label="Other Costs (₹)"
                  type="number"
                  min="0"
                  value={productData.otherCosts}
                  onChange={(e) => setProductData({ ...productData, otherCosts: parseInt(e.target.value) || 0 })}
                  placeholder="Packaging, shipping, overhead, etc."
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-genz-dark">Pricing Analysis</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-genz-gray-dark">Profit Margin (%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(parseInt(e.target.value))}
                    className="w-full h-2 bg-genz-gray rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-xs text-genz-gray-dark mt-1">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-genz-gray-dark">Selected Profit Margin:</p>
                  <p className="text-xl font-semibold text-genz-dark">{profitMargin}%</p>
                </div>
                
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-genz-gray-dark">Suggested Retail Price:</p>
                  <p className="text-xl font-semibold text-genz-blue">
                    {formatCurrency(calculateSuggestedPrice())}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-medium text-genz-dark mb-4">Cost Breakdown</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-genz-gray-dark">Materials:</span>
                    <span className="font-medium">
                      {formatCurrency(productData.materials.reduce((sum, m) => sum + m.quantity * m.costPerUnit, 0))}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-genz-gray-dark">Labor:</span>
                    <span className="font-medium">{formatCurrency(productData.laborCost)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-genz-gray-dark">Other Costs:</span>
                    <span className="font-medium">{formatCurrency(productData.otherCosts)}</span>
                  </li>
                  <li className="flex justify-between pt-2 border-t">
                    <span className="text-genz-gray-dark">Total Production Cost:</span>
                    <span className="font-semibold">
                      {formatCurrency((estimatedCost.min + estimatedCost.max) / 2)}
                    </span>
                  </li>
                  <li className="flex justify-between pt-2 border-t">
                    <span className="text-genz-gray-dark">Profit ({profitMargin}%):</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(((estimatedCost.min + estimatedCost.max) / 2) * (profitMargin / 100))}
                    </span>
                  </li>
                </ul>
                
                <div className="mt-4 pt-3 border-t flex justify-between">
                  <Button 
                    variant="outline"
                    leftIcon={<Save size={18} />}
                    onClick={() => setIsSaveModalOpen(true)}
                  >
                    Save Estimation
                  </Button>
                  
                  <Button
                    variant="success"
                  >
                    Export Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Layout pageTitle="Product Estimation">
      <AnimatedContainer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4"
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-genz-dark">Product Cost Estimation</h1>
          <p className="text-genz-gray-dark">Estimate costs and determine optimal pricing for your product</p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 sm:space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center ${i < 3 ? "w-24 sm:w-32" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    i <= step
                      ? "bg-genz-blue text-white"
                      : "bg-genz-gray-light text-genz-gray-dark"
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <>
                    <div
                      className={`h-1 flex-grow mx-1 ${
                        i < step ? "bg-genz-blue" : "bg-genz-gray-light"
                      }`}
                    ></div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <div className="hidden sm:block text-sm text-genz-gray-dark">
            Step {step} of 3
          </div>
        </div>
        
        <GlassCard>
          {renderForm()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            
            <Button onClick={handleContinue} disabled={step === 3}>
              {step < 3 ? "Continue" : "Finish"}
            </Button>
          </div>
        </GlassCard>
        
        {/* Save Estimation Modal */}
        <SaveEstimationModal 
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          productData={productData}
          estimatedCost={estimatedCost}
          profitMargin={profitMargin}
          suggestedPrice={calculateSuggestedPrice()}
        />
      </AnimatedContainer>
    </Layout>
  );
};

export default Products;
