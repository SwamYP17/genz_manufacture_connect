
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { GlassCard, AnimatedContainer } from "@/components/ui-components";

const Workflow = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-semibold">Workflow</h1>
        </div>

        <GlassCard className="p-4 mb-6">
          <AnimatedContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-genz-blue">Product Development Workflow</h2>
            <p className="text-genz-gray-dark mb-6">
              This diagram illustrates the journey from idea to manufacturing and marketing. Follow these steps to bring your product to market efficiently.
            </p>

            <div className="overflow-x-auto">
              <img 
                src="/lovable-uploads/4ec85612-0644-4a77-a6c3-abc5361a0a5a.png" 
                alt="Product Development Workflow Diagram" 
                className="max-w-3xl mx-auto rounded-lg shadow-md"
              />
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-genz-blue mb-2">1. Search for Domain</h3>
                <p className="text-genz-gray-dark">Research your product category to understand market needs and opportunities.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-genz-blue mb-2">2. Input Decision Point</h3>
                <p className="text-genz-gray-dark">Based on your research, decide which path to follow:</p>
                <ul className="list-disc list-inside mt-2 ml-4 text-genz-gray-dark">
                  <li>Manufacturing - For physical product creation</li>
                  <li>Material Requirements - For sourcing materials</li>
                  <li>Advertisement Ideas - For marketing strategy</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-genz-blue mb-2">3. Manufacturing Path</h3>
                <p className="text-genz-gray-dark">Explore the best factory options, get personalized suggestions, and follow a roadmap for manufacturing.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-genz-blue mb-2">4. Material Requirements Path</h3>
                <p className="text-genz-gray-dark">Find the best available options, explore import opportunities, and discover material production options.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-genz-blue mb-2">5. Advertisement Ideas Path</h3>
                <p className="text-genz-gray-dark">Learn about the best platforms to advertise, minimum cost options, and other available marketing strategies.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-genz-blue mb-2">6. Personal AI Assistance</h3>
                <p className="text-genz-gray-dark">Throughout your journey, our AI assistant is available to help with any questions or challenges.</p>
              </div>
            </div>
          </AnimatedContainer>
        </GlassCard>
      </motion.div>
    </Layout>
  );
};

export default Workflow;
