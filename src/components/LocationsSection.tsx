import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

type LocationDetails = {
  map: string;      // iframe embed URL
  address: string;  // may contain \n
  phone: string;    // may include multiple lines (phone, fax, email)
};

type CountryLocations = { [location: string]: LocationDetails };
type LocationsData = { [country: string]: CountryLocations };

const allLocations: LocationsData = {
  UAE: {
    "Head Office": {
      map: "https://www.google.com/maps/d/embed?mid=1ZxPAULjAWy996Ko2I-INOx4KZVyxwz0&ehbc=2E312F&noprof=1",
      address: "202, Sultan Business Centre\nOud Metha, P.O. Box 33463\nDubai – UAE",
      phone: "+971 4 3575508\nFax: +971 4 2221794\ncontact@dxb.amassfreight.com",
    },
    CFS: {
      map: "https://www.google.com/maps/d/embed?mid=12VFJg6YBwuqjx5QGoyFa4gN4o0N9zv0&ehbc=2E312F&noprof=1",
      address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
      phone: "+971 4 3400298\n+971 4 3575508\nFax: +971 4 8831004\ncontact@dxb.amassfreight.com",
    },
  },

  "Saudi Arabia": {
    "Dammam – Head Office": {
      map: "https://www.google.com/maps/d/embed?mid=1lYrRcHQxz2PNkKjLJFhvmkNOyMj-xKA&ehbc=2E312F&noprof=1",
      address:
        "Rashidiya Business Center\nBuild No: 7257 Room 308, 3rd Floor – Al Amamrah\nDammam – 32415 – KSA",
      phone: "+966 13 849 8637\ncontact@dxb.amassfreight.com",
    },
    Jeddah: {
      map: "https://www.google.com/maps/d/embed?mid=1vrlsL0ACTChy50rWZCiqqYvfOvIqLdQ&ehbc=2E312F&noprof=1",
      address:
        "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
      phone: "+966 12 578 0874\ncontact@dxb.amassfreight.com",
    },
    Riyadh: {
      // Standard search embed for the provided address
      map:
        "https://www.google.com/maps/d/embed?mid=13FJaQb-RxFxmAUPvNdKkH2Hz7VXxFJM&ehbc=2E312F&noprof=1",
      address:
        "Room No. 20, Al Malaz\nBldg. No. 104, 2nd Floor, Al Qirawani St.\nAl Malaz District, Riyadh 11332, K.S.A",
      phone: "+966 13 849 8630\ncontact@dxb.amassfreight.com",
    },
  },

  China: {
    "Shanghai – Head Office": {
      // Standard search embed for Dongdaming Rd address
      map:
        "https://www.google.com/maps/d/embed?mid=153sVA8hp7IyPrA_S6fvRb4xMGe7d85o&ehbc=2E312F&noprof=1",
      address:
        "21-22F, NO.1089, Dongdaming Road,\nHongkou, Shanghai, P.R.C.",
      phone: "+86 18121430682\nec@amassfreight.com",
    },
  },
};

/** Helpers to create/read a stable key per location */
const makeKey = (country: string, location: string) => `${country}::${location}`;

const LocationsSection: React.FC = () => {
  const { pathname } = useLocation();

  // Detect default country from URL (supports /saudi, /saudi-arabia, /china)
  const getCountryFromPath = (path: string): keyof LocationsData => {
    const p = path.toLowerCase();
    if (p.includes("/saudi-arabia") || p.includes("/saudi")) return "Saudi Arabia";
    if (p.includes("/china")) return "China";
    return "UAE";
  };

  // Flatten once for sidebar + selection
  const flatLocations = useMemo(() => {
    const rows: Array<{
      key: string;
      country: string;
      location: string;
      details: LocationDetails;
    }> = [];
    Object.entries(allLocations).forEach(([country, locations]) => {
      Object.entries(locations).forEach(([loc, details]) => {
        rows.push({ key: makeKey(country, loc), country, location: loc, details });
      });
    });
    return rows;
  }, []);

  // Initial selection based on route (first location of that country)
  const initialKey = useMemo(() => {
    const defaultCountry = getCountryFromPath(pathname);
    return (
      flatLocations.find((r) => r.country === defaultCountry)?.key ??
      flatLocations[0]?.key
    );
  }, [pathname, flatLocations]);

  const [selectedKey, setSelectedKey] = useState<string>(initialKey);

  useEffect(() => {
    setSelectedKey(initialKey);
  }, [initialKey]);

  const selected = useMemo(() => {
    return flatLocations.find((r) => r.key === selectedKey) ?? flatLocations[0];
  }, [selectedKey, flatLocations]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Office Locations</h2>
        <p className="text-sm text-gray-600">
          Select a location to view the address, contact details, and map.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar: all locations with a country badge */}
        <div className="w-full md:w-[30%] space-y-3">
          {flatLocations.map((row) => (
            <button
              key={row.key}
              className={`w-full text-left p-3 rounded border transition-all flex items-center justify-between ${
                selectedKey === row.key
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedKey(row.key)}
            >
              <span className="font-medium">{row.location}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  selectedKey === row.key ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                {row.country}
              </span>
            </button>
          ))}
        </div>

        {/* Details + Map */}
        <div className="w-full md:w-[70%] space-y-4">
          <div className="bg-slate-100 p-4 rounded border shadow">
            <h3 className="text-xl font-bold mb-2">
              Address — {selected.location} • {selected.country}
            </h3>
            <p className="whitespace-pre-line mb-2">{selected.details.address}</p>
            <h3 className="text-xl font-bold mb-2">Phone / Email</h3>
            <p className="whitespace-pre-line">{selected.details.phone}</p>
          </div>

          <div className="relative rounded-lg overflow-hidden h-[400px] shadow-lg">
            <div className="absolute top-0 left-0 w-full text-white text-center py-2 bg-red-600 font-semibold z-10">
              {selected.location} — {selected.country}
            </div>
            <iframe
              src={selected.details.map}
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`${selected.location} — ${selected.country} Map`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
