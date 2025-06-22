
import { Users, Droplets, GraduationCap, MapPin } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: "250,000+",
    label: "Lives Changed",
    color: "text-blue-600"
  },
  {
    icon: Droplets,
    number: "500+",
    label: "Wells Built",
    color: "text-teal-600"
  },
  {
    icon: GraduationCap,
    number: "150+",
    label: "Schools Funded",
    color: "text-green-600"
  },
  {
    icon: MapPin,
    number: "25+",
    label: "Countries Reached",
    color: "text-purple-600"
  }
];

const ImpactStats = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thanks to generous donors like you, we've been able to make a real difference around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <Icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
