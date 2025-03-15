
import { motion } from "framer-motion";
import { User, Settings, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { AnimatedContainer, GlassCard } from "@/components/ui-components";
import { Button } from "@/components/ui/button";

const Profile = () => {
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
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="bg-genz-blue rounded-full w-16 h-16 flex items-center justify-center text-white mr-4">
              <User size={30} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-genz-dark">Profile</h1>
              <p className="text-genz-gray-dark">Manage your account</p>
            </div>
          </div>
          
          <GlassCard className="mb-4">
            <h2 className="font-semibold text-lg text-genz-dark mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-genz-gray-dark">Name</p>
                <p className="font-medium">Entrepreneur</p>
              </div>
              <div>
                <p className="text-sm text-genz-gray-dark">Email</p>
                <p className="font-medium">entrepreneur@example.com</p>
              </div>
              <div>
                <p className="text-sm text-genz-gray-dark">Membership</p>
                <p className="font-medium">Free Plan</p>
              </div>
            </div>
          </GlassCard>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>Settings</span>
              <Settings size={18} />
            </Button>
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>Logout</span>
              <LogOut size={18} />
            </Button>
          </div>
        </AnimatedContainer>
      </motion.div>
    </Layout>
  );
};

export default Profile;
