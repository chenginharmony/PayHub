"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                PayHub
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {/* Product Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('product')}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition"
                >
                  <span>Product</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'product' && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 mt-1">
                    <a href="#features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Features</a>
                    <a href="#integrations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Integrations</a>
                    <a href="#pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pricing</a>
                    <a href="#testimonials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Testimonials</a>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('solutions')}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition"
                >
                  <span>Solutions</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 mt-1">
                    <a href="#freelancers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">For Freelancers</a>
                    <a href="#agencies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">For Agencies</a>
                    <a href="#enterprise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Enterprise</a>
                  </div>
                )}
              </div>

              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">
                Pricing
              </a>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('resources')}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition"
                >
                  <span>Resources</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 mt-1">
                    <a href="#blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Blog</a>
                    <a href="#guides" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Guides</a>
                    <a href="#help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Help Center</a>
                  </div>
                )}
              </div>

              <button
                onClick={() => router.push("/signin")}
                className="text-gray-600 font-medium hover:text-gray-900 transition"
              >
                Sign in
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
              >
                Start Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Background decorations */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/40 to-violet-100/40 rounded-full blur-3xl"></div>
              <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-violet-100/40 to-blue-100/40 rounded-full blur-3xl"></div>
            </div>

            <div className="relative lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="relative animate-fade-in">
                  <div className="inline-block">
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-50 to-violet-50 text-blue-600 ring-1 ring-inset ring-blue-500/20 mb-6">
                      <svg className="mr-1.5 h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm1-4h-2V8h2v6z"/>
                      </svg>
                      New: Instant Global Payouts
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                    <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                      Get paid faster,
                    </span>
                    <br />
                    <span className="text-gray-900">
                      work smarter.
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                    The all-in-one platform that helps freelancers and agencies manage projects, 
                    handle payments, and scale their business globally.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                    <button
                      onClick={() => router.push("/signup")}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Start Free Trial
                    </button>
                    <button
                      onClick={() => router.push("/demo")}
                      className="px-8 py-4 bg-white text-gray-600 text-lg font-semibold rounded-full border border-gray-200 hover:border-gray-300 hover:text-gray-900 transform hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg"
                    >
                      View Demo →
                    </button>
                  </div>
                  <div className="pt-10 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-500 mb-4">
                      TRUSTED BY INNOVATIVE TEAMS
                    </p>
                    <div className="grid grid-cols-4 gap-12 items-center opacity-70">
                      <Image
                        src="/images/company1.svg"
                        alt="Company 1"
                        width={120}
                        height={40}
                        className="opacity-60"
                      />
                      <Image
                        src="/images/company2.svg"
                        alt="Company 2"
                        width={120}
                        height={40}
                        className="opacity-60"
                      />
                      <Image
                        src="/images/company3.svg"
                        alt="Company 3"
                        width={120}
                        height={40}
                        className="opacity-60"
                      />
                      <Image
                        src="/images/company4.svg"
                        alt="Company 4"
                        width={120}
                        height={40}
                        className="opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[20px] blur-md opacity-20"></div>
                  <div className="relative bg-white rounded-[20px] border border-gray-200 shadow-2xl overflow-hidden">
                    <Image
                      src="/dashboard-preview.png"
                      alt="Dashboard Preview"
                      width={800}
                      height={600}
                      className="rounded-[20px]"
                    />
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -right-8 top-1/4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Payment Received</p>
                        <p className="text-xs text-gray-500">$2,400.00 USD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "2M+",
                label: "Global Transactions",
                desc: "Processed securely every month"
              },
              {
                stat: "99.9%",
                label: "Uptime Guarantee",
                desc: "For uninterrupted business flow"
              },
              {
                stat: "150+",
                label: "Countries Supported",
                desc: "With instant payment processing"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-violet-600/50 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
                    {item.stat}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {item.label}
                  </div>
                  <div className="text-gray-600">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Every tool you need
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you manage every aspect of your freelance business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "/file.svg",
                title: "Smart Project Management",
                description: "Automated workflows and milestone tracking that keeps you focused on delivery.",
                gradient: "from-blue-600 to-violet-600"
              },
              {
                icon: "/globe.svg",
                title: "Client Collaboration",
                description: "Beautiful client portals with real-time updates and feedback systems.",
                gradient: "from-violet-600 to-indigo-600"
              },
              {
                icon: "/window.svg",
                title: "Global Payments",
                description: "Accept payments in 150+ currencies with enterprise-grade security.",
                gradient: "from-indigo-600 to-blue-600"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 relative`}>
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain p-1 brightness-0 invert"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect with your favorite tools and streamline your workflow
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center justify-center p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={`/images/integration${index + 1}.svg`}
                    alt={`Integration ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Loved by freelancers
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "PayHub has transformed how I handle my freelance business. The automated payments and project tracking save me hours every week.",
                author: "Sarah Johnson",
                role: "UI/UX Designer",
                avatar: "/images/avatar1.jpg"
              },
              {
                quote: "The client collaboration features are fantastic. My clients love the professional interface and how easy it is to work together.",
                author: "Mark Thompson",
                role: "Web Developer",
                avatar: "/images/avatar2.jpg"
              },
              {
                quote: "Being able to accept payments in multiple currencies has helped me expand my business globally. The process is seamless.",
                author: "Lisa Chen",
                role: "Content Strategist",
                avatar: "/images/avatar3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for getting started",
                features: [
                  "5 active projects",
                  "Basic project management",
                  "Client portal",
                  "Payment processing",
                ]
              },
              {
                name: "Professional",
                price: "$29",
                description: "Best for growing freelancers",
                features: [
                  "Unlimited projects",
                  "Advanced project management",
                  "Custom client portal",
                  "Priority support",
                  "API access",
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large teams and agencies",
                features: [
                  "Everything in Professional",
                  "Custom integrations",
                  "Dedicated account manager",
                  "Custom contracts",
                  "24/7 phone support",
                ]
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white p-8 rounded-2xl border ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'} hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</div>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-600 ml-2">/month</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push("/signup")}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Join thousands of successful freelancers who've scaled their business with PayHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/signup")}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-blue-600 transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-600 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">API</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Terms</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">© 2025 PayHub. All rights reserved.</div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
