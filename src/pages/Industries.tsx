import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Factory, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { AnimatedContainer, GlassCard, Badge, Button } from "@/components/ui-components";

// Mock data for industries
const industriesData = [
  {
    id: 1,
    name: "Advanced Electronics",
    description: "Specializing in consumer electronics and PCB manufacturing",
    location: "California, USA",
    tags: ["Electronics", "PCB", "IoT"],
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Textile Innovations",
    description: "Sustainable fabrics and fashion manufacturing solutions",
    location: "Milan, Italy",
    tags: ["Fashion", "Textiles", "Sustainable"],
    image: "https://images.unsplash.com/photo-1558434739-c56de022d2ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "FoodTech Manufacturing",
    description: "Food processing and packaging solutions for startups",
    location: "Chicago, USA",
    tags: ["Food", "Packaging", "Processing"],
    image: "https://images.unsplash.com/photo-1598973306155-1a1865e24013?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Smart Home Solutions",
    description: "Connected devices and IoT manufacturing partner",
    location: "Shenzhen, China",
    tags: ["IoT", "Smart Home", "Hardware"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Green Energy Products",
    description: "Solar and renewable energy product manufacturing",
    location: "Berlin, Germany",
    tags: ["Renewable", "Energy", "Sustainable"],
    image: "https://images.unsplash.com/photo-1566093097221-ac2335b08ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Medical Devices Co",
    description: "Precision medical device manufacturing and compliance",
    location: "Boston, USA",
    tags: ["Medical", "Healthcare", "Precision"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Tata Electronics",
    description: "Advanced semiconductor and electronics manufacturing",
    location: "Bangalore, India",
    tags: ["Electronics", "Semiconductor", "Manufacturing"],
    image: "https://images.unsplash.com/photo-1544616326-a013420f0f16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Reliance Textiles",
    description: "Large-scale textile manufacturing and fabric innovation",
    location: "Mumbai, India",
    tags: ["Textiles", "Fabrics", "Manufacturing"],
    image: "https://images.unsplash.com/photo-1580497056906-46788f09d066?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Biocon Biologics",
    description: "Biopharmaceutical production and healthcare solutions",
    location: "Hyderabad, India",
    tags: ["Biotech", "Pharmaceutical", "Healthcare"],
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Infosys Manufacturing",
    description: "IT-enabled manufacturing solutions and automation",
    location: "Pune, India",
    tags: ["IT", "Automation", "Software"],
    image: "https://images.unsplash.com/photo-1607295548590-1a98543310c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    name: "Mahindra Electric",
    description: "Electric vehicle and sustainable transport manufacturing",
    location: "Chennai, India",
    tags: ["Automotive", "Electric", "Sustainable"],
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const Industries = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract all unique tags from industries data
  const allTags = Array.from(
    new Set(industriesData.flatMap((industry) => industry.tags))
  );

  // Filter industries based on search query and selected tags
  const filteredIndustries = industriesData.filter((industry) => {
    const matchesSearch = industry.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         industry.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                      selectedTags.some(tag => industry.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2" 
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-display font-bold text-genz-dark">Industries</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-genz-gray-medium" />
            </div>
            <input
              type="text"
              placeholder="Search industries, specializations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-genz-gray bg-white/80 backdrop-blur-sm placeholder:text-genz-gray-medium transition-all"
            />
          </div>

          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 pb-3 border-b border-genz-gray overflow-hidden"
            >
              <p className="text-sm font-medium text-genz-dark mb-2">Filter by category:</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-genz-blue text-white"
                        : "bg-genz-gray-light text-genz-gray-dark hover:bg-genz-gray"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatedContainer>

        <div className="grid grid-cols-1 gap-4">
          {filteredIndustries.length > 0 ? (
            filteredIndustries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GlassCard withHover className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-24 h-24 sm:h-24 rounded-lg overflow-hidden mb-3 sm:mb-0 sm:mr-4">
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-genz-dark">{industry.name}</h3>
                          <p className="text-sm text-genz-gray-dark mb-2">{industry.location}</p>
                        </div>
                        <Button
                          variant="subtle"
                          size="sm"
                          className="mt-2 sm:mt-0"
                        >
                          Connect
                        </Button>
                      </div>
                      <p className="text-sm text-genz-gray-dark mb-3">{industry.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {industry.tags.map((tag) => (
                          <Badge key={tag} variant="default">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <Factory size={48} className="mx-auto text-genz-gray-medium mb-2" />
              <h3 className="text-lg font-medium text-genz-dark">No industries found</h3>
              <p className="text-genz-gray-dark">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Industries;
