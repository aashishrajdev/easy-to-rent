import React from 'react';
import { Search, MessageCircle, CheckCircle, Home, Shield, Users, Clock, MapPin, DollarSign } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  // Step data for the main process
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Search & Filter",
      description: "Use filters to find PGs by location, budget, amenities, and preferences near Chandigarh University.",
      details: [
        "Filter by area (Gharuan, nearby sectors)",
        "Set your budget range",
        "Choose amenities (Wi-Fi, food, AC)",
        "Compare options easily"
      ]
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Connect Directly",
      description: "Contact PG owners directly via call or WhatsApp for instant communication.",
      details: [
        "Direct owner contact - no brokers",
        "Instant WhatsApp connection",
        "Schedule visits within hours",
        "Quick response guaranteed"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      title: "Book with Confidence",
      description: "Visit, verify, and book with our support and transparent pricing.",
      details: [
        "In-person property visit",
        "Verify amenities and safety",
        "No hidden charges",
        "Secure rental agreement"
      ]
    }
  ];

  // Why choose us features
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Verified Listings",
      description: "Every PG is personally verified for safety, amenities, and compliance with our quality standards."
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Trusted by Students",
      description: "Join thousands of students who've found their perfect home through real reviews and experiences."
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Quick Responses",
      description: "Get instant responses from PG owners and schedule visits within hours of inquiry."
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: "Prime Locations",
      description: "Carefully curated listings near Chandigarh University, metro stations, and commercial hubs."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: "Best Price Guarantee",
      description: "We ensure competitive pricing with no hidden charges and transparent rental agreements."
    },
    {
      icon: <Home className="w-6 h-6 text-indigo-600" />,
      title: "Safe & Secure",
      description: "All listed PGs undergo thorough background checks with verified owners and proper documentation."
    }
  ];

  // Statistics
  const stats = [
    { value: "500+", label: "Verified PGs" },
    { value: "10K+", label: "Happy Students" },
    { value: "50+", label: "Locations" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Find Your Perfect Home Away From Home
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Discover verified PG accommodations near Chandigarh University campus. 
            Safe, affordable, and just a walk away from your classes.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-blue-200 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Main Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We simplify your search for the perfect PG with verified listings, 
            transparent pricing, and a seamless booking experience.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gray-200" />
                )}
                
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Us</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Your trusted partner in finding the perfect PG accommodation
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Spotlight */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Coverage</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            PG Locations Across Campus - Find accommodation in all popular student areas near Chandigarh University
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Chandigarh University</h3>
            <p className="text-blue-700">Gharuan, Punjab</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-blue-700 shadow-sm">
                🏠 Walking distance
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-green-700 shadow-sm">
                🚌 Easy commute
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-purple-700 shadow-sm">
                🛍️ Nearby amenities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect PG?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of happy students who found their home through EasytoRent
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Search Verified PGs Near CU
          </button>
          <p className="text-blue-200 mt-4 text-sm">
            Zero brokerage · Verified listings · Direct owner contact
          </p>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            "This platform saved me a lot of time while searching for rentals. 
            The filters, listings, and clear information made the entire experience smooth and stress free."
          </p>
          <p className="font-semibold mt-4">— Sneha Patel</p>
          <div className="mt-6">
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Read more student reviews →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;