import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { features, Feature } from '@/data/homeData';

export const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Modern Healthcare
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed by healthcare professionals for healthcare professionals. 
            Every feature is built to save time, reduce errors, and improve patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((feature: Feature, index: number) => (
            <div
              key={feature.title}
              className="relative group"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <Card 
                className={`
                  p-8 h-full transition-all duration-500 cursor-pointer
                  ${activeFeature === index 
                    ? 'transform scale-105 shadow-2xl border-blue-200' 
                    : 'shadow-lg hover:shadow-xl'
                  }
                  border-2 hover:border-blue-100
                `}
              >
                {/* Gradient Icon Background */}
                <div 
                  className={`
                    w-20 h-20 rounded-2xl mb-6 flex items-center justify-center
                    bg-gradient-to-br ${feature.gradient} 
                    group-hover:scale-110 transition-transform duration-300
                    shadow-lg
                  `}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {feature.stats && (
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-blue-600">
                      {feature.stats}
                    </p>
                  </div>
                )}

                {/* Hover Effect Line */}
                <div 
                  className={`
                    absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient}
                    transition-all duration-300
                    ${activeFeature === index ? 'w-full' : 'w-0'}
                  `}
                ></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};