
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Download, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Generate a unique donation ID even without authentication for demo purposes
  const generateDonationId = () => {
    return 'DONATION-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const qrData = `DONATION:${donationId}:${category}:${amount}:${type}:${phoneNumber}${peopleCount ? `:${peopleCount}people` : ''}`;

  useEffect(() => {
    const saveDonation = async () => {
      setIsGenerating(true);
      
      // Generate donation ID first
      const newDonationId = generateDonationId();
      setDonationId(newDonationId);

      // If user is authenticated, save to database
      if (user) {
        try {
          const donationData = {
            user_id: user.id,
            category,
            amount: type === 'monetary' ? parseFloat(amount) : null,
            donation_type: type,
            description: type === 'items' 
              ? `Item donation: ${category} - ${amount}${peopleCount ? ` (feeds ${peopleCount} people)` : ''} - Contact: ${phoneNumber}` 
              : `Monetary donation: $${amount} - Contact: ${phoneNumber}`,
            qr_code_data: '',
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
            title: "Donation created",
            description: "QR code generated successfully. Sign in to save donation history.",
            variant: "default",
          });
        }
      } else {
        toast({
          title: "QR Code Generated",
          description: "Your donation QR code is ready. Sign in to save donation history.",
        });
      }
      
      setIsGenerating(false);
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

        // Update the donation record with the QR code data if user is authenticated
        if (user) {
          await supabase
            .from('donations')
            .update({ qr_code_data: qrData })
            .eq('id', donationId);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast({
          title: "QR Code Error",
          description: "Failed to generate QR code. Please try again.",
          variant: "destructive",
        });
      }
    };

    generateQRCode();
  }, [donationId, qrData, user]);

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `donation-qr-${donationId}.png`;
    link.href = qrCodeDataUrl;
    link.click();

    toast({
      title: "QR Code Downloaded",
      description: "Your donation QR code has been downloaded successfully.",
    });
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
                <p className="text-sm">
                  {isGenerating ? 'Generating QR Code...' : 'Loading...'}
                </p>
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

          {!user && (
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <p className="text-blue-800 font-medium mb-2">💡 Sign in to save your donation history</p>
              <p className="text-blue-700 text-sm">
                Your QR code is ready to use, but signing in will save this donation to your history for future reference.
              </p>
            </div>
          )}

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
