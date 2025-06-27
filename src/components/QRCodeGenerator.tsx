
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Download, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  category: string;
  amount: string;
  peopleCount?: string;
  type: string;
  phoneNumber: string;
  onBack: () => void;
}

const QRCodeGenerator = ({ category, amount, peopleCount, type, phoneNumber, onBack }: QRCodeGeneratorProps) => {
  const [donationId, setDonationId] = useState<string>('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const { user } = useAuth();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const qrData = `DONATION:${donationId}:${category}:${amount}:${type}:${phoneNumber}${peopleCount ? `:${peopleCount}people` : ''}`;

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
        const donationData = {
          user_id: user.id,
          category,
          amount: type === 'monetary' ? parseFloat(amount) : null,
          donation_type: type,
          description: type === 'items' 
            ? `Item donation: ${category} - ${amount}${peopleCount ? ` (feeds ${peopleCount} people)` : ''} - Contact: ${phoneNumber}` 
            : `Monetary donation: $${amount} - Contact: ${phoneNumber}`,
          qr_code_data: '', // Will be updated with actual QR data after ID is generated
          status: 'pending'
        };

        const { data, error } = await supabase
          .from('donations')
          .insert(donationData)
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
  }, [user, category, amount, type, phoneNumber, peopleCount, toast]);

  useEffect(() => {
    const generateQRCode = async () => {
      if (!donationId) return;
      
      try {
        const dataUrl = await QRCode.toDataURL(qrData, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataUrl(dataUrl);

        // Update the donation record with the QR code data
        await supabase
          .from('donations')
          .update({ qr_code_data: qrData })
          .eq('id', donationId);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [donationId, qrData]);

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `donation-qr-${donationId}.png`;
    link.href = qrCodeDataUrl;
    link.click();
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Donation QR Code</CardTitle>
          <p className="text-gray-600">Scan this code to complete your donation</p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* QR Code */}
          <div className="w-64 h-64 mx-auto bg-white border-2 border-gray-200 flex items-center justify-center rounded-lg p-4">
            {qrCodeDataUrl ? (
              <img src={qrCodeDataUrl} alt="Donation QR Code" className="w-full h-full object-contain" />
            ) : (
              <div className="text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                <p className="text-sm">Generating QR Code...</p>
              </div>
            )}
          </div>

          <div className="space-y-2 text-left">
            <p><strong>Donation ID:</strong> {donationId || 'Generating...'}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Amount:</strong> {type === 'monetary' ? `$${amount}` : amount}</p>
            {peopleCount && <p><strong>Feeds:</strong> {peopleCount} people</p>}
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Contact:</strong> {phoneNumber}</p>
          </div>

          {type === 'items' && (
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <p className="font-medium text-blue-800">Our advisor will contact you</p>
              </div>
              <p className="text-blue-700 text-sm">
                You will receive a call within 24 hours to arrange pickup or drop-off of your donation items.
              </p>
              <p className="text-blue-700 text-sm mt-1">
                <strong>Emergency contact:</strong> +1 (555) 123-HELP
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={downloadQRCode}
              disabled={!qrCodeDataUrl}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
