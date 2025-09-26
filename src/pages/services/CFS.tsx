import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Warehouse, Package, Settings, Truck } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
const ScrollToTop = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);
  return null;
};
const CFS = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const services = [{
    icon: Package,
    title: "3PL Storage",
    description: "Short term and long term storing facility with secure warehouse management."
  }, {
    icon: Settings,
    title: "Value-Added Services",
    description: "Labelling, Repacking, Palletization and other customization services."
  }, {
    icon: Truck,
    title: "Supply Chain Management",
    description: "End-to-end logistics solutions and supply chain optimization."
  }];
  return <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-kargon-red">CFS</span> Services
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
                Container Freight Station with state-of-the-art facilities and technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Text Section */}
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} viewport={{
              once: true
            }} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold mb-4 text-kargon-blue">Advanced CFS Facilities</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">Our CFS features a 7000 square meter covered area and a 1000 square meter open yard to assist you with comprehensive logistics solutions.</p>
                </div>

                <div className="bg-kargon-blue/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-kargon-blue mb-3">Facility Specifications</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 7,000 sqm covered warehouse area</li>
                    <li>• 1000 sqm open yard space</li>
                    <li>• Latest handling equipment</li>
                    <li>• Advanced security systems</li>
                    <li>• Climate-controlled storage</li>
                  </ul>
                </div>
              </motion.div>

              {/* Image Section */}
              <motion.div initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} viewport={{
              once: true
            }} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img alt="CFS Warehouse" loading="lazy" className="w-full h-96 object-cover" src="/container.jpg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg bg-kargon-red">
                  <Warehouse className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-kargon-blue mb-6">Our CFS Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive warehouse and logistics solutions tailored to your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="bg-slate-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-kargon-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="w-8 h-8 text-kargon-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-kargon-blue mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-kargon-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Need CFS Storage Solutions?</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Contact us to learn more about our advanced warehouse facilities and services
              </p>
              <Link to="/contact" className="inline-flex items-center bg-white text-kargon-blue px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        
      </main>

      <Footer />
    </div>;
};
export default CFS;