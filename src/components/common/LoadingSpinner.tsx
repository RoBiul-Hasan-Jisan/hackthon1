import React from 'react';
import { cn } from '@/lib/utils'; // Assumed utility for class merging (like 'clsx' or 'tailwind-merge')

// --- 1. ENHANCED PROPS AND THEMATIC VARIANT ---

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // Added 'calm' variant for mental health theme
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'calm';
  className?: string;
  // Enhanced text props for more friendly messages
  text?: string;
  showText?: boolean;
  // Overlays with less harsh backdrop for better UX
  overlay?: boolean;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

// Refined colors for a mental health context (e.g., 'calm' variant)
const variantClasses = {
  default: 'text-gray-600',
  primary: 'text-indigo-600', // Changed blue to indigo for a calmer feel
  secondary: 'text-gray-400',
  success: 'text-green-500', // Lighter green
  warning: 'text-yellow-500',
  error: 'text-red-500',
  calm: 'text-teal-500', // New thematic color for relaxation
};

// --- 2. MAIN SPINNER COMPONENT (LoadingSpinner) ---

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'calm', // Default to 'calm' for the hackathon theme
  className,
  text,
  showText = true, // Default to showing text for a more reassuring UX
  overlay = false,
  fullScreen = false
}) => {
  const finalVariant = variant === 'default' ? 'calm' : variant; // Ensure 'calm' is prioritized
  const finalText = text || (finalVariant === 'calm' ? 'Taking a deep breath...' : 'Loading...');
  
  const spinner = (
    <div className={cn(
      "flex items-center justify-center transition-opacity duration-300",
      // Slightly softer backdrop-color for fullScreen/overlay
      overlay && "absolute inset-0 bg-white/70 backdrop-blur-sm z-40",
      fullScreen && "fixed inset-0 bg-white/80 backdrop-blur-sm z-50",
      className
    )}>
      <div className={cn(
        "flex flex-col items-center justify-center p-8 rounded-lg",
        // Optional: Add a subtle shadow for better contrast on fullScreen/overlay
        (overlay || fullScreen) && "shadow-lg bg-white/90"
      )}>
        <svg
          className={cn(
            "animate-spin",
            sizeClasses[size],
            variantClasses[finalVariant]
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          {/* Subtle change: make the background circle a slightly lighter color */}
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            style={{ stroke: variantClasses[finalVariant].replace('text-', 'var(--tw-text-opacity, 0.25) ') }} // Use inline style to apply opacity to the stroke color
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {showText && (
          <p className={cn(
            "mt-3 text-base font-semibold tracking-wide", // Slightly larger and bolder text
            variantClasses[finalVariant],
            size === 'sm' && "text-sm mt-1",
            size === 'lg' && "text-lg mt-4",
            size === 'xl' && "text-xl mt-4"
          )}>
            {finalText}
          </p>
        )}
      </div>
    </div>
  );

  return spinner;
};

// --- 3. PULSE SPINNER (Slightly more rhythmic/calming) ---

export const PulseSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'calm',
  className,
  text,
  showText = true
}) => {
    const finalVariant = variant === 'default' ? 'calm' : variant;
    const finalText = text || 'Finding clarity...';

  const pulseSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-6 h-6'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-1 sm:space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                "rounded-full animate-pulse",
                pulseSizeClasses[size],
                // Use background color for dots/pulses
                variantClasses[finalVariant].replace('text-', 'bg-')
              )}
              style={{
                animationDelay: `${index * 0.2}s`, // Slower, gentler delay
                animationDuration: '2s' // Slower duration for a calmer 'heartbeat' feel
              }}
            />
          ))}
        </div>
        {showText && (
          <p className={cn(
            "mt-3 text-sm font-medium",
            variantClasses[finalVariant]
          )}>
            {finalText}
          </p>
        )}
      </div>
    </div>
  );
};

// --- 4. SKELETON LOADER (Content Pre-load) ---

export const SkeletonLoader: React.FC<{
  className?: string;
  count?: number;
  height?: string;
  // Added 'rounded' for a softer, friendlier look
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}> = ({
  className,
  count = 1,
  height = 'h-4',
  rounded = 'md'
}) => {
    const roundedClasses = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    };
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "bg-gray-200 animate-pulse mb-2",
            roundedClasses[rounded], // Use the new rounded prop
            height,
            // Vary the width slightly for a more natural text look
            index % 3 === 1 && 'w-11/12',
            index % 3 === 2 && 'w-5/6'
          )}
          style={{
            animationDelay: `${index * 0.15}s`
          }}
        />
      ))}
    </div>
  );
};

// --- 5. EXPORT DEFAULT (Kept for convenience) ---

export default LoadingSpinner;