import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First name"
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
            />
            <Input
              label="Last name"
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
            />
          </div>
          <Input
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <Input
            label="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />
          <div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;