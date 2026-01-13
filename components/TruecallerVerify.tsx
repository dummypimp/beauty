import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2, ShieldAlert } from 'lucide-react';

interface TruecallerVerifyProps {
  phone: string;
  isVerified: boolean;
  onVerify: (success: boolean) => void;
  autoCheck?: boolean;
}

export const TruecallerVerify: React.FC<TruecallerVerifyProps> = ({ phone, isVerified, onVerify, autoCheck = false }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (autoCheck && !isVerified) {
      performVerification();
    }
  }, [autoCheck, isVerified, phone]);

  const performVerification = async () => {
    if (loading || isVerified) return;

    setLoading(true);
    setError(false);

    try {
      // Call the Netlify Function backend
      const response = await fetch('/.netlify/functions/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (data.success && data.isVerified) {
        onVerify(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center gap-1 text-truecaller font-semibold text-xs bg-blue-50 px-2 py-1 rounded-full border border-blue-100 animate-in fade-in duration-500">
        <ShieldCheck size={14} className="fill-truecaller text-white" />
        <span>Verified</span>
      </div>
    );
  }

  // If manually triggered or failed auto-check
  return (
    <button
      onClick={performVerification}
      disabled={loading || isVerified}
      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
        error 
          ? 'text-red-500 border border-red-200 bg-red-50' 
          : 'text-gray-500 border border-gray-200 hover:border-blue-200 hover:text-truecaller'
      }`}
      title="Verified by Truecaller Backend"
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin text-truecaller" />
      ) : error ? (
        <ShieldAlert size={14} />
      ) : (
        <ShieldCheck size={14} />
      )}
      <span>{loading ? 'Verifying...' : error ? 'Retry Verify' : 'Verify ID'}</span>
    </button>
  );
};