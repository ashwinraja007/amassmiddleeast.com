
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
  Singapore: {
    Singapore: {
      map: "https://www.google.com/maps/d/u/0/embed?mid=1U_72YwJ_4E6SQSrx2E6eWegoUTQesgo&ehbc=2E312F&noprof=1",
      address: "Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore 099447",
      phone: "+65 6224 1338 / +65 6224 1336",
    },
  },
  "Sri Lanka": {
    Colombo: {
      map: "https://www.google.com/maps/d/u/0/embed?mid=1Nt9tx3aLmBNO-Sf6oJxm3WxfmbDIF0I&ehbc=2E312F&noprof=1",
      address: "Ceylinco House, 9th Floor, No. 69, Janadhipathi Mawatha, Colombo 01, Sri Lanka",
      phone: "+94 114477499 / +94 114477494",
    },
  },
  Myanmar: {
    Yangon: {
      map: "https://www.google.com/maps/d/u/0/embed?mid=1S0BF3WzohAIQGBr9w6ryuexAnYj8AVc&ehbc=2E312F&noprof=1",
      address: "No.608, Room 8B, Bo Soon Pat Tower, Merchant Street, Pabedan Township, Yangon, Myanmar",
      phone: "+951 243158 / +951 377985",
    },
  },
  Bangladesh: {
    Dhaka: {
      map: "https://www.google.com/maps/d/u/0/embed?mid=1X0GsrCFJRFoj6Q67PJztKAAzkDlKkXY&ehbc=2E312F&noprof=1",
      address: "ID #9-N (New), 9-M(Old-N), 9th floor, Tower 1, Police Plaza Concord No.2, Road # 144, Gulshan Model Town, Dhaka 1215, Bangladesh",
      phone: "+880 1716 620989",
    },
  },
  Pakistan: {
    Karachi: {
      map: "https://www.google.com/maps/d/u/0/embed?mid=1reXoq38Nt5GKCCpv-f_cb1UwG-Ko30o&ehbc=2E312F&noprof=1",
      address: "Suite No.301, 3rd Floor, Fortune Center, Shahrah-e-Faisal, Block 6, PECHS, Karachi, Pakistan",
      phone: "+92-300-8282511 / +92-21-34302281-5",
    },
    Lahore: {
      map: "https://www.google.com/maps/d/u/0/embed?mid=1ObHyVRDeNaWR7qOyMHKqqvqWbqjsCVk&ehbc=2E312F&noprof=1",
      address: "Office # 301, 3rd Floor, Gulberg Arcade Main Market, Gulberg 2, Lahore, Pakistan",
      phone: "+92 42-35782306/07/08",
    },
  },
};

const LocationsSection: React.FC = () => {
  const { pathname } = useLocation();
  
  // Extract country from pathname
  const getCountryFromPath = (path: string): keyof LocationsData => {
    if (path.includes('/sri-lanka')) return "Sri Lanka";
    if (path.includes('/myanmar')) return "Myanmar";
    if (path.includes('/bangladesh')) return "Bangladesh";
    if (path.includes('/pakistan')) return "Pakistan";
    return "Singapore";
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
        <div className="text-center text-xl font-semibold py-2 px-4 bg-red-600 text-white rounded inline-block">
          {selectedCountry}
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
