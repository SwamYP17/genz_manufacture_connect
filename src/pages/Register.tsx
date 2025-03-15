
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Input, Button, GlassCard } from "@/components/ui-components";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    interests: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user name in localStorage
      localStorage.setItem("userName", formData.fullName.split(" ")[0]);
      
      // Navigate to home page
      navigate("/");
    }, 1500);
  };

  const formFields = [
    { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
    { name: "email", label: "Email", type: "email", placeholder: "john.doe@example.com" },
    { 
      name: "password", 
      label: "Password", 
      type: showPassword ? "text" : "password", 
      placeholder: "••••••••",
      hasToggle: true
    },
    { 
      name: "confirmPassword", 
      label: "Confirm Password", 
      type: showPassword ? "text" : "password", 
      placeholder: "••••••••" 
    },
    { 
      name: "interests", 
      label: "Product Interests (Optional)", 
      type: "text", 
      placeholder: "e.g., Electronics, Fashion, Food Products" 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-genz-blue-light to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-display font-bold text-genz-dark"
          >
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-genz-gray-dark mt-2"
          >
            Join the network of GenZ entrepreneurs
          </motion.p>
        </div>

        <GlassCard className="mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name} className="relative">
                <Input
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  error={errors[field.name]}
                />
                {field.hasToggle && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-genz-gray-medium hover:text-genz-gray-dark transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              </div>
            ))}

            <Button
              type="submit"
              width="full"
              loading={isLoading}
              loadingText="Creating account..."
              leftIcon={<UserPlus size={18} />}
            >
              Sign Up
            </Button>
          </form>
        </GlassCard>

        <div className="text-center">
          <p className="text-genz-gray-dark">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-genz-blue hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
