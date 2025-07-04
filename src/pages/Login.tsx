
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, LogIn, Mail, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      // Error is handled in the useAuth hook
      console.error('Login error:', error);
    }
  };

  const handleDemoMode = () => {
    navigate('/donate');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in to continue your charitable journey</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
              disabled={loading}
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Email confirmation required</p>
                <p>Make sure to check your email and click the confirmation link before signing in.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium">Having trouble logging in?</p>
                <p className="mb-2">You can still use the donation features without an account!</p>
                <Button 
                  onClick={handleDemoMode}
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-800 hover:bg-orange-100"
                >
                  Try Demo Mode
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
