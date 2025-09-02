import React, { useState } from 'react';
import { Check, X, Star, Users, Zap, Building2, CheckCircle } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

interface PricingTier {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  period: string;
  status: 'Active' | 'Inactive';
  icon: React.ElementType;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  isEnterprise?: boolean;
}

interface Feature {
  name: string;
  free: boolean;
  basic: boolean;
  premium: boolean;
  enterprise: boolean;
}

const pricingTiers: PricingTier[] = [
    {
    name: 'Free',
    monthlyPrice: 'Rs.0',
    yearlyPrice: 'Rs.0',
    period: '/month',
    status: 'Active',
    icon: Users,
    description: 'Perfect for getting started with AI creativity',
    features: [
      // 'Credits per month:1300',
      // 'Number of Images:130',
      'Retexturing',
      'Image angling',
      'Image to video',
      'Standard quality output',
      'Community support',
    ],
    buttonText: 'Choose Free'
  }
  ,
  
  {
    name: 'Basic',
    monthlyPrice: 'Rs.1,149',
    yearlyPrice: 'Rs.833',
    period: '/month',
    status: 'Active',
    icon: Users,
    description: 'Perfect for getting started with AI creativity',
    features: [

      'Credits per month:1300',
      'Number of Images:130',
      'Retexturing',
      'Image angling',
      'Image to video',
      'High quality output',
      'Community support',
     
    ],
    buttonText: 'Choose Basic'
  },
  {
    name: 'Premium',
    monthlyPrice: 'Rs.4,249',
    yearlyPrice: 'Rs.3333',
    period: '/month',
    status: 'Active',
    icon: Zap,
    
    description: 'Great for individual creators and small projects',
    highlighted: true, 
    features: [
      'Credits per month:6500',
      'Number of Images:650',
      'Retexturing',
      'Image angling',
      'Image to video',
      'Generative image and video editing',
      'HD quality output',
      'Community support',
    ],
    buttonText: 'Choose Premium'
  },
  // {
  //   name: 'Top-Up(Subscribers)',
  //   monthlyPrice: '$0.15 or Rs 13',
  //   yearlyPrice: 'NA',
  //   period: '/month',
  //   status: 'Active',
  //   icon: Zap,
  //   description: 'Great for individual creators and small projects',
  //   features: [
  //     'Credits per month:10',
  //     'Number of Images:1',
  //     'Standard quality output',
  //     'Community support',
  //     '720p video export',
  //     'Cost per credit monthly:$0.02 or Rs.1.30',
  //     'Cost per credit yearly:NA'
  //   ],
  //   buttonText: 'Choose Top-up(Subscribers)',
  //   highlighted: true
  // },
  // {
  //   name: 'Top-Up(Non Subscribers)',
  //   monthlyPrice: '$0.20 or Rs 17',
  //   yearlyPrice: 'NA',
  //   period: '/month',
  //   status: 'Active',
  //   icon: Zap,
  //   description: 'Great for individual creators and small projects',
  //   features: [
  //     'Credits per month:10',
  //     'Number of Images:1',
  //     'Standard quality output',
  //     'Community support',
  //     '720p video export',
  //     'Cost per credit monthly:$0.02 or Rs.1.70',
  //     'Cost per credit yearly:NA'
  //   ],
  //   buttonText: 'Choose Top-up(Non Subscribers)',
  // },
  {
    name: 'Enterprise',
    monthlyPrice: 'Customisable',
    yearlyPrice: 'Customisable',
    status: 'Active',
    period: '',
    icon: Building2,
    description: 'Custom solutions for large organizations',
    features: [
      'Unlimited conversions',
    'Unlimited quality output',
      'Retexturing',
      'Image angling',
      'Image to video',
      'Advanced security features',
      'Priority support',
      'Custom AI models',
      'Generative image and video editing'
    ],
    buttonText: 'Contact Us',
    isEnterprise: true
  }
];




