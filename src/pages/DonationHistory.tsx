
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Heart, History, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

// Mock donation data
const donationHistory = [
  {
    id: 'DON-1703123456-FOOD',
    category: 'Food Donations',
    amount: '$100',
    type: 'Monetary',
    date: '2024-06-20',
    status: 'Completed'
  },
  {
    id: 'DON-1703123457-CLOTHES',
    category: 'Clothing Donations',
    amount: 'Items',
    type: 'Physical',
    date: '2024-06-18',
    status: 'Processing'
  },
  {
    id: 'DON-1703123458-ELDERLY',
    category: 'Support for Elderly',
    amount: '$250',
    type: 'Monetary',
    date: '2024-06-15',
    status: 'Completed'
  },
  {
    id: 'DON-1703123459-CHILDREN',
    category: 'Children Support',
    amount: '$75',
    type: 'Monetary',
    date: '2024-06-12',
    status: 'Completed'
  }
];

const DonationHistory = () => {
  const totalDonated = donationHistory
    .filter(d => d.type === 'Monetary')
    .reduce((sum, d) => sum + parseInt(d.amount.replace('$', '')), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <History className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Your Donation History</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Thank you for your continued support. Here's a record of your generous contributions.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Total Donations</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold text-purple-600">{donationHistory.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Amount Donated</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold text-green-600">${totalDonated}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Impact Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold text-teal-600">⭐ Gold</p>
            </CardContent>
          </Card>
        </div>

        {/* Donation History Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Heart className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" />
              Donation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donation ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donationHistory.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-mono text-sm">{donation.id}</TableCell>
                    <TableCell>{donation.category}</TableCell>
                    <TableCell className="font-semibold">{donation.amount}</TableCell>
                    <TableCell>{donation.type}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        donation.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {donation.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <QrCode className="w-4 h-4 mr-1" />
                        View QR
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-8 text-center">
              <Link to="/donate">
                <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                  Make Another Donation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default DonationHistory;
