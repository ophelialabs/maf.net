/**
 * Cloud Provider Selector Component
 * 
 * Interactive selection interface for choosing a cloud provider
 */

import React from "react";
import { CloudProvider, cloudProviders } from "./cloud-maps";

interface CloudProviderSelectorProps {
  onSelect: (provider: CloudProvider) => void;
  selectedProvider?: CloudProvider;
}

export const CloudProviderSelector: React.FC<CloudProviderSelectorProps> = ({
  onSelect,
  selectedProvider,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          CloudScapeNet
        </h1>
        <p className="text-xl text-gray-300 mb-2">
          Unified Multi-Cloud Data Integration Platform
        </p>
        <p className="text-gray-400">
          Select your cloud provider to explore available services
        </p>
      </div>

      {/* Cloud Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {cloudProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSelect(provider.id)}
            className={`
              group relative overflow-hidden rounded-xl p-6 transition-all duration-300 transform
              ${
                selectedProvider === provider.id
                  ? "scale-105 shadow-2xl ring-2"
                  : "hover:scale-105 hover:shadow-xl"
              }
              bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10
              hover:border-opacity-30
            `}
            style={{
              borderColor: selectedProvider === provider.id ? provider.color : undefined,
              boxShadow:
                selectedProvider === provider.id
                  ? `0 0 30px ${provider.color}40`
                  : undefined,
            }}
          >
            {/* Animated background */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: provider.color }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-5xl mb-4">{provider.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">
                {provider.name}
              </h3>
              <div
                className="w-12 h-1 rounded-full mb-3 transition-all duration-300"
                style={{ backgroundColor: provider.color }}
              />
              <p className="text-sm text-gray-400 text-center">
                Explore services
              </p>
            </div>

            {/* Selection indicator */}
            {selectedProvider === provider.id && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: provider.color }}>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: provider.color }}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Quick Facts */}
      <div className="mt-16 max-w-4xl text-center">
        <h3 className="text-2xl font-bold text-white mb-6">
          CloudScapeNet Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-white bg-opacity-5 border border-white border-opacity-10">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="font-semibold text-white mb-2">AI-Powered</h4>
            <p className="text-sm text-gray-400">
              LangGraph autonomous tool selection
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white bg-opacity-5 border border-white border-opacity-10">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-white mb-2">Real-Time</h4>
            <p className="text-sm text-gray-400">
              Sub-second latency with OCI GoldenGate
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white bg-opacity-5 border border-white border-opacity-10">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-semibold text-white mb-2">Multi-Cloud</h4>
            <p className="text-sm text-gray-400">
              Unified integration across all platforms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