const comparisonFeatures: Feature[] = [
  { name: 'Image to Video Conversions', free: true, basic: true, premium: true, enterprise: true },
  { name: 'Image Retexturing', free: true, basic: true,premium: true, enterprise: true },
  { name: 'HD Quality Output', free: false, basic: true,  premium: true, enterprise: true },
  { name: 'Generative Image and Video Editing', free: false, basic: false, premium: true, enterprise: true },
  { name: 'Image to Video', free: false, basic: false, premium: true, enterprise: true },
  {name:'Community Support', free: true, basic: true, premium: true, enterprise: true },
  {name:'Priority email support', free: false, basic: false, premium: true, enterprise: true },
  { name: 'Image Angling', free: false, basic: true,  premium: true, enterprise: true },
  { name: 'Custom AI Models', free: false, basic: false, premium: true, enterprise: true }

];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote: 'LoversAI transformed my content creation process. The image to video feature is absolutely magical!'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Marketing Director',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote: 'The content restructuring tool saved us hundreds of hours. Our engagement rates increased by 300%.'
  },
  {
    name: 'Emily Watson',
    role: 'Digital Artist',
    rating: 4,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote: 'Professional quality output with incredible ease of use. The style transfer feature is game-changing.'
  },
  {
    name: 'David Park',
    role: 'Video Producer',
    rating: 5,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote: 'From concept to final video in minutes. LoversAI is the future of content creation.'
  }
];

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState(0);

  React.useEffect(() => {
    // Check if payment was successful
    const paymentSuccessful = localStorage.getItem('paymentSuccess');
    const plan = localStorage.getItem('selectedPlan');
    const credits = localStorage.getItem('creditsRemaining');
    
    if (paymentSuccessful === 'true' && plan) {
      setPaymentSuccess(true);
      setSelectedPlan(plan);
      setCreditsRemaining(parseInt(credits || '0'));
    }
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handlePlanSelect = (planName: string, isEnterprise?: boolean) => {
    if (isEnterprise) {
      onNavigate('contact');
    } else if (planName === 'Free') {
      setSelectedPlan(planName);
      localStorage.setItem('selectedPlan', planName);
      localStorage.setItem('paymentSuccess', 'true');
      localStorage.setItem('creditsRemaining', '0');
      setPaymentSuccess(true);
      setCreditsRemaining(0);
    } else {
      window.location.href = `?plan=${planName}`;
      onNavigate('payment');
    }
  };

  const handleTopUpSelect = (type: 'subscriber' | 'nonsubscriber') => {
    const planName = type === 'subscriber' ? 'TopUp-Subscriber' : 'TopUp-NonSubscriber';
    window.location.href = `?plan=${planName}`;
    onNavigate('payment');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}Creative Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered content creation with plans designed for every creator, from hobbyists to enterprises.
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white p-1 rounded-full shadow-lg border border-gray-200">
              <div className="flex items-center">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    !isYearly
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isYearly
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Save Bonanza%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                  tier.highlighted ? 'ring-2 ring-purple-500 scale-105' : ''
                } ${tier.status === 'Inactive' ? 'opacity-75' : ''}`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {tier.name === 'Enterprise' && (
  <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
    Save a lot 💰
  </span>
)}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-xl ${tier.highlighted ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-100'}`}>
                        <tier.icon className={`w-6 h-6 ${tier.highlighted ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                      </span>
                      <span className="text-gray-600">{tier.period}</span>
                      {isYearly && tier.name !== 'Free' && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {Math.round((1 - parseInt(tier.yearlyPrice.replace(/[^0-9]/g, '')) /
        (parseInt(tier.monthlyPrice.replace(/[^0-9]/g, '')) * 12)) *
      100
    )}%
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tier.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tier.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <button 
                      onClick={() => handlePlanSelect(tier.name, tier.isEnterprise)}
                      className={`w-full min-h-[48px] py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2
                        ${selectedPlan === tier.name && paymentSuccess
                          ? 'bg-green-600 text-white'
                          : tier.highlighted
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                          : tier.status === 'Inactive'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                        }`}
                      disabled={tier.status === 'Inactive'}
                    >
                      {selectedPlan === tier.name && paymentSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Active</span>
                        </>
                      ) : (
                        <span>{tier.buttonText}</span>
                      )}
                    </button>
                    
                    {selectedPlan === tier.name && paymentSuccess && (
                      <div className="mt-3 text-center">
                        <p className="text-sm text-green-600 font-medium">
                          Credits Remaining: {creditsRemaining}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Top-Up Pricing Table */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Top-Up Pricing
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-900">Features</th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-900">Subscribers</th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-900">Non-Subscribers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6">Credits per top-up</td>
                  <td className="text-center">10</td>
                  <td className="text-center">10</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Cost per credit</td>
                  <td className="text-center">₹1.30</td>
                  <td className="text-center">₹1.70</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Top-up price</td>
                  <td className="text-center">₹13</td>
                  <td className="text-center">₹17</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Quality</td>
                  <td className="text-center">Standard</td>
                  <td className="text-center">Standard</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Top-Up Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Subscribers</h3>
              <p className="text-gray-600 mb-4">Get additional credits at a discounted rate</p>
              <button
                onClick={() => handleTopUpSelect('subscriber')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Buy Top-Up - ₹13
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Non-Subscribers</h3>
              <p className="text-gray-600 mb-4">Purchase additional credits without a subscription</p>
              <button
                onClick={() => handleTopUpSelect('nonsubscriber')}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition-all duration-200"
              >
                Buy Top-Up - ₹17
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Compare all features across our pricing tiers
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Basic</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Premium</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6 font-medium text-gray-900">{feature.name}</td>
                      <td className="text-center py-4 px-6">
                        {feature.free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {feature.basic ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                     
                      <td className="text-center py-4 px-6">
                        {feature.premium ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {feature.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Creators Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied creators transforming their content with LoversAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <blockquote className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>

          {/* Overall Rating */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-gray-900 font-semibold">4.9/5</span>
              <span className="text-gray-600">from 2,847+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of creators already using LoversAI to bring their visions to life.
          </p>
          <button 
            onClick={() => onNavigate('home')}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Creating Today
          </button>
        </div>
      </section>
    </div>
  );
}