
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
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2!2d55.3!3d25.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE0JzA0LjAiTiA1NcKwMTcnNDguMCJF!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae",
      address: "202, Sultan Business Centre\nOud Metha, P.O. Box 33463\nDubai – UAE",
      phone: "+971 4 3575508\nFax: +971 4 2221794\ncontact@dxb.amassfreight.com",
    },
    "CFS": {
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7!2d55.1!3d25.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAyJzQ4LjAiTiA1NcKwMDYnMzYuMCJF!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae",
      address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
      phone: "+971 4 3400298\n+971 4 3575508\nFax: +971 4 8831004\ncontact@dxb.amassfreight.com",
    },
  },
  "Saudi Arabia": {
    "Dammam – Head Office": {
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.8!2d50.1!3d26.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI0JzM2LjAiTiA1MMKwMDYnMzYuMCJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa",
      address: "Rashidiya Business Center\nBuild No: 7257 Room 308, 3rd Floor – Al Amamrah\nDammam – 32415 – KSA",
      phone: "+966 13 849 8637\ncontact@dxb.amassfreight.com",
    },
    "Jeddah": {
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.3!2d39.2!3d21.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDMwJzAwLjAiTiAzOcKwMTInMDAuMCJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa",
      address: "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
      phone: "+966 12 578 0874\ncontact@dxb.amassfreight.com",
    },
  },
};

const LocationsSection: React.FC = () => {
  const { pathname } = useLocation();
  
  // Extract country from pathname
  const getCountryFromPath = (path: string): keyof LocationsData => {
    if (path.includes('/saudi-arabia')) return "Saudi Arabia";
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
            <p>{locations[selectedLocation].phone}</p>
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
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
