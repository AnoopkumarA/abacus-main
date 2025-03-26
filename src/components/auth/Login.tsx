import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { supabase } from '../../config/supabase';

import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;

      // Check user role from metadata and redirect accordingly
      const userRole = data.user?.user_metadata?.role || 'user';
      navigate(userRole === 'admin' ? '/admin' : '/practice');
    } catch (error) {
      setError('Failed to log in');
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/practice`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      setError('Failed to log in with GitHub');
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-8 -mt-36 ">
      <Card className="w-full max-w-md -mb-20">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-center">Sign In</h1>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="my-4">
            <Separator className="my-4"></Separator>
          </div>

          <Button
            variant="outline"
            className="w-full bg-white text-black"
            onClick={handleGithubLogin}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          
          <p className="text-base text-muted-foreground text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="text-xs text-muted-foreground text-center mt-2">
            Admin? Use admin@abacus.com
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
