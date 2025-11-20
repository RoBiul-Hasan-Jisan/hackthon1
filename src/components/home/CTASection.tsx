import React from 'react';
import { Button } from '@/components/ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the healthcare revolution. Start your free 30-day trial today with no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="mt-8 text-blue-200 text-sm">
            <p>✅ No credit card required • ✅ Free 30-day trial • ✅ Setup in minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
};