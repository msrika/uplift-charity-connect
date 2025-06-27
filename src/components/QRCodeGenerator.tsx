
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface QRCodeGeneratorProps {
  category: string;
  amount: string;
  type: string;
  onBack: () => void;
}

const QRCodeGenerator = ({ category, amount, type, onBack }: QRCodeGeneratorProps) => {
  const [donationId, setDonationId] = useState<string>('');
  const { user } = useAuth();
  const { toast } = useToast();

  const qrData = `DONATION:${donationId}:${category}:${amount}:${type}`;

  useEffect(() => {
    const saveDonation = async () => {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to make a donation.",
          variant: "destructive",
        });
        return;
      }

      try {
        const { data, error } = await supabase
          .from('donations')
          .insert({
            user_id: user.id,
            category,
            amount: type === 'monetary' ? parseFloat(amount) : null,
            donation_type: type,
            description: type === 'items' ? `Item donation: ${category}` : null,
            qr_code_data: qrData,
            status: 'pending'
          })
          .select()
          .single();

        if (error) throw error;

        setDonationId(data.id);
        
        toast({
          title: "Donation recorded!",
          description: "Your donation has been saved to your history.",
        });
      } catch (error: any) {
        console.error('Error saving donation:', error);
        toast({
          title: "Error saving donation",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    saveDonation();
  }, [user, category, amount, type, toast]);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Donation QR Code</CardTitle>
          <p className="text-gray-600">Scan this code to complete your donation</p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* QR Code Placeholder */}
          <div className="w-64 h-64 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">QR Code</p>
              <p className="text-xs text-gray-400 mt-2 break-all">{qrData}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p><strong>Donation ID:</strong> {donationId || 'Generating...'}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Amount:</strong> {type === 'monetary' ? `$${amount}` : 'Items'}</p>
            <p><strong>Type:</strong> {type}</p>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Download QR Code
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
