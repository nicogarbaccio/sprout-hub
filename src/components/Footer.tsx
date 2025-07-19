import React from "react";

/**
 * Site-wide footer for SproutHub.
 * @returns {JSX.Element}
 */
const Footer: React.FC = () => (
  <footer className="bg-sprout-medium text-sprout-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 font-poppins">SproutHub</h3>
        <p className="text-sprout-cream mb-6">
          Your personal plant care assistant
        </p>
        <p className="text-sm text-sprout-cream/80">
          © 2025 SproutHub. Made with ♥ for plant lovers everywhere.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
