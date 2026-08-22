import { Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <Globe size={20} />
              <span>GlobeTrotter</span>
            </div>
            <p>Crafting effortless journeys for the modern explorer. Experience the world, organized.</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#destinations">Destinations</a></li>
                <li><a href="#itineraries">Itineraries</a></li>
                <li><a href="#budgeting">Budgeting</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#safety">Safety</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Social</h4>
              <ul>
                <li><a href="#instagram">Instagram</a></li>
                <li><a href="#twitter">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} GlobeTrotter. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
