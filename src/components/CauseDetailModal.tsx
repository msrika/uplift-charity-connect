
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { X, MapPin, Users, Heart, Phone } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';

interface CauseDetail {
  id: number;
  title: string;
  description: string;
  raised: number;
  goal: number;
  affectedAreas: string[];
  peopleAffected: number;
  mainImage: string;
  problemImages: string[];
  urgentNeeds: string[];
  recentUpdates: string[];
}

interface CauseDetailModalProps {
  cause: CauseDetail | null;
  onClose: () => void;
}

const CauseDetailModal = ({ cause, onClose }: CauseDetailModalProps) => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!cause) return null;

  const percentage = (cause.raised / cause.goal) * 100;

  const handleDonate = () => {
    if (donationAmount && phoneNumber) {
      setShowQRCode(true);
    }
  };

  if (showQRCode) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <QRCodeGenerator
            category={cause.title}
            amount={donationAmount}
            type="monetary"
            phoneNumber={phoneNumber}
            onBack={() => setShowQRCode(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{cause.title}</h2>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Image and Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={cause.mainImage} 
                alt={cause.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">People Affected</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{cause.peopleAffected.toLocaleString()}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-green-600 font-bold">${cause.raised.toLocaleString()} raised</span>
                  <span className="text-gray-500">${cause.goal.toLocaleString()} goal</span>
                </div>
                <Progress value={percentage} className="h-3" />
                <p className="text-sm text-gray-600">{Math.round(percentage)}% funded</p>
              </div>
            </div>
          </div>

          {/* Affected Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Affected Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2">
                {cause.affectedAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Problem Images */}
          <Card>
            <CardHeader>
              <CardTitle>Current Situation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {cause.problemImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Problem ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
              <p className="text-gray-600">{cause.description}</p>
            </CardContent>
          </Card>

          {/* Urgent Needs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Urgent Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {cause.urgentNeeds.map((need, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cause.recentUpdates.map((update, index) => (
                  <li key={index} className="border-l-4 border-green-500 pl-4 py-2">
                    <span className="text-gray-700">{update}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Donation Section */}
          {!showDonationForm ? (
            <div className="text-center">
              <Button 
                onClick={() => setShowDonationForm(true)}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 text-lg"
              >
                Donate to This Cause
              </Button>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Donation Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleDonate}
                    disabled={!donationAmount || !phoneNumber}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Generate QR Code
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDonationForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CauseDetailModal;
