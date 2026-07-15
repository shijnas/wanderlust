import React from 'react';
import { X, Calculator, ShieldCheck, HelpCircle } from 'lucide-react';
import './PricingDrawer.css';

export default function PricingDrawer({ destination, onClose, onBook, currencySymbol, currencyFactor }) {
  if (!destination) return null;

  const basePriceUSD = parseFloat(destination.price.replace(/,/g, ''));
  
  // Calculate pricing breakdown
  const base = Math.round(basePriceUSD * currencyFactor);
  const taxes = Math.round(150 * currencyFactor);
  const resortFees = Math.round(85 * currencyFactor);
  const total = base + taxes + resortFees;

  return (
    <div className="pricing-drawer-overlay" onClick={onClose}>
      <div className="pricing-drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <div className="drawer-header">
          <div className="drawer-title">
            <Calculator size={18} className="title-icon" />
            <h3>PRICING DETAILS</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>

        {/* Package summary preview */}
        <div className="drawer-summary-card glass-panel">
          <img src={destination.image} alt={destination.title} className="drawer-summary-img" />
          <div className="drawer-summary-info">
            <h4>{destination.title}</h4>
            <span>{destination.location}</span>
          </div>
        </div>

        {/* Pricing Rows */}
        <div className="pricing-rows">
          <div className="pricing-row-item">
            <span>Base Package Rate (1 guest)</span>
            <strong>{currencySymbol}{base.toLocaleString()}</strong>
          </div>
          <div className="pricing-row-item">
            <span className="row-with-tooltip">
              International flight/transit taxes 
              <HelpCircle size={12} title="Mandatory tourist transit fees" />
            </span>
            <strong>{currencySymbol}{taxes.toLocaleString()}</strong>
          </div>
          <div className="pricing-row-item">
            <span>Luxury resort & dome cleaning fees</span>
            <strong>{currencySymbol}{resortFees.toLocaleString()}</strong>
          </div>

          <div className="pricing-total-row">
            <span>Estimated Total (Inclusive of fees)</span>
            <div className="total-price-group">
              <h3>{currencySymbol}{total.toLocaleString()}</h3>
              <span>{currencySymbol === '$' ? 'USD' : currencySymbol === '€' ? 'EUR' : 'NOK'}</span>
            </div>
          </div>
        </div>

        {/* Security badge and Submit */}
        <div className="drawer-footer">
          <div className="secure-checkout-notice">
            <ShieldCheck size={16} className="secure-badge-icon" />
            <span>Best rate guarantee. Price locked for next 15 minutes.</span>
          </div>
          <button 
            className="btn-primary w-full drawer-action-btn"
            onClick={() => {
              onBook({
                name: destination.title,
                type: 'Journey (All inclusive)',
                price: total.toString(),
                image: destination.image
              });
              onClose();
            }}
          >
            <span>Proceed to Checkout</span>
          </button>
        </div>

      </div>
    </div>
  );
}
