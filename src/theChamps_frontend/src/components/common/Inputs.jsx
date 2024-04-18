import { Country } from "country-state-city";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import "intl-tel-input/build/js/utils.js";
import { useEffect, useRef } from "react";
// Common Input
const Input = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="inputbox mt-1 px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:border-indigo-500 block w-full shadow-sm bg-transparent"
      />
    </div>
  );
};

const TelInput = ({ setPhone, phoneNumber }) => {
  const phoneInputRef = useRef(null);
  // Reference : https://github.com/jackocnr/intl-tel-input
  useEffect(() => {
    const iti = intlTelInput(phoneInputRef.current, {
      showSelectedDialCode: true,
      countrySearch: false,
      // Set Country base on Location ip address : reference : https://github.com/jackocnr/intl-tel-input > geoLookup
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            callback(data.country_code);
          })
          .catch(function () {
            callback();
          });
      },
    });
    // Set Country initially according to need
    // setPhone From main Component
    if (setPhone) {
      setPhone(iti);
    }
    if (phoneNumber !== undefined) {
      iti.setNumber(phoneNumber);
    }

    return () => {
      iti.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <label className=" w-full font-medium  uppercase text-xs">
        Phone Number
      </label>
      <input type="tel" id="phone" ref={phoneInputRef} />
    </div>
  );
};
const CountryInput = ({ value, onChange }) => {
  const countries = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: `${country.name} - ${country.isoCode}`,
  }));

  const handleCountryChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Country or region
      </label>
      <select
        value={value}
        onChange={handleCountryChange}
        name="country"
        className="mt-1 block w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-transparent"
      >
        <option value="">Please select...</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Input, CountryInput, TelInput };
