
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Truck, Heart } from 'lucide-react';

const steps = [
  {
    icon: Coins,
    title: "You Donate",
    description: "Your secure donation goes directly to funding our carefully vetted projects and programs."
  },
  {
    icon: Truck,
    title: "We Deliver",
    description: "Our partners on the ground use 100% of your donation to provide immediate aid and long-term solutions."
  },
  {
    icon: Heart,
    title: "Lives Change",
    description: "Real families receive clean water, education, healthcare, and hope for a better future."
  }
];

const HowItHelps = () => {
  return (
    <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How Your Donation Helps</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We believe in complete transparency. Here's exactly how your donation creates lasting change.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 font-medium">
            <span className="text-green-600 font-bold">100%</span> of your donation goes directly to our causes.
            <br />
            Administrative costs are covered by separate operational funding.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItHelps;
