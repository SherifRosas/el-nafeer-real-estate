import styles from './la-playa.module.css';
import ChatbotWidget from '../../../components/la-playa/ChatbotWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'La Playa Chalet Rentals | Kitesurfing in Ras Sudr',
  description: 'Premium chalet rentals in La Playa Village, Ras Sudr. The ultimate winter resort for kitesurfing and wind sports in South Sinai.',
};

export default function LaPlayaPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Welcome to La Playa Village</h1>
        <p>Your premium winter escape in Ras Sudr, South Sinai. The ultimate destination for kitesurfing, wind sports, and relaxation.</p>
        <a href="#booking" className={styles.btnPrimary}>Explore Chalets</a>
      </section>

      {/* Kitesurfing & Features */}
      <section className={styles.section}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px' }}>The Kitesurfing Paradise</h2>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Known for its steady winds and shallow waters, Ras Sudr is a world-class destination for kitesurfing and windsurfing. La Playa Village places you right at the heart of the action.
        </p>
        
        <div className={styles.featuresGrid}>
          <div className={`${styles.featureCard} ${styles.glassPanel}`}>
            <h3 style={{ fontSize: '3rem', margin: '0' }}>🪁</h3>
            <h3>World-Class Wind</h3>
            <p>Consistent winds throughout the year making it perfect for both beginners and pros.</p>
          </div>
          <div className={`${styles.featureCard} ${styles.glassPanel}`}>
            <h3 style={{ fontSize: '3rem', margin: '0' }}>🏖️</h3>
            <h3>Private Beach</h3>
            <p>Direct access to the pristine beaches of South Sinai, away from the crowded hotels.</p>
          </div>
          <div className={`${styles.featureCard} ${styles.glassPanel}`}>
            <h3 style={{ fontSize: '3rem', margin: '0' }}>🏠</h3>
            <h3>Premium Comfort</h3>
            <p>Fully equipped luxury chalets hosted by verified owners like Dr. Shimaa.</p>
          </div>
        </div>
      </section>

      {/* Pricing vs Hotels */}
      <section className={styles.section} style={{ backgroundColor: 'var(--glass-border)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>Why Choose a Chalet?</h2>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>Experience more space, privacy, and savings compared to traditional hotels.</p>
        
        <table className={`${styles.comparisonTable} ${styles.glassPanel}`}>
          <thead>
            <tr>
              <th>Feature</th>
              <th>La Playa Chalets</th>
              <th>Standard Hotels</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Space & Privacy</strong></td>
              <td>Entire private home (multiple bedrooms)</td>
              <td>Single confined room</td>
            </tr>
            <tr>
              <td><strong>Pricing</strong></td>
              <td>Highly competitive, perfect for groups</td>
              <td>Expensive per-person rates</td>
            </tr>
            <tr>
              <td><strong>Kitchen & Amenities</strong></td>
              <td>Fully equipped private kitchen</td>
              <td>Mini-fridge only</td>
            </tr>
            <tr>
              <td><strong>Booking Trust</strong></td>
              <td>Pay on Arrival with secure card hold via Stripe</td>
              <td>Full upfront payment required</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Trust & Location */}
      <section className={styles.section}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px' }}>Location & Trust</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Secure & Transparent</h3>
            <ul style={{ listStyle: 'none', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>✅</span> 
                <div>
                  <strong>Verified Hosts:</strong><br/>All chalet owners, including Dr. Shimaa, are fully vetted for your security.
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>✅</span> 
                <div>
                  <strong>Pay on Arrival (Stripe Hold):</strong><br/>We securely hold your reservation with an international card. No shady local transfers. Pay only when you arrive.
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>✅</span> 
                <div>
                  <strong>Foreigner Friendly:</strong><br/>100% English support, clear directions, and no hidden hotel fees or 'tourist taxes'.
                </div>
              </li>
            </ul>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div className={`${styles.mapContainer} ${styles.glassPanel}`}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111244.59102008323!2d32.7093259!3d29.5398246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a33758b99bbdb%3A0xc6c4293f773cd140!2sLa%20Playa%20Ras%20Sudr!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} La Playa Chalet Rentals. All rights reserved.</p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>Ras Sudr, South Sinai, Egypt.</p>
      </footer>

      {/* Interactive Chatbot */}
      <ChatbotWidget />
    </div>
  );
}
