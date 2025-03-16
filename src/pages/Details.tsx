
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { AnimatedContainer } from "@/components/ui-components";
import { Button } from "@/components/ui/button";

const Details = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <AnimatedContainer
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-display font-bold text-genz-dark">Details</h1>
              <p className="text-genz-gray-dark mt-2">Product specifications and technical information</p>
            </div>
          </div>
          
          <div className="text-center py-20">
            <FileText size={64} className="mx-auto text-genz-accent-red mb-4" />
            <h2 className="text-xl font-medium text-genz-dark mb-2">Coming Soon</h2>
            <p className="text-genz-gray-dark mb-2">
              Our detailed product specification system is currently under development
            </p>
            <p className="text-genz-gray-dark text-sm max-w-md mx-auto">
              We're working hard to bring you comprehensive product specification tools 
              that will help you define and document your product requirements with precision.
              Check back soon!
            </p>
          </div>
        </AnimatedContainer>
      </motion.div>
    </Layout>
  );
};

export default Details;
