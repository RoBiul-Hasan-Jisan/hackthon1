import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Types
interface Feature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  stats?: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features: Feature[] = [
    {
      title: 'Patient Management',
      description: 'Comprehensive patient records, medical history, and real-time health monitoring with AI-powered insights.',
      icon: '👥',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '10K+ Patients Managed'
    },
    {
      title: 'Appointment Scheduling',
      description: 'Smart scheduling with automated reminders, conflict detection, and telehealth integration.',
      icon: '📅',
      gradient: 'from-green-500 to-emerald-500',
      stats: '50K+ Appointments Monthly'
    },
    {
      title: 'Medical Records',
      description: 'Secure, HIPAA-compliant storage with advanced analytics and predictive health trends.',
      icon: '📋',
      gradient: 'from-purple-500 to-pink-500',
      stats: '99.9% Uptime'
    },
    {
      title: 'Doctor Portal',
      description: 'AI-assisted diagnostics, prescription management, and collaborative care coordination.',
      icon: '👨‍⚕️',
      gradient: 'from-orange-500 to-red-500',
      stats: '500+ Healthcare Partners'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer, City Hospital',
      content: 'MediCare Health transformed our practice. Patient wait times decreased by 40% and our team\'s efficiency improved dramatically.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Cardiologist, Heart Center',
      content: 'The AI-powered insights have helped us identify at-risk patients earlier. This platform is revolutionizing preventive care.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Emily Thompson',
      role: 'Practice Manager, Family Health',
      content: 'From scheduling to billing, everything is streamlined. Our administrative workload decreased by 60% since implementation.',
      avatar: '💼'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Patients Served' },
    { number: '500+', label: 'Healthcare Providers' },
    { number: '99.9%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading MediCare Health...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  MediCare Health
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Features', 'Testimonials', 'Pricing', 'About'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700">
              Trusted by 500+ Healthcare Providers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionizing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Healthcare
            </span>{' '}
            Management
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered platform that streamlines medical practice operations, 
            enhances patient care, and drives better health outcomes through intelligent technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Start Free Trial
              <span className="ml-2">🚀</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 hover:border-blue-300 transition-all duration-200"
            >
              <span className="mr-2">▶️</span>
              Watch Demo
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            {features.map((feature, index) => (
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

      {/* Testimonials Section */}
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

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                MediCare Health
              </h3>
              <p className="text-gray-400">
                Revolutionizing healthcare management through intelligent technology and AI-powered solutions.
              </p>
            </div>
            
            {['Product', 'Company', 'Resources', 'Support'].map((section) => (
              <div key={section}>
                <h4 className="font-semibold text-lg mb-4">{section}</h4>
                <ul className="space-y-2 text-gray-400">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-white transition-colors">
                        {section} Link {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediCare Health. All rights reserved. Built with ❤️ for better healthcare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;