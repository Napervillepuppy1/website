import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "forgot">("signin");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = authMode === "signin" ? "signed in" : authMode === "signup" ? "account created" : "password reset email sent";
    toast({
      title: "Success!",
      description: `You have successfully ${action}!`,
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl mb-4 text-primary pixel-text-shadow" data-testid="text-auth-title">
          Welcome Back
        </h1>
        <p className="text-lg opacity-80" data-testid="text-auth-subtitle">
          Sign in to share your art with the community
        </p>
      </div>

      <div className="art-post-card rounded-lg p-8">
        {/* Sign In Form */}
        {authMode === "signin" && (
          <div data-testid="form-signin">
            <h2 className="text-xl mb-6 text-center text-primary">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm mb-2 text-primary">
                  Email
                </Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
                  placeholder="your@email.com"
                  data-testid="input-signin-email"
                  required 
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="password" className="block text-sm mb-2 text-primary">
                  Password
                </Label>
                <Input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
                  placeholder="••••••••"
                  data-testid="input-signin-password"
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full retro-gradient py-3 rounded-lg text-lg hover:opacity-90 transition-opacity mb-4"
                data-testid="button-signin"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center space-y-2">
              <button 
                onClick={() => setAuthMode("signup")}
                className="text-primary hover:underline text-sm"
                data-testid="link-signup"
              >
                Don't have an account? Sign up
              </button>
              <br />
              <button 
                onClick={() => setAuthMode("forgot")}
                className="text-secondary hover:underline text-sm"
                data-testid="link-forgot-password"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        )}

        {/* Sign Up Form */}
        {authMode === "signup" && (
          <div data-testid="form-signup">
            <h2 className="text-xl mb-6 text-center text-primary">Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="signUpEmail" className="block text-sm mb-2 text-primary">
                  Email
                </Label>
                <Input 
                  type="email" 
                  id="signUpEmail" 
                  name="email" 
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
                  placeholder="your@email.com"
                  data-testid="input-signup-email"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="signUpDisplayName" className="block text-sm mb-2 text-primary">
                  Display Name
                </Label>
                <Input 
                  type="text" 
                  id="signUpDisplayName" 
                  name="display_name" 
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
                  placeholder="Your artist name"
                  data-testid="input-signup-display-name"
                  required 
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="signUpPassword" className="block text-sm mb-2 text-primary">
                  Password
                </Label>
                <Input 
                  type="password" 
                  id="signUpPassword" 
                  name="password" 
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
                  placeholder="••••••••"
                  data-testid="input-signup-password"
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full retro-gradient py-3 rounded-lg text-lg hover:opacity-90 transition-opacity mb-4"
                data-testid="button-signup"
              >
                Create Account
              </Button>
            </form>

            <div className="text-center">
              <button 
                onClick={() => setAuthMode("signin")}
                className="text-primary hover:underline text-sm"
                data-testid="link-signin"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        )}

        {/* Forgot Password Form */}
        {authMode === "forgot" && (
          <div data-testid="form-forgot-password">
            <h2 className="text-xl mb-6 text-center text-primary">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label htmlFor="forgotEmail" className="block text-sm mb-2 text-primary">
                  Email
                </Label>
                <Input 
                  type="email" 
                  id="forgotEmail" 
                  name="email" 
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
                  placeholder="your@email.com"
                  data-testid="input-forgot-email"
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full retro-gradient py-3 rounded-lg text-lg hover:opacity-90 transition-opacity mb-4"
                data-testid="button-reset-password"
              >
                Send Reset Link
              </Button>
            </form>

            <div className="text-center">
              <button 
                onClick={() => setAuthMode("signin")}
                className="text-primary hover:underline text-sm"
                data-testid="link-back-signin"
              >
                Back to sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
