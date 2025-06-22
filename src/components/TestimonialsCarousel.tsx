
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "California, USA",
    text: "Thanks to this organization, my village now has clean water. My children no longer get sick from contaminated water.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Marcus Chen",
    location: "London, UK",
    text: "I've been donating for 3 years and seeing the impact reports gives me so much joy. Real transparency!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Amara Okafor",
    location: "Lagos, Nigeria",
    text: "The new school in our community has changed everything. My daughter now has a bright future ahead.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "David Rodriguez",
    location: "Barcelona, Spain",
    text: "Amazing organization! Every dollar goes where it should. I can see the direct impact of my donations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

const TestimonialsCarousel = () => {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What People Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from the lives we've touched and the donors who make it possible.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-purple-400 mb-2" />
                    </div>
                    
                    <p className="text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
