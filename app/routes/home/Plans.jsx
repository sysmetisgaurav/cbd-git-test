import React from "react";

export const plans = [
  {
    title: "Starter / Bronze Package",
    price: "$19.00",
    features: [
      "External Footprint Scan",
      "Email Protection w/ AI",
      "Dark Web Monitoring",
      "Cloud Security Posture",
      "Secure Browsing",
      "Cloud SaaS Backup",
    ],
  },
  {
    title: "Professional / Silver Package",
    price: "$29.00",
    features: [
      "Endpoint Detection & Response",
      "Human Risk Management",
      "Identity & Access Management",
      "Email & Communications Security",
      "External Threat & Exposure Monitoring",
      "Cloud & SaaS Security",
    ],
  },
  {
    title: "Network",
    price: "$49.00",
    features: [
      "Network Threat Detection & Deception",
      "Exposure Management & Attack Surface Reduction",
      "Asset Discovery & Inventory Management",
      "Network Performance & Infrastructure Insights",
    ],
  },
  {
    title: "Custom / Compliance Packages",
    price: "$69.00",
    features: [
      "Mobile & Application Control",
      "Identity & Access Control Security",
      "Network & Endpoint Visibility",
      "Additional Solutions Based On Compliance Requirements",
    ],
  },
];

const Plans = () => {
  return (
    <div className="bg-white py-[90px] px-6 md:px-12">
      <h2 className="text-[40px] text-center text-blue-900 mb-10">Explore Plans</h2>

      <div className="space-y-8">
        {plans.map((plan, index) => (
          <div key={index} className="flex flex-col md:flex-row  justify-between gap-3 md:gap-8">
            <ul className="flex-1 list-disc list-inside bg-[#F2F2F2] rounded-2xl p-6 text-blue-900 font-medium text-sm space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <div className="w-full md:w-64 bg-[#2D4B8B] text-white rounded-2xl px-6 py-6 flex flex-col justify-center items-center">
              <p className="font-semibold text-center text-sm mb-2">{plan.title}</p>
              <button
                type="button"
                className="bg-white text-blue-900 font-semibold text-sm px-5 py-2 rounded-full hover:bg-gray-100 transition"
              >
                {plan.price} | Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
