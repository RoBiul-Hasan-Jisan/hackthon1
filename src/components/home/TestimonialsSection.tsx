import React, { useState, useEffect } from 'react';
import { testimonials } from '@/data/homeData';

export const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Healthcare Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of medical professionals who have transformed their practice with MediCare Health.
          </p>
        </div>

        <div className="relative bg-gray-800 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                {testimonials[currentTestimonial].avatar}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <blockquote className="text-xl md:text-2xl leading-relaxed mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div>
                <p className="font-semibold text-lg">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-cyan-200">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-cyan-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Quote Icon */}
          <div className="absolute top-4 right-4 text-6xl text-cyan-400/20">
            "
          </div>
        </div>
      </div>
    </section>
  );
};