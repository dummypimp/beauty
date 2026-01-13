import React, { useState } from 'react';
import { X, Users, Copy, Check, ExternalLink } from 'lucide-react';
import { Contact, ContactStatus } from '../types';

interface GroupCreatorModalProps {
  contacts: Contact[];
  isOpen: boolean;
  onClose: () => void;
}

export const GroupCreatorModal: React.FC<GroupCreatorModalProps> = ({ contacts, isOpen, onClose }) => {
  const [adminNumber, setAdminNumber] = useState('');
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const validContacts = contacts.filter(c => c.status === ContactStatus.YES);

  const handleCreate = () => {
    // WhatsApp doesn't allow programmatic group creation with members via URL scheme.
    // The flow is: User copies numbers -> Opens WhatsApp -> Creates Group -> Pastes numbers.
    setStep(2);
  };

  const copyNumbers = () => {
    const numbers = validContacts.map(c => c.phone).join(',');
    navigator.clipboard.writeText(numbers);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const launchWhatsApp = () => {
    // We can open a chat with the admin number as a starting point
    // or just open web.whatsapp.com
    const cleanAdmin = adminNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanAdmin}?text=Creating%20LuxeList%20Group`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-whatsapp p-4 flex justify-between items-center text-white">
          <h2 className="font-serif font-bold text-lg flex items-center gap-2">
            <Users size={20} />
            Auto Group Creator
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Found <strong className="text-whatsapp">{validContacts.length}</strong> contacts marked as 
                <span className="inline-block px-2 py-0.5 mx-1 rounded bg-green-100 text-green-800 text-xs font-bold">YES</span>.
              </p>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Group Admin Number (You)</label>
                <input 
                  type="text" 
                  value={adminNumber}
                  onChange={(e) => setAdminNumber(e.target.value)}
                  placeholder="+91 99999 99999"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                <strong>Note:</strong> Due to WhatsApp privacy policies, automated group creation via web is restricted. We will help you copy the numbers to create the group quickly.
              </div>

              <button 
                onClick={handleCreate}
                disabled={validContacts.length === 0}
                className="w-full bg-whatsapp hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Launch
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 text-whatsapp rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">Ready to Create</h3>
                <p className="text-xs text-gray-500 mt-1">Copy the number list below and paste it when adding participants in WhatsApp.</p>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg text-xs font-mono text-gray-600 break-all max-h-32 overflow-y-auto">
                {validContacts.map(c => c.phone).join(', ')}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={copyNumbers}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy List'}
                </button>
                <button 
                  onClick={launchWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-whatsapp text-white py-2 rounded-lg text-sm hover:bg-green-600 transition"
                >
                  <ExternalLink size={16} />
                  Open WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};