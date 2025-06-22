
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
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Causes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every donation makes a difference. Choose a cause that speaks to your heart.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {causes.map((cause) => {
            const percentage = (cause.raised / cause.goal) * 100;
            const Icon = cause.icon;
            
            return (
              <Card key={cause.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={cause.image} 
                    alt={cause.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">{cause.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{cause.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-green-600">${cause.raised.toLocaleString()} raised</span>
                      <span className="text-gray-500">${cause.goal.toLocaleString()} goal</span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <p className="text-sm text-gray-500">{Math.round(percentage)}% funded</p>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
