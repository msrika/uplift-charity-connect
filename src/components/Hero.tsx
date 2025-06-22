
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const heroImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&q=80"
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-teal-600 text-white py-24 px-4 min-h-screen flex items-center">
      {/* Background Image Carousel with Sliding Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image}
                alt={`Hero background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-teal-600/80"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm animate-pulse">
            <Heart className="w-12 h-12 text-white" fill="currentColor" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
          Together We Can
          <span className="block text-yellow-300 animate-bounce">Change Lives</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto animate-fade-in delay-150">
          Your donation provides clean water, education, and hope to communities around the world. 
          Join thousands of donors making a real difference today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-semibold px-8 py-4 text-lg group transform hover:scale-105 transition-all duration-200">
            Donate Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200">
            Learn More
          </Button>
        </div>
      </div>

      {/* Sliding indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
