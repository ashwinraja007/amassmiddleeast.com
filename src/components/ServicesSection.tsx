import { Link } from "react-router-dom";
import ScrollAnimation from "./ScrollAnimation";

const twoServices = [
  {
    id: 1,
    title: "LCL",
    description:
      "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
    slug: "lcl",
    delay: 0,
  },
  {
    id: 2,
    title: "CFS",
    description:
      "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
    slug: "cfs",
    delay: 100,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-16">
          <p className="font-bold mb-4 text-kargon-blue text-5xl">Our Services</p>
          <p className="mt-4 max-w-xl mx-auto text-lg text-slate-950">
            Comprehensive logistics solutions to move your world efficiently and safely.
          </p>
        </ScrollAnimation>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {twoServices.map((service) => (
            <ScrollAnimation key={service.id} delay={service.delay}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-kargon-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                  >
                    Read more
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
