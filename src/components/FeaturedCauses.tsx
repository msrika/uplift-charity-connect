
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplets, GraduationCap, Heart } from 'lucide-react';
import CauseDetailModal from './CauseDetailModal';

const causesData = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Providing access to clean, safe drinking water for rural communities in Africa.",
    raised: 75000,
    goal: 100000,
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    affectedAreas: [
      "Sub-Saharan Africa", "Rural Ethiopia", "Northern Kenya", "Southern Sudan", 
      "Eastern Chad", "Western Niger", "Rural Mali", "Northern Burkina Faso"
    ],
    peopleAffected: 2100000,
    mainImage: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=800&q=80",
    problemImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80"
    ],
    urgentNeeds: [
      "Water pumps and filtration systems",
      "Well drilling equipment and maintenance",
      "Water storage tanks and distribution pipes",
      "Community education on water sanitation",
      "Emergency water purification tablets",
      "Trained local technicians for system maintenance"
    ],
    recentUpdates: [
      "Successfully installed 15 new water pumps in rural Ethiopia, serving 5,000 people",
      "Completed water quality testing in 25 communities - 80% improvement noted",
      "Trained 50 local technicians in pump maintenance and water system management",
      "Emergency response provided to drought-affected areas in Northern Kenya"
    ]
  },
  {
    id: 2,
    title: "Education for All",
    description: "Building schools and providing educational resources to underserved children.",
    raised: 45000,
    goal: 80000,
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
    affectedAreas: [
      "Rural India", "Bangladesh Villages", "Remote Philippines", "Mountain Nepal", 
      "Rural Cambodia", "Remote Myanmar", "Eastern Afghanistan", "Southern Pakistan"
    ],
    peopleAffected: 850000,
    mainImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80",
    problemImages: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=400&q=80"
    ],
    urgentNeeds: [
      "School buildings and classroom furniture",
      "Educational materials, books, and digital tablets",
      "Qualified teachers and training programs",
      "School meal programs for nutrition support",
      "Transportation for students in remote areas",
      "Technology infrastructure and internet connectivity"
    ],
    recentUpdates: [
      "Built 8 new schools in rural India, accommodating 2,400 students",
      "Distributed 5,000 tablets with educational content to remote villages",
      "Trained 120 local teachers in modern teaching methodologies",
      "Launched mobile library program reaching 15 remote communities monthly"
    ]
  },
  {
    id: 3,
    title: "Healthcare Access",
    description: "Mobile medical clinics bringing essential healthcare to remote areas.",
    raised: 32000,
    goal: 60000,
    icon: Heart,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=400&q=80",
    affectedAreas: [
      "Amazon Rainforest", "Rural Brazil", "Remote Peru", "Highland Bolivia", 
      "Rural Colombia", "Isolated Venezuela", "Remote Ecuador", "Mountain Guatemala"
    ],
    peopleAffected: 650000,
    mainImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80",
    problemImages: [
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=400&q=80"
    ],
    urgentNeeds: [
      "Mobile medical units and ambulances",
      "Essential medicines and medical supplies",
      "Trained healthcare workers and specialists",
      "Medical equipment for remote diagnostics",
      "Vaccination programs and preventive care",
      "Emergency medical response systems"
    ],
    recentUpdates: [
      "Deployed 6 mobile clinics to Amazon communities, treating 8,000 patients",
      "Completed vaccination campaign reaching 12,000 children in remote areas",
      "Trained 80 community health workers in basic medical care",
      "Established telemedicine connections to 20 remote healthcare posts"
    ]
  }
];

const FeaturedCauses = () => {
  const [selectedCause, setSelectedCause] = useState<typeof causesData[0] | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">Featured Causes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-150">
            Click on any cause to see detailed information about affected areas, needs, and how you can help.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {causesData.map((cause, index) => {
            const percentage = (cause.raised / cause.goal) * 100;
            const Icon = cause.icon;
            
            return (
              <Card 
                key={cause.id} 
                className={`overflow-hidden hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-2 animate-fade-in cursor-pointer`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedCause(cause)}
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
                  <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {cause.peopleAffected.toLocaleString()} affected
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
                    View Details & Donate
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <CauseDetailModal 
        cause={selectedCause} 
        onClose={() => setSelectedCause(null)} 
      />
    </section>
  );
};

export default FeaturedCauses;
