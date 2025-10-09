"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Calendar,
  Headphones,
  ArrowRight,
  Star,
  Zap,
  Shield,
} from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import DataPreview from "@/components/DataPreview";
import { UseCase } from "@samparka/playbooks";

const useCases = [
  {
    id: "SALES" as UseCase,
    name: "Sales Inquiry",
    description: "B2B SaaS lead collection",
    icon: MessageSquare,
    color: "bg-blue-500",
    features: [
      "Company size detection",
      "Budget qualification",
      "Urgency assessment",
      "Problem statement capture",
    ],
  },
  {
    id: "APPT" as UseCase,
    name: "Service Appointment",
    description: "Clinic/Studio booking",
    icon: Calendar,
    color: "bg-green-500",
    features: [
      "Availability checking",
      "Service type selection",
      "Timezone handling",
      "Location preferences",
    ],
  },
  {
    id: "SUPPORT" as UseCase,
    name: "Support Ticket",
    description: "Product issue reporting",
    icon: Headphones,
    color: "bg-orange-500",
    features: [
      "Severity classification",
      "Environment details",
      "Reproduction steps",
      "Auto-triage",
    ],
  },
];

export default function HomePage() {
  const [activeUseCase, setActiveUseCase] = useState<UseCase>("SALES");
  const [collectedData, setCollectedData] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = (data: any) => {
    setCollectedData(data);
    setIsComplete(true);
  };

  const resetDemo = () => {
    setCollectedData(null);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-6 text-center sm:text-left">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Samparka</h1>
              <p className="text-gray-600 mt-1">AI-Powered Contact Forms</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
              <a href="/inbox" className="btn-secondary w-full sm:w-auto text-sm sm:text-base">
                View Inbox
              </a>
              <a href="#embed" className="btn-primary w-full sm:w-auto text-sm sm:text-base">
                Get Embed Code
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Transform Your Contact Forms with AI
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Replace boring contact forms with conversational AI that collects
            the right information, validates data, and provides a delightful
            user experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Smart Data Collection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Better Conversion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Try Our AI Forms
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience three different use cases. Each form adapts to collect
              the right information for your specific needs.
            </p>
          </div>

          {/* Use Case Tabs */}
          <div className="flex mb-8 overflow-x-auto scroll-smooth">
            <div className="bg-white rounded-lg p-1 shadow-sm border flex space-x-1 sm:space-x-0 sm:w-fit sm:mx-auto">
              {useCases.map((useCase) => {
                const Icon = useCase.icon;
                return (
                  <button
                    key={useCase.id}
                    onClick={(e) => {
                      setActiveUseCase(useCase.id);
                      resetDemo();
                      e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center" });
                    }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors whitespace-nowrap ${
                      activeUseCase === useCase.id
                        ? "bg-primary-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{useCase.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <div className="h-96 lg:h-[600px]">
              <ChatInterface
                key={activeUseCase}
                useCase={activeUseCase}
                onComplete={handleComplete}
              />
            </div>

            {/* Data Preview */}
            <div className="h-96 lg:h-[600px]">
              <DataPreview data={collectedData} useCase={activeUseCase} />
            </div>
          </div>

          {/* Use Case Details */}
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 space-x-4">
                <div
                  className={`p-3 rounded-lg ${
                    useCases.find((uc) => uc.id === activeUseCase)?.color
                  } text-white`}
                >
                  {React.createElement(
                    useCases.find((uc) => uc.id === activeUseCase)?.icon ||
                      MessageSquare,
                    { className: "h-6 w-6" }
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {useCases.find((uc) => uc.id === activeUseCase)?.name}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {
                      useCases.find((uc) => uc.id === activeUseCase)
                        ?.description
                    }
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {useCases
                      .find((uc) => uc.id === activeUseCase)
                      ?.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AI Forms?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered forms provide a superior experience for both users
              and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Conversational
              </h4>
              <p className="text-gray-600">
                Natural dialogue that feels like talking to a helpful assistant,
                not filling out a form.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Validation
              </h4>
              <p className="text-gray-600">
                Real-time validation and intelligent follow-up questions ensure
                data quality.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Auto-Routing
              </h4>
              <p className="text-gray-600">
                Intelligent tagging and routing based on collected information
                and context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Contact Forms?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Get started with our embeddable widget and see the difference AI can
            make.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#embed"
              className="btn-primary bg-white text-gray-900 hover:bg-gray-100"
            >
              Get Embed Code
              <ArrowRight className="h-4 w-4 ml-2 inline" />
            </a>
            <a
              href="/inbox"
              className="btn-secondary bg-gray-700 text-white hover:bg-gray-600"
            >
              View Demo Data
            </a>
          </div>
        </div>
      </section>

      {/* Embed Section */}
      <section id="embed" className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Embed Samparka on Your Website
            </h2>
            <p className="text-lg text-gray-600">
              Add AI-powered contact forms to your website with just a few lines
              of code.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Step 1: Include the Widget Script
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`<script src="http://localhost:3001/widget/samparka-widget.js"></script>`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Step 2: Initialize the Widget
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`<script>
  const widget = new SamparkaWidget({
    apiUrl: 'http://localhost:3001',
    useCase: 'SALES', // or 'APPT', 'SUPPORT'
    source: 'your-website'
  });
</script>`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Available Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-lg p-4 mb-3">
                  <MessageSquare className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">SALES</h4>
                <p className="text-sm text-blue-700">
                  B2B SaaS lead collection and qualification
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-lg p-4 mb-3">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-green-900 mb-2">APPT</h4>
                <p className="text-sm text-green-700">
                  Service appointments and bookings
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-lg p-4 mb-3">
                  <Headphones className="h-8 w-8 text-orange-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-orange-900 mb-2">SUPPORT</h4>
                <p className="text-sm text-orange-700">
                  Technical support and issue reporting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center md:text-left" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:justify-self-start">
              <h3 className="text-lg font-semibold text-white mb-4">
                About Samparka
              </h3>
              <p className="text-gray-300 mb-4">
                Samparka AI is a product of{" "}
                <strong>Kritrim Baudhikata Anusandhan Kendra Nepal</strong>.
              </p>
              <p className="text-gray-300 mb-4">
                Advancing AI research and innovation in Nepal.
              </p>
              <div className="text-gray-300">
                <p>
                  <strong>Contact Us</strong>
                </p>
                <p>ekatabasti, budhanilakantha-09, kathmandu</p>
                <p>+852 63451395</p>
                <p>people@kribaat.com / kritirim.baudhikta@gmail.com</p>
                <p className="mt-2">
                  <a
                    href="https://kritrimbaudhikata.com/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Visit our website
                  </a>
                </p>
              </div>
            </div>
            <div className="md:justify-self-end">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="/inbox"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Admin Inbox
                  </a>
                </li>
                <li>
                  <a
                    href="#embed"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Embed Code
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:3001/health"
                    className="hover:text-blue-400 transition-colors"
                  >
                    API Health
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:5555"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Database Viewer
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Kritim Baudikata Anusandhan Kendra Nepal. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
