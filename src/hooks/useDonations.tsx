
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Donation {
  id: string;
  category: string;
  amount: number | null;
  donation_type: string;
  description: string | null;
  status: string;
  created_at: string;
}

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDonations(data || []);
      } catch (error: any) {
        console.error('Error fetching donations:', error);
        toast({
          title: "Error loading donations",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user, toast]);

  return { donations, loading, refetch: () => setLoading(true) };
};
