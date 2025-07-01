
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

  // Generate payment QR code data based on type
  const generatePaymentQRData = (donationId: string) => {
    if (type === 'monetary') {
      // Parse amount to get numeric value and currency
      const numericAmount = amount.replace(/[^\d.]/g, '');
      const currency = amount.includes('₹') ? 'INR' : 'USD';
      
      if (currency === 'INR') {
        // UPI payment format for Indian Rupees
        return `upi://pay?pa=${phoneNumber}@paytm&pn=Charity Donation&am=${numericAmount}&cu=INR&tn=Donation for ${category} - ${donationId}`;
      } else {
        // For USD/other currencies, use a generic payment link format
        // This could be adapted for PayPal, Venmo, etc.
        return `https://pay.example.com/send?to=${phoneNumber}&amount=${numericAmount}&currency=${currency}&note=Donation for ${category} - ${donationId}`;
      }
    } else {
      // For item donations, create a contact/info QR code
      return `CONTACT:${phoneNumber}\nDONATION:${donationId}\nCATEGORY:${category}\nITEMS:${amount}\nFEEDS:${peopleCount} people\nNOTE:Please contact for item donation pickup/delivery`;
    }
  };

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
            amount: type === 'monetary' ? parseFloat(amount.replace(/[^\d.]/g, '')) : null,
            donation_type: type,
            description: type === 'items' 
              ? `Item donation: ${category} - ${amount}${peopleCount ? ` (feeds ${peopleCount} people)` : ''} - Contact: ${phoneNumber}` 
              : `Monetary donation: ${amount} - Contact: ${phoneNumber}`,
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
        const paymentQRData = generatePaymentQRData(donationId);
        
        const dataUrl = await QRCode.toDataURL(paymentQRData, {
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
            .update({ qr_code_data: paymentQRData })
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
  }, [donationId, user]);

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
          <CardTitle className="text-2xl">Payment QR Code</CardTitle>
          <p className="text-gray-600">
            {type === 'monetary' 
              ? 'Scan this code to send money directly' 
              : 'Scan to get contact information for donation pickup'
            }
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* QR Code */}
          <div className="w-64 h-64 mx-auto bg-white border-2 border-gray-200 flex items-center justify-center rounded-lg p-4">
            {qrCodeDataUrl ? (
              <img src={qrCodeDataUrl} alt="Payment QR Code" className="w-full h-full object-contain" />
            ) : (
              <div className="text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                <p className="text-sm">
                  {isGenerating ? 'Generating Payment QR Code...' : 'Loading...'}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 text-left">
            <p><strong>Donation ID:</strong> {donationId || 'Generating...'}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Amount:</strong> {amount}</p>
            {peopleCount && <p><strong>Feeds:</strong> {peopleCount} people</p>}
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Recipient:</strong> {phoneNumber}</p>
          </div>

          {type === 'monetary' && amount.includes('₹') && (
            <div className="bg-green-50 p-4 rounded-lg text-left">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-green-600" />
                <p className="font-medium text-green-800">UPI Payment Ready</p>
              </div>
              <p className="text-green-700 text-sm">
                This QR code will open your UPI app (PayTM, GPay, PhonePe, etc.) and pre-fill the payment details.
              </p>
              <p className="text-green-700 text-sm mt-1">
                Simply scan with any UPI-enabled app to send ₹{amount.replace(/[^\d.]/g, '')} directly.
              </p>
            </div>
          )}

          {type === 'monetary' && amount.includes('$') && (
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <p className="font-medium text-blue-800">Payment Link Ready</p>
              </div>
              <p className="text-blue-700 text-sm">
                This QR code contains payment information. Scanning will direct to a payment platform.
              </p>
              <p className="text-blue-700 text-sm mt-1">
                Amount: ${amount.replace(/[^\d.]/g, '')} to {phoneNumber}
              </p>
            </div>
          )}

          {type === 'items' && (
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <p className="font-medium text-blue-800">Contact Information</p>
              </div>
              <p className="text-blue-700 text-sm">
                Scanning this QR code will provide contact details for item donation coordination.
              </p>
              <p className="text-blue-700 text-sm mt-1">
                Our team will contact you at {phoneNumber} within 24 hours for pickup/delivery arrangements.
              </p>
            </div>
          )}

          {!user && (
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <p className="text-blue-800 font-medium mb-2">💡 Sign in to save your donation history</p>
              <p className="text-blue-700 text-sm">
                Your QR code is ready to use, but signing in will save this donation to your history for future reference.
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
              Download Payment QR Code
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
