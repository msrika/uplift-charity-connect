
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Heart, ArrowLeft, Calendar, DollarSign, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useDonations } from '@/hooks/useDonations';
import { format } from 'date-fns';
import Footer from '@/components/Footer';

const DonationHistory = () => {
  const { user } = useAuth();
  const { donations, loading } = useDonations();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <CardTitle>Login Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">Please log in to view your donation history.</p>
            <div className="space-y-2">
              <Link to="/login">
                <Button className="w-full">Login</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatAmount = (amount: number | null, type: string) => {
    if (type === 'monetary' && amount) {
      return `$${amount.toFixed(2)}`;
    }
    return 'Items';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Donation History</h1>
              <p className="text-xl text-purple-100">
                Track all your generous contributions
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4">
        {loading ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">Loading your donation history...</p>
            </CardContent>
          </Card>
        ) : donations.length === 0 ? (
          <Card>
            <CardHeader className="text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <CardTitle className="text-2xl">No Donations Yet</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600 mb-6">
                You haven't made any donations yet. Start making a difference today!
              </p>
              <Link to="/donate">
                <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                  Make Your First Donation
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Your Donation History
              </CardTitle>
              <p className="text-gray-600">
                Total donations: {donations.length}
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>
                        {format(new Date(donation.created_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="font-medium">
                        {donation.category}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {donation.donation_type === 'monetary' ? (
                            <DollarSign className="w-4 h-4 text-green-600" />
                          ) : (
                            <Package className="w-4 h-4 text-blue-600" />
                          )}
                          {donation.donation_type === 'monetary' ? 'Money' : 'Items'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatAmount(donation.amount, donation.donation_type)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <Link to="/donate">
            <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 mr-4">
              Make Another Donation
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DonationHistory;
