import React, { useState } from 'react'
import { analysis, bugicon, priority, security } from '../../assets/image';

function MyComponent() {
  const [hoveredCard, setHoveredCard] = useState("");
}
const features = [
  {
    id: 1,
    title: "Vulnerability identification",
    icon: bugicon,
    highlighted: true,
  },
  {
    id: 2,
    title: "Compliance gap analysis",
    icon: analysis,
    highlighted: false,
  },
  {
    id: 3,
    title: "Security control effectiveness review",
    icon: security,
    highlighted: false,
  },
  {
    id: 4,
    title: "Prioritized remediation recommendations",
    icon: priority,
    highlighted: false,
  },
];

const Service = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 my-[90px]">
      <div className="text-center mb-[60px]">
        <h2 className="mb-4 text-[#2D4B8B] text-[40px]">Get Your Free Cybersecurity Assessment</h2>
        <p className="text-md">
          Discover your organization’s security gaps with our comprehensive assessment. Our security experts will
          analyze your current posture and provide actionable recommendations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`relative flex gap-11 items-center p-6 rounded-lg transition-all duration-200 border-2 bg-gray-50 border-[#e5e5e5] hover:border-blue-700 hover:bg-white`}
            onMouseEnter={() => setHoveredCard(feature.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
              {/* Assuming your icons are images, render an img */}
              <img src={feature.icon} alt={feature.title} className="w-12 h-12" />
              {/* If icons are React components, render as <feature.icon /> */}
            </div>
            <div>
              <h3 className="text-[26px] text-gray-800">{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default Service;