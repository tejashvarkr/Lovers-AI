import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Shield, Check, Star } from 'lucide-react';

interface PaymentPageProps {
  onNavigate: (page: string) => void;
}

interface TierDetails {
  name: string;
  price: string;
  credits: number;
  features: string[];
  isTopUp?: boolean;
}

const tierDetails: Record<string, TierDetails> = {
  'Basic': {
    name: 'Basic Plan',
    price: 'Rs.1,149',
    credits: 1300,
    features: [
      '1300 Credits per month',
      '130 Images',
      'Retexturing',
      'Image angling',
      'Image to video',
      'High quality output',
      'Community support'
    ]
  },
  'Premium': {
    name: 'Premium Plan',
    price: 'Rs.4,249',
    credits: 6500,
    features: [
      '6500 Credits per month',
      '650 Images',
      'Retexturing',
      'Image angling',
      'Image to video',
      'Generative image and video editing',
      'HD quality output',
      'Priority support'
    ]
  },
  'TopUp-Subscriber': {
    name: 'Top-Up (Subscriber)',
    price: 'Rs.13',
    credits: 10,
    features: [
      '10 Additional credits',
      '1 Additional image',
      'Standard quality',
      'Instant activation'
    ],
    isTopUp: true
  },
  'TopUp-NonSubscriber': {
    name: 'Top-Up (Non-Subscriber)',
    price: 'Rs.17',
    credits: 10,
    features: [
      '10 Additional credits',
      '1 Additional image',
      'Standard quality',
      'Instant activation'
    ],
    isTopUp: true
  }
};

export default function PaymentPage({ onNavigate }: PaymentPageProps) {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    if (plan) {
      setSelectedTier(plan);
      // Set payment method based on tier type
      const tier = tierDetails[plan];
      if (tier?.isTopUp) {
        setPaymentMethod('upi');
      } else {
        setPaymentMethod('card');
      }
    }
  }, []);

  const currentTier = tierDetails[selectedTier];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.length <= 19) {
        setFormData({ ...formData, [name]: formatted });
      }
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formatted.length <= 5) {
        setFormData({ ...formData, [name]: formatted });
      }
      return;
    }
    
    // Limit CVV to 3 digits
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 3) {
        setFormData({ ...formData, [name]: formatted });
      }
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
    
    // Store payment success in localStorage
    localStorage.setItem('paymentSuccess', 'true');
    localStorage.setItem('selectedPlan', selectedTier);
    localStorage.setItem('creditsRemaining', currentTier?.credits.toString() || '0');
    
    // Redirect to pricing page after 3 seconds
    setTimeout(() => {
      onNavigate('pricing');
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your {currentTier?.name} has been activated successfully.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-purple-800">
              <strong>{currentTier?.credits} credits</strong> have been added to your account
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Redirecting to pricing page...
          </p>
        </div>
      </div>
    );
  }

  if (!currentTier) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Plan Selected</h2>
          <button
            onClick={() => onNavigate('pricing')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Choose a Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('pricing')}
            className="flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Pricing
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{currentTier.name}</h3>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-purple-600 mb-4">
                {currentTier.price}
                {!currentTier.isTopUp && <span className="text-lg text-gray-600">/month</span>}
              </div>
              
              <div className="space-y-3">
                {currentTier.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-purple-600">{currentTier.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
            
            {/* Payment Method Toggle */}
            {!currentTier.isTopUp && (
              <div className="mb-6">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-all duration-200 ${
                      paymentMethod === 'card'
                        ? 'bg-white shadow-sm text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Credit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-all duration-200 ${
                      paymentMethod === 'upi'
                        ? 'bg-white shadow-sm text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    UPI
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {paymentMethod === 'card' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      required
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter cardholder name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    required
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="yourname@paytm"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter your UPI ID (e.g., yourname@paytm, yourname@phonepe)
                  </p>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Secure Payment</p>
                  <p className="text-sm text-blue-600">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {paymentMethod === 'card' ? (
                      <CreditCard className="w-5 h-5" />
                    ) : (
                      <Smartphone className="w-5 h-5" />
                    )}
                    <span>Pay {currentTier.price}</span>
                  </>
                )}
              </button>
            </form>

            {/* Payment Methods */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center mb-4">We accept</p>
              <div className="flex justify-center space-x-4">
                <div className="bg-gray-100 px-3 py-2 rounded text-sm font-medium">Visa</div>
                <div className="bg-gray-100 px-3 py-2 rounded text-sm font-medium">Mastercard</div>
                <div className="bg-gray-100 px-3 py-2 rounded text-sm font-medium">UPI</div>
                <div className="bg-gray-100 px-3 py-2 rounded text-sm font-medium">PayTM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}