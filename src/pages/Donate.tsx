
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, User } from 'lucide-react';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import Footer from '@/components/Footer';

const donationCategories = [
  {
    id: 'food',
    title: 'Food Donations',
    description: 'Help feed families in need with nutritious meals',
    icon: '🍽️',
    color: 'from-orange-500 to-red-500',
    subcategories: [
      'Rice & Grains',
      'Vegetables & Fruits',
      'Canned Foods',
      'Baby Food',
      'Dairy Products',
      'Meat & Protein'
    ]
  },
  {
    id: 'clothes',
    title: 'Clothing Donations',
    description: 'Provide warm clothing and essentials to those in need',
    icon: '👕',
    color: 'from-blue-500 to-cyan-500',
    subcategories: [
      'Winter Clothes',
      'Summer Clothes',
      'Children Clothing',
      'Shoes & Footwear',
      'Blankets',
      'Undergarments'
    ]
  },
  {
    id: 'elderly',
    title: 'Support for Elderly',
    description: 'Care and support for our senior community members',
    icon: '👴',
    color: 'from-purple-500 to-pink-500',
    subcategories: [
      'Medicine & Healthcare',
      'Medical Equipment',
      'Mobility Aids',
      'Personal Care Items',
      'Nutrition Supplements',
      'Comfort Items'
    ]
  },
  {
    id: 'children',
    title: 'Children Support',
    description: 'Education, healthcare, and support for children',
    icon: '👶',
    color: 'from-green-500 to-teal-500',
    subcategories: [
      'Education & School Supplies',
      'Sports Equipment',
      'Toys & Games',
      'Books & Learning Materials',
      'Art & Craft Supplies',
      'Musical Instruments'
    ]
  }
];

const Donate = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [donationType, setDonationType] = useState('monetary');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const handleDonate = () => {
    const isMonetary = donationType === 'monetary';
    const isValid = selectedCategory && selectedSubcategory && phoneNumber && 
      (isMonetary ? amount : (itemQuantity && peopleCount));
    
    if (isValid) {
      setShowQR(true);
    }
  };

  const selectedCategoryData = donationCategories.find(cat => cat.id === selectedCategory);

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
                  onClick={() => handleCategorySelect(category.id)}
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
                  {/* Subcategory Selection */}
                  <div>
                    <Label className="text-base font-semibold">
                      Select {selectedCategoryData?.title} Type
                    </Label>
                    <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={`Choose ${selectedCategoryData?.title.toLowerCase()} type`} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategoryData?.subcategories.map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

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

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold">Contact Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-2"
                    />
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
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="quantity" className="text-base font-semibold">Quantity/Amount of Items</Label>
                        <Input
                          id="quantity"
                          type="text"
                          placeholder="e.g., 10 kg rice, 5 boxes, etc."
                          value={itemQuantity}
                          onChange={(e) => setItemQuantity(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="people" className="text-base font-semibold">How many people will this feed?</Label>
                        <Input
                          id="people"
                          type="number"
                          placeholder="Number of people"
                          value={peopleCount}
                          onChange={(e) => setPeopleCount(e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 font-medium mb-2">📞 Contact Information:</p>
                        <p className="text-blue-700">
                          For item donations, our advisor will contact you at the provided phone number to arrange pickup or drop-off.
                        </p>
                        <p className="text-blue-700 mt-1">
                          <strong>Advisor Hotline:</strong> +1 (555) 123-HELP
                        </p>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleDonate}
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-lg py-3"
                    disabled={!selectedCategory || !selectedSubcategory || !phoneNumber || 
                      (donationType === 'monetary' && !amount) || 
                      (donationType === 'items' && (!itemQuantity || !peopleCount))}
                  >
                    Generate Donation QR Code
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <QRCodeGenerator 
            category={`${selectedCategory} - ${selectedSubcategory}`}
            amount={donationType === 'monetary' ? amount : itemQuantity}
            peopleCount={donationType === 'items' ? peopleCount : undefined}
            type={donationType}
            phoneNumber={phoneNumber}
            onBack={() => {
              setShowQR(false);
              setSelectedSubcategory('');
            }}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Donate;
