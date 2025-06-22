
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-teal-600 text-white py-24 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-full">
            <Heart className="w-12 h-12 text-white" fill="currentColor" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Together We Can
          <span className="block text-yellow-300">Change Lives</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Your donation provides clean water, education, and hope to communities around the world. 
          Join thousands of donors making a real difference today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-4 text-lg group">
            Donate Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
