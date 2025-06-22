
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplets, GraduationCap, Heart } from 'lucide-react';

const causes = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Providing access to clean, safe drinking water for rural communities in Africa.",
    raised: 75000,
    goal: 100000,
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Education for All",
    description: "Building schools and providing educational resources to underserved children.",
    raised: 45000,
    goal: 80000,
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Healthcare Access",
    description: "Mobile medical clinics bringing essential healthcare to remote areas.",
    raised: 32000,
    goal: 60000,
    icon: Heart,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=400&q=80"
  }
];

const FeaturedCauses = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">Featured Causes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-150">
            Every donation makes a difference. Choose a cause that speaks to your heart.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {causes.map((cause, index) => {
            const percentage = (cause.raised / cause.goal) * 100;
            const Icon = cause.icon;
            
            return (
              <Card 
                key={cause.id} 
                className={`overflow-hidden hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-2 animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={cause.image} 
                    alt={cause.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {Math.round(percentage)}% funded
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {cause.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{cause.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-green-600 font-bold">${cause.raised.toLocaleString()} raised</span>
                      <span className="text-gray-500">${cause.goal.toLocaleString()} goal</span>
                    </div>
                    <Progress value={percentage} className="h-3 bg-gray-200">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </Progress>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Donate to This Cause
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCauses;
