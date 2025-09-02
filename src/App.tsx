import { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PricingPage from './components/PricingPage';
import ContactPage from './components/ContactPage';
import PaymentPage from './components/PaymentPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'pricing' && <PricingPage onNavigate={handleNavigate} />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'payment' && <PaymentPage onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;