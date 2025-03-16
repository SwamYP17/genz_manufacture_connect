
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { 
  GlassCard, 
  AnimatedContainer, 
  Button, 
  Badge 
} from '@/components/ui-components';
import { 
  SavedEstimation, 
  getSavedEstimations, 
  deleteEstimation 
} from '@/utils/localStorage';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  Clock, 
  Trash2, 
  Package, 
  Clipboard, 
  Search, 
  X 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const SavedEstimations = () => {
  const [estimations, setEstimations] = useState<SavedEstimation[]>([]);
  const [filteredEstimations, setFilteredEstimations] = useState<SavedEstimation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEstimation, setSelectedEstimation] = useState<SavedEstimation | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load saved estimations
    const loadEstimations = () => {
      const savedEstimations = getSavedEstimations();
      // Sort by most recent first
      const sortedEstimations = savedEstimations.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setEstimations(sortedEstimations);
      setFilteredEstimations(sortedEstimations);
    };
    
    loadEstimations();
  }, []);
  
  useEffect(() => {
    // Filter estimations when search query changes
    if (searchQuery.trim() === '') {
      setFilteredEstimations(estimations);
    } else {
      const filtered = estimations.filter(est => 
        est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        est.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEstimations(filtered);
    }
  }, [searchQuery, estimations]);
  
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Delete estimation
    const success = deleteEstimation(id);
    
    if (success) {
      // Update state
      const updatedEstimations = estimations.filter(est => est.id !== id);
      setEstimations(updatedEstimations);
      
      toast({
        title: "Estimation Deleted",
        description: "The product estimation has been removed",
      });
    } else {
      toast({
        title: "Error",
        description: "Could not delete the estimation",
        variant: "destructive",
      });
    }
  };
  
  const handleViewDetails = (estimation: SavedEstimation) => {
    setSelectedEstimation(estimation);
  };
  
  return (
    <Layout pageTitle="Saved Estimations">
      <AnimatedContainer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-genz-dark">Saved Product Estimations</h1>
            <p className="text-genz-gray-dark">View and manage your saved product estimations</p>
          </div>
        </div>
        
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-genz-gray-medium" size={18} />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-genz-gray-medium hover:text-genz-gray-dark"
              onClick={() => setSearchQuery('')}
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {filteredEstimations.length === 0 ? (
          <GlassCard className="text-center py-12">
            <FolderOpen className="mx-auto h-16 w-16 text-genz-gray-medium mb-4" />
            <h3 className="text-xl font-medium text-genz-dark mb-2">No Estimations Found</h3>
            <p className="text-genz-gray-dark mb-6">
              {searchQuery 
                ? "No estimations match your search criteria. Try a different search term."
                : "You haven't saved any product estimations yet. Create a product estimation and save it to see it here."}
            </p>
          </GlassCard>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEstimations.map((estimation, index) => (
              <motion.div
                key={estimation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="h-full"
              >
                <GlassCard 
                  className="h-full cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewDetails(estimation)}
                  withHover
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-genz-dark line-clamp-1">{estimation.name}</h3>
                    <button 
                      className="text-red-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                      onClick={(e) => handleDelete(estimation.id, e)}
                      aria-label="Delete estimation"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-genz-gray-dark mb-4 text-sm line-clamp-2">
                    {estimation.description || "No description provided"}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white p-2 rounded-lg">
                      <p className="text-xs text-genz-gray-dark">Estimated Cost:</p>
                      <p className="font-medium text-genz-dark">
                        {formatCurrency(estimation.estimatedCost.min)} - {formatCurrency(estimation.estimatedCost.max)}
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded-lg">
                      <p className="text-xs text-genz-gray-dark">Suggested Price:</p>
                      <p className="font-medium text-genz-blue">
                        {formatCurrency(estimation.suggestedPrice)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-genz-gray-medium mt-2">
                    <Clock size={14} className="mr-1" />
                    <span>{formatDate(estimation.createdAt)}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Estimation Details Dialog */}
        {selectedEstimation && (
          <Dialog 
            open={!!selectedEstimation} 
            onOpenChange={(open) => !open && setSelectedEstimation(null)}
          >
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedEstimation.name}</DialogTitle>
                <DialogDescription>
                  Created on {formatDate(selectedEstimation.createdAt)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                {selectedEstimation.description && (
                  <div>
                    <h3 className="text-sm font-medium text-genz-gray-dark mb-1 flex items-center">
                      <Clipboard size={16} className="mr-2" /> Description
                    </h3>
                    <p className="bg-gray-50 p-3 rounded-md text-genz-dark">
                      {selectedEstimation.description}
                    </p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-genz-gray-dark mb-2 flex items-center">
                    <Package size={16} className="mr-2" /> Materials Used
                  </h3>
                  <div className="bg-gray-50 rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Material</th>
                          <th className="p-2 text-right">Quantity</th>
                          <th className="p-2 text-right">Cost Per Unit</th>
                          <th className="p-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEstimation.materials.map((material, idx) => (
                          <tr key={idx} className="border-t border-gray-200">
                            <td className="p-2">{material.name}</td>
                            <td className="p-2 text-right">{material.quantity}</td>
                            <td className="p-2 text-right">{formatCurrency(material.costPerUnit)}</td>
                            <td className="p-2 text-right font-medium">
                              {formatCurrency(material.quantity * material.costPerUnit)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-genz-gray-dark mb-2">Additional Costs</h3>
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex justify-between">
                        <span>Labor Cost:</span>
                        <span className="font-medium">{formatCurrency(selectedEstimation.laborCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Costs:</span>
                        <span className="font-medium">{formatCurrency(selectedEstimation.otherCosts)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span>Profit Margin:</span>
                        <span className="font-medium">{selectedEstimation.profitMargin}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-genz-gray-dark mb-2">Summary</h3>
                    <div className="bg-gray-50 p-3 rounded-md space-y-3">
                      <div>
                        <div className="text-sm text-genz-gray-dark">Estimated Cost Range:</div>
                        <div className="font-medium text-lg text-genz-dark">
                          {formatCurrency(selectedEstimation.estimatedCost.min)} - {formatCurrency(selectedEstimation.estimatedCost.max)}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-genz-gray-dark">Suggested Retail Price:</div>
                        <div className="font-semibold text-xl text-genz-blue">
                          {formatCurrency(selectedEstimation.suggestedPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatedContainer>
    </Layout>
  );
};

export default SavedEstimations;
