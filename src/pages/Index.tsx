
import Hero from '@/components/Hero';
import FeaturedCauses from '@/components/FeaturedCauses';
import ImpactStats from '@/components/ImpactStats';
import HowItHelps from '@/components/HowItHelps';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Hero />
      <FeaturedCauses />
      <ImpactStats />
      <HowItHelps />
      <Footer />
    </div>
  );
};

export default Index;
