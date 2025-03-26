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

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role: 'user' // Set default role to user
          },
          emailRedirectTo: `${window.location.origin}/practice`
        }
      });
      
      if (error) throw error;
      navigate('/practice');
    } catch (error) {
      setError('Failed to create account');
    }
  };

  const handleGithubSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/practice`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      setError('Failed to sign up with GitHub');
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-8 -mt-36">
      <Card className="w-full max-w-md -mb-48">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-center">Create Account</h1>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
              Sign Up
            </Button>
          </form>

          <div className="my-4">
            <Separator className="my-4"></Separator>
          </div>

          <Button
            variant="outline"
            className="w-full bg-white text-black"
            onClick={handleGithubSignUp}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>

          <p className="text-base text-muted-foreground text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
