// src/components/ServicesSection.tsx
import { Link } from "react-router-dom";
import { Boxes, Building2 } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
type ServiceCard = {
  id: number;
  title: "LCL" | "CFS";
  description: string;
  slug: string;
  image: string; // put images in /public
  delay?: number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tag: string;
};
const services: ServiceCard[] = [{
  id: 1,
  title: "LCL",
  description: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
  slug: "lcl",
  image: "/lcl1.JPG",
  delay: 0,
  Icon: Boxes,
  tag: "Less-Than Container Load"
}, {
  id: 2,
  title: "CFS",
  description: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
  slug: "cfs",
  image: "/container.jpg",
  delay: 120,
  Icon: Building2,
  tag: "Container Freight Station"
}];
export default function ServicesSection() {
  return <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-14">
          <h2 className="font-bold text-kargon-blue text-4xl md:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-800">
            Comprehensive logistics solutions to move your world efficiently and safely.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(({
          id,
          title,
          description,
          slug,
          image,
          delay,
          Icon,
          tag
        }) => <ScrollAnimation key={id} delay={delay}>
              <article className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:shadow-2xl">
                {/* Media */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  {/* Top gradient wash */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Tag chip */}
                  
                  {/* Corner badge */}
                  
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {description}
                  </p>

                  {/* Footer actions */}
                  <div className="mt-6 flex items-center justify-between">
                    <Link to={`/services/${slug}`} className="inline-flex items-center gap-2 rounded-lg bg-kargon-blue px-4 py-2 text-white font-semibold transition-colors hover:bg-kargon-blue/90">
                      Read more
                      <span aria-hidden>→</span>
                    </Link>

                    {/* Mini stats / accent */}
                    <div className="hidden md:flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Reliable
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Global
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Efficient
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom gradient accent on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-kargon-blue via-cyan-400 to-kargon-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </article>
            </ScrollAnimation>)}
        </div>
      </div>
    </section>;
}