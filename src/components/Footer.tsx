
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-yellow-400 mr-2" fill="currentColor" />
              <span className="text-2xl font-bold">CharityHeart</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Dedicated to creating lasting change through transparent, impactful charitable work. 
              Every donation brings hope to those who need it most.
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
              Make a Donation
            </Button>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Projects</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impact Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Get Involved</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <span>hello@charityheart.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                <span>123 Hope Street, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CharityHeart. All rights reserved. | Transparency • Impact • Hope</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
