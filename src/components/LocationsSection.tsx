import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type LocationDetails = {
  map: string;
  address: string;
  phone: string;
};

type CountryLocations = {
  [location: string]: LocationDetails;
};

type LocationsData = {
  [country: string]: CountryLocations;
};

const allLocations: LocationsData = {
  UAE: {
    "Head Office": {
      // ✅ Updated to your My Maps embed
      map: "https://www.google.com/maps/d/embed?mid=1ZxPAULjAWy996Ko2I-INOx4KZVyxwz0&ehbc=2E312F&noprof=1",
      address: "202, Sultan Business Centre\nOud Metha, P.O. Box 33463\nDubai – UAE",
      phone: "+971 4 3575508\nFax: +971 4 2221794\ncontact@dxb.amassfreight.com",
    },
    "CFS": {
      // ✅ Updated to your My Maps embed
      map: "https://www.google.com/maps/d/embed?mid=12VFJg6YBwuqjx5QGoyFa4gN4o0N9zv0&ehbc=2E312F&noprof=1",
      address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
      phone: "+971 4 3400298\n+971 4 3575508\nFax: +971 4 8831004\ncontact@dxb.amassfreight.com",
    },
  },
  "Saudi Arabia": {
    "Dammam – Head Office": {
      // ✅ Updated to your My Maps embed
      map: "https://www.google.com/maps/d/embed?mid=1lYrRcHQxz2PNkKjLJFhvmkNOyMj-xKA&ehbc=2E312F&noprof=1",
      address: "Rashidiya Business Center\nBuild No: 7257 Room 308, 3rd Floor – Al Amamrah\nDammam – 32415 – KSA",
      phone: "+966 13 849 8637\ncontact@dxb.amassfreight.com",
    },
    "Jeddah": {
      // ✅ Updated to your My Maps embed
      map: "https://www.google.com/maps/d/embed?mid=1vrlsL0ACTChy50rWZCiqqYvfOvIqLdQ&ehbc=2E312F&noprof=1",
      address: "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
      phone: "+966 12 578 0874\ncontact@dxb.amassfreight.com",
    },
  },
};

const LocationsSection: React.FC = () => {
  const { pathname } = useLocation();

  // Detect country from URL (supports /saudi and /saudi-arabia)
  const getCountryFromPath = (path: string): keyof LocationsData => {
    const p = path.toLowerCase();
    if (p.includes("/saudi-arabia") || p.includes("/saudi")) return "Saudi Arabia";
    return "UAE";
  };

  const currentCountry = getCountryFromPath(pathname);
  const [selectedCountry, setSelectedCountry] = useState<keyof LocationsData>(currentCountry);
  const [selectedLocation, setSelectedLocation] = useState<keyof CountryLocations>(
    Object.keys(allLocations[currentCountry])[0]
  );

  useEffect(() => {
    const newCountry = getCountryFromPath(pathname);
    setSelectedCountry(newCountry);
    setSelectedLocation(Object.keys(allLocations[newCountry])[0]);
  }, [pathname]);

  const locations = allLocations[selectedCountry];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Office Locations</h2>

        {/* Country Selector */}
        <div className="text-center mb-4">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {Object.keys(allLocations).map((country) => (
              <button
                key={country}
                className={`px-4 py-2 rounded-md font-semibold transition-all ${
                  selectedCountry === country
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => {
                  setSelectedCountry(country as keyof LocationsData);
                  setSelectedLocation(Object.keys(allLocations[country as keyof LocationsData])[0]);
                }}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[30%] space-y-3">
          {Object.keys(locations).map((loc) => (
            <button
              key={loc}
              className={`w-full text-left p-3 rounded border transition-all ${
                selectedLocation === loc
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white border-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedLocation(loc as keyof CountryLocations)}
            >
              {loc}
            </button>
          ))}
        </div>

        <div className="w-full md:w-[70%] space-y-4">
          <div className="bg-slate-100 p-4 rounded border shadow">
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="whitespace-pre-line mb-2">
              {locations[selectedLocation].address}
            </p>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="whitespace-pre-line">{locations[selectedLocation].phone}</p>
          </div>

          <div className="relative rounded-lg overflow-hidden h-[400px] shadow-lg">
            <div className="absolute top-0 left-0 w-full text-white text-center py-2 bg-red-600 font-semibold z-10">
              {selectedLocation}
            </div>
            <iframe
              src={locations[selectedLocation].map}
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`${selectedLocation} Map`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
