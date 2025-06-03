import React from "react";

const infoItems = [
  "Of breaches involve vulnerabilities for which patches were available",
  "Average days to identify a data breach",
  "Average cost of a data breach",
  "Of breaches are caused by human error",
];
  const dotColors = ["#0065AD", "#004C82", "#003A63", "#002B4A"];

const InfoItem = ({ text, index }) => {
  return (
    <div className="flex flex-col  text-center px-4 relative w-full h-full rounded-full  justify-between items-center">
      <div className="relative w-16 flex justify-center border-t border-t-blue-700">
        <div className="relative h-16 flex justify-center">
          <div className="w-px bg-blue-700 h-full" />
          <div
            className="w-4 h-4 rounded-full absolute -bottom-2"
            style={{ backgroundColor: dotColors[index % dotColors.length] }}
          />
        </div>
      </div>
      <p className="text-blue-900 mt-4 font-medium leading-relaxed">{text}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className="bg-[#f2f2f2] py-12 px-4 sm:px-6 lg:px-8 overflow-x-auto mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-[42px] font-semibold text-blue-900">Why Get Assessed?</h2>
      </div>

      <div className="p-4 h-full w-full   before:absolute before:content-[''] before:h-[200px] before:w-3xs before: before:left-0 before:rounded-full">
        <div className="bg-gradient-to-r from-[#0065AD] via-[#004C82] to-[#002B4A] h-[200px] w-full rounded-full py-[30px]">
          <div className="bg-white w-full h-full rounded-full flex justify-between items-center">
            {["60%", "280", "$4.2M", "95%"].map((value, index) => (
              <div key={index} className="relative">
                <div
                  className={`h-[200px] aspect-square border-[30px] rounded-full bg-[#F2F2F2] p-4 flex items-center justify-center`}
                  style={{
                    borderColor: ["#0065AD", "#004C82", "#003A63", "#002B4A"][index],
                  }}
                >
                  <div className="h-full aspect-square rounded-full bg-white  flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-900">{value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Circle Stats Section */}

      {/* Info items with vertical lines */}
      <div className="bg-gray-100 py-6">
        <div className="mx-auto flex  justify-between items-start gap-8">
          {infoItems.map((text, index) => (
            <InfoItem key={index} text={text} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
