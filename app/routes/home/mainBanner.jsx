import React from "react";
import { mastercard, pay, rupay, sliders, visa } from "../../assets/image";

const MainBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <img src={sliders} alt="Cyber Background" className="w-full h-full object-cover" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-end p-12">
        <div className="max-w-lg text-black">
          <h2 className="text-[42px] font-bold text-[#2D4B8B] mb-4">Total Protection</h2>
          <p className="mb-6">
            We offer a fully integrated approach to Cybersecurity for your business. Based on NIST CSF 2.0 standard, our
            comprehensive Cybersecurity services protect your organization using industry best practices.
          </p>

          <div className="relative mb-6 flex shadow-lg bg-white w-max border-[#333] border">
            <select className="appearance-none  text-gray-700 py-3 px-4 pr-8  rounded focus:outline-none">
              <option>Professional / Silver Package</option>
              <option>Premium / Gold Package</option>
            </select>
            <div className="pointer-events-none flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex items-center border-r">
              <span className="text-3xl font-bold">$699.00</span>
              <sup className="text-lg align-top mr-5">*</sup>
            </div>
            <div className="grid items-center mt-1 mb-1">
              <span className="line-through mr-2">$1199.00</span>
              <span className="text-red-500">Save $500.00</span>
            </div>
          </div>
          <p className="text-base mb-6">Introductory pricing for new customers</p>

          <button className=" bg-[#2D4B8B] hover:bg-blue-800 text-white font-bold py-3 px-12 rounded-full mb-6">
            Buy Now
          </button>

          <p className="text-sm mb-2">*Fees may apply. See offer details below:</p>
          <div className="flex gap-3 mb-6">
            {[
              { name: "VISA", src: visa },
              { name: "MC", src: mastercard },
              { name: "PayPal", src: pay },
              { name: "rupay", src: rupay },
            ].map((method) => (
              <div key={method.name} className="h-12 w-12 rounded flex items-center justify-center">
                <img src={method.src} alt={method.name} className="h-8 object-contain" />
              </div>
            ))}
          </div>

          <div className="border-t border-dashed pt-6 flex gap-4">
            <div className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              <span className="text-sm">
                30-day money <br />
                back guarantee
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              <span className="text-sm">
                Protect laptops,
                <br /> tablets, smartphones
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
