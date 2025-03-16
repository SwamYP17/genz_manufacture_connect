
import { useState } from 'react';
import { Button } from "@/components/ui-components";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SaveIcon } from 'lucide-react';
import { saveProductEstimation } from '@/utils/localStorage';
import { toast } from '@/components/ui/use-toast';

interface SaveEstimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: {
    materials: Array<{
      name: string;
      quantity: number;
      costPerUnit: number;
    }>;
    laborCost: number;
    otherCosts: number;
  };
  estimatedCost: {
    min: number;
    max: number;
  };
  profitMargin: number;
  suggestedPrice: number;
}

const SaveEstimationModal = ({
  isOpen,
  onClose,
  productData,
  estimatedCost,
  profitMargin,
  suggestedPrice
}: SaveEstimationModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Please provide a name for this estimation",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const savedEstimation = saveProductEstimation({
      name,
      description,
      materials: productData.materials,
      laborCost: productData.laborCost,
      otherCosts: productData.otherCosts,
      profitMargin,
      estimatedCost,
      suggestedPrice
    });
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (savedEstimation) {
        toast({
          title: "Estimation Saved",
          description: "Your product estimation has been saved successfully",
        });
        
        // Reset form and close modal
        setName('');
        setDescription('');
        onClose();
      } else {
        toast({
          title: "Error",
          description: "There was a problem saving your estimation",
          variant: "destructive",
        });
      }
    }, 800);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Product Estimation</DialogTitle>
          <DialogDescription>
            Save this estimation to view it later. Provide a name and optional description.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Eco-friendly Water Bottle" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="A recyclable water bottle made from plant-based materials"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            leftIcon={<SaveIcon size={18} />}
            onClick={handleSave}
            loading={isLoading}
            loadingText="Saving..."
          >
            Save Estimation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveEstimationModal;
