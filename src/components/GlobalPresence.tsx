import { motion } from 'framer-motion';
import { Globe, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentCountryFromPath } from '@/services/countryDetection';
const GOLD = "#cfae4c"; // Sampled from your logo
const BLUE = "#2172c9"; // Sampled from your logo

const GlobalPresence = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const locations = [{
    id: 1,
    name: "Melbourne",
    position: {
      top: "75%",
      left: "85%"
    },
    country: "Australia"
  }, {
    id: 2,
    name: "Singapore",
    position: {
      top: "58%",
      left: "75%"
    },
    country: "Singapore"
  }, {
    id: 3,
    name: "Dubai",
    position: {
      top: "45%",
      left: "62%"
    },
    country: "UAE"
  }, {
    id: 4,
    name: "London",
    position: {
      top: "30%",
      left: "48%"
    },
    country: "UK"
  }, {
    id: 5,
    name: "New York",
    position: {
      top: "35%",
      left: "25%"
    },
    country: "USA"
  }, {
    id: 6,
    name: "Los Angeles",
    position: {
      top: "40%",
      left: "15%"
    },
    country: "USA"
  }, {
    id: 7,
    name: "Shanghai",
    position: {
      top: "40%",
      left: "80%"
    },
    country: "China"
  }, {
    id: 8,
    name: "Mumbai",
    position: {
      top: "50%",
      left: "68%"
    },
    country: "India"
  }, {
    id: 9,
    name: "Cape Town",
    position: {
      top: "75%",
      left: "52%"
    },
    country: "South Africa"
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const getGlobalPresenceLink = () => {
    if (currentCountry.code === "SG") return "/global-presence";
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}/global-presence`;
  };
  return;
};
export default GlobalPresence;