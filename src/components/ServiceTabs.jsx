const ServiceTabs = ({ selectedService, onSelect }) => {
    const services = ["EC2", "RDS", "ASG"];
  
    return (
      <div className="flex gap-4 mb-6">
        {services.map((service) => {
          const isActive = selectedService === service;
          return (
            <button
              key={service}
              onClick={() => onSelect(service)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
                }
              `}
            >
              {service}
            </button>
          );
        })}
      </div>
    );
  };
  
  export default ServiceTabs;
  