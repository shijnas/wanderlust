import React, { useState } from 'react';
import { X, CreditCard, ChevronRight, CheckCircle, Ticket, User, ShieldCheck } from 'lucide-react';
import './CheckoutModal.css';

export default function CheckoutModal({ item, onClose, onBookingSuccess, currencySymbol, currencyFactor }) {
  const [step, setStep] = useState(1);
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  
  // Payment card states
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!item) return null;

  const numericPrice = parseFloat(item.price.replace(/,/g, ''));
  const convertedPrice = Math.round(numericPrice * currencyFactor);
  const formattedPrice = `${currencySymbol}${convertedPrice.toLocaleString()}`;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!travelerName || !travelerEmail) {
        alert('Please fill out the traveler details.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!cardNumber || !cardHolder || !cardExpiry) {
        alert('Please fill out the card details.');
        return;
      }
      // Process simulated payment success
      setStep(3);
      const bookingCode = 'WL' + Math.floor(100000 + Math.random() * 900000);
      onBookingSuccess({
        id: Math.random(),
        title: item.name,
        type: item.type || 'Booking',
        price: formattedPrice,
        image: item.image,
        code: bookingCode,
        traveler: travelerName,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="checkout-modal glass-panel fade-in-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        {step !== 3 && (
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        )}

        {/* Steps Indicator */}
        <div className="checkout-steps-bar">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-connector" />
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="step-connector" />
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* Form Body */}
        <div className="checkout-content">
          
          {step === 1 && (
            <form onSubmit={handleNextStep} className="checkout-step-form">
              <h3 className="checkout-title">Traveler Details</h3>
              
              <div className="checkout-summary-box glass-panel">
                <img src={item.image} alt={item.name} className="summary-img" />
                <div className="summary-details">
                  <h4>{item.name}</h4>
                  <span>{item.type} Selection</span>
                  <p className="summary-price">{formattedPrice}</p>
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <div className="form-input-container">
                  <User size={16} className="form-input-icon" />
                  <input 
                    type="text" 
                    placeholder="Ezio Auditore" 
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="form-input-container">
                  <input 
                    type="email" 
                    placeholder="ezio@wanderlust.com" 
                    value={travelerEmail}
                    onChange={(e) => setTravelerEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Passport Number (Optional)</label>
                <div className="form-input-container">
                  <input 
                    type="text" 
                    placeholder="N01234567" 
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full checkout-action-btn">
                <span>Continue to Payment</span>
                <ChevronRight size={16} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="checkout-step-form">
              <h3 className="checkout-title">Secure Checkout</h3>

              {/* Interactive Credit Card Widget */}
              <div className="interactive-card-visual glass-panel">
                <div className="visual-card-logo">WANDERLUST PAY</div>
                <div className="visual-card-chip" />
                <div className="visual-card-number">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="visual-card-row">
                  <div className="visual-card-holder">
                    <span className="visual-card-label">CARD HOLDER</span>
                    <span className="visual-card-val">{cardHolder || 'EZIO AUDITORE'}</span>
                  </div>
                  <div className="visual-card-expiry">
                    <span className="visual-card-label">EXPIRES</span>
                    <span className="visual-card-val">{cardExpiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <div className="form-input-container">
                  <CreditCard size={16} className="form-input-icon" />
                  <input 
                    type="text" 
                    maxLength="19"
                    placeholder="4111 2222 3333 4444" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Expires</label>
                  <div className="form-input-container">
                    <input 
                      type="text" 
                      maxLength="5"
                      placeholder="MM/YY" 
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group flex-1">
                  <label>CVV</label>
                  <div className="form-input-container">
                    <input 
                      type="password" 
                      maxLength="3"
                      placeholder="•••" 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <div className="form-input-container">
                  <input 
                    type="text" 
                    placeholder="Ezio Auditore" 
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="secure-badge">
                <ShieldCheck size={16} className="secure-icon" />
                <span>SSL Encrypted simulated connection. No funds will be charged.</span>
              </div>

              <button type="submit" className="btn-primary w-full checkout-action-btn">
                <span>Authorize Payment ({formattedPrice})</span>
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="success-confirmation text-center">
              <CheckCircle size={64} className="confirmation-success-icon" />
              <h3 className="success-title">Journey Reserved!</h3>
              <p className="success-subtitle">
                Your luxury itinerary is locked. We've sent confirmation logs to <strong>{travelerEmail}</strong>.
              </p>

              <div className="receipt-box glass-panel">
                <div className="receipt-row">
                  <span className="receipt-label">Booking Reference</span>
                  <span className="receipt-val code">WL-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Traveler</span>
                  <span className="receipt-val">{travelerName}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Package Name</span>
                  <span className="receipt-val">{item.name}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Amount Paid</span>
                  <span className="receipt-val highlights-price">{formattedPrice}</span>
                </div>
              </div>

              <button className="btn-primary w-full success-done-btn" onClick={onClose}>
                <span>Enter Dashboard</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
