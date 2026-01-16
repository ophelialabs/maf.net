/**
 * Cloud Service Visualization Component
 * 
 * Displays services for a selected cloud provider in a grid layout
 */

import React from "react";
import {
  CloudProvider,
  ServiceCategory,
  getServicesForProvider,
  getCategoryColor,
  cloudProviders,
} from "./cloud-maps";

interface CloudServiceMapProps {
  provider: CloudProvider;
  onServiceSelect?: (service: string, category: ServiceCategory) => void;
}

export const CloudServiceMap: React.FC<CloudServiceMapProps> = ({
  provider,
  onServiceSelect,
}) => {
  const services = getServicesForProvider(provider);
  const providerInfo = cloudProviders.find((p) => p.id === provider);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="text-5xl mb-4">{providerInfo?.icon}</div>
        <h1 className="text-4xl font-bold mb-2">{providerInfo?.name}</h1>
        <p className="text-gray-600">
          {Object.keys(services).length} service categories
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {(Object.entries(services) as Array<[ServiceCategory, string[]]>).map(
          ([category, serviceList]) => (
            <div
              key={category}
              className="border-2 rounded-lg p-6 hover:shadow-lg transition-shadow"
              style={{ borderColor: getCategoryColor(category) }}
            >
              <div
                className="text-xl font-bold mb-4 capitalize"
                style={{ color: getCategoryColor(category) }}
              >
                {category.replace("-", " ")}
              </div>
              <div className="space-y-2">
                {serviceList.map((service) => (
                  <div
                    key={service}
                    onClick={() => onServiceSelect?.(service, category)}
                    className="p-2 rounded text-sm cursor-pointer transition-all hover:opacity-80"
                    style={{
                      backgroundColor: getCategoryColor(category) + "20",
                    }}
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
