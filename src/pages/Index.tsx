
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Factory, TrendingUp, DollarSign, Package, FileText, GitBranch } from "lucide-react";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import Assistant from "@/components/Assistant";
import { GlassCard, AnimatedContainer, staggerContainer } from "@/components/ui-components";

const Index = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Entrepreneur");
  
  useEffect(() => {
    // Simulate fetching user data
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const features = [
    {
      title: "Workflow",
      icon: <GitBranch size={24} className="text-genz-accent-purple" />,
      color: "bg-genz-accent-purple/10",
      to: "/workflow"
    },
    {
      title: "Industries",
      icon: <Factory size={24} className="text-genz-blue" />,
      color: "bg-genz-blue/10",
      to: "/industries"
    },
    {
      title: "Stocks",
      icon: <TrendingUp size={24} className="text-genz-accent-green" />,
      color: "bg-genz-accent-green/10",
      to: "/stocks"
    },
    {
      title: "Products",
      icon: <Package size={24} className="text-genz-accent-yellow" />,
      color: "bg-genz-accent-yellow/10",
      to: "/products"
    },
    {
      title: "Details",
      icon: <FileText size={24} className="text-genz-accent-red" />,
      color: "bg-genz-accent-red/10",
      to: "/details"
    },
    {
      title: "Finance",
      icon: <DollarSign size={24} className="text-green-600" />,
      color: "bg-green-50",
      to: "/finance"
    }
  ];

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedContainer 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="text-center py-10 mb-6">
            <AnimatedContainer
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-2"
              >
                <span className="text-xs font-medium bg-genz-blue text-white px-3 py-1 rounded-full">
                  GenZ Entrepreneur Platform
                </span>
              </motion.div>
              <motion.h1 
                className="text-4xl sm:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-genz-blue to-genz-blue-dark bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                WELCOME<br/>
                {userName}!
              </motion.h1>
              <motion.p 
                className="text-genz-gray-dark max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Connect with top manufacturing industries and bring your innovative ideas to life
              </motion.p>
            </AnimatedContainer>
          </GlassCard>
        </AnimatedContainer>

        <AnimatedContainer 
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              color={feature.color}
              to={feature.to}
              index={index}
            />
          ))}
        </AnimatedContainer>
      </motion.div>
      <Assistant />
    </Layout>
  );
};

export default Index;
