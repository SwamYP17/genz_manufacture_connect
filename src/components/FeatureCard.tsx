
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  color?: string;
  to: string;
  index?: number;
}

const FeatureCard = ({ title, icon, color = "bg-genz-blue-light", to, index = 0 }: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onClick={() => navigate(to)}
      className="feature-card glass rounded-xl p-6 flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className={cn("p-3 rounded-full mb-3", color)}>
        {icon}
      </div>
      <span className="text-sm font-medium text-genz-dark uppercase tracking-wider">
        {title}
      </span>
    </motion.div>
  );
};

export default FeatureCard;
