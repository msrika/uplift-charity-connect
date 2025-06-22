
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, Users, User } from 'lucide-react';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import Footer from '@/components/Footer';

const donationCategories = [
  {
    id: 'food',
    title: 'Food Donations',
    description: 'Help feed families in need with nutritious meals',
    icon: '🍽️',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'clothes',
    title: 'Clothing Donations',
    description: 'Provide warm clothing and essentials to those in need',
    icon: '👕',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'elderly',
    title: 'Support for Elderly',
    description: 'Care and support for our senior community members',
    icon: '👴',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'children',
    title: 'Children Support',
    description: 'Education, healthcare, and support for children',
    icon: '👶',
    color: 'from-green-500 to-teal-500'
  }
];

const Donate = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [donationType, setDonationType] = useState('monetary');

  const handleDonate = () => {
    if (selectedCategory && (amount || donationType === 'items')) {
      setShowQR(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <Heart className="w-16 h-16 mx-auto mb-4" fill="currentColor" />
          <h1 className="text-4xl font-bold mb-4">Make a Donation</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Choose a category that speaks to your heart and make a difference today.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4">
        {!showQR ? (
          <>
            {/* Donation Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {donationCategories.map((category) => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                    selectedCategory === category.id ? 'ring-4 ring-purple-500 scale-105' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl mb-4`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Donation Form */}
            {selectedCategory && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Complete Your Donation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold">Donation Type</Label>
                    <RadioGroup value={donationType} onValueChange={setDonationType} className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monetary" id="monetary" />
                        <Label htmlFor="monetary">Monetary Donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="items" id="items" />
                        <Label htmlFor="items">Item Donation</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {donationType === 'monetary' && (
                    <div>
                      <Label htmlFor="amount" className="text-base font-semibold">Donation Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-2"
                      />
                      <div className="flex gap-2 mt-3">
                        {[25, 50, 100, 250].map((preset) => (
                          <Button
                            key={preset}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(preset.toString())}
                          >
                            ${preset}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {donationType === 'items' && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-yellow-800">
                        For item donations, please contact our team to arrange pickup or drop-off.
                        A QR code will be generated for tracking your donation.
                      </p>
                    </div>
                  )}

                  <Button 
                    onClick={handleDonate}
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-lg py-3"
                    disabled={!selectedCategory || (donationType === 'monetary' && !amount)}
                  >
                    Generate Donation QR Code
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <QRCodeGenerator 
            category={selectedCategory}
            amount={donationType === 'monetary' ? amount : 'Items'}
            type={donationType}
            onBack={() => setShowQR(false)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Donate;
