import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Sparkles, MapPin, Instagram, Phone, MessageCircle, Loader2, RefreshCcw, Search, ChevronDown } from 'lucide-react';
import { Contact, ContactStatus } from './types';
import { fetchInitialContacts } from './services/geminiService';
import { TruecallerVerify } from './components/TruecallerVerify';
import { GroupCreatorModal } from './components/GroupCreatorModal';

export default function App() {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [displayedContacts, setDisplayedContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  // Ref for intersection observer
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const data = await fetchInitialContacts();
    setAllContacts(data);
    setDisplayedContacts(data.slice(0, ITEMS_PER_PAGE));
    setLoading(false);
  };

  // Filter contacts based on search
  const filteredContacts = allContacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update displayed contacts when search or page changes
  useEffect(() => {
    const count = page * ITEMS_PER_PAGE;
    setDisplayedContacts(filteredContacts.slice(0, count));
  }, [searchTerm, page, allContacts]); // re-run if search or page changes

  // Infinite scroll handler
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && displayedContacts.length < filteredContacts.length) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading, displayedContacts.length, filteredContacts.length]);

  const handleVerify = (id: string) => {
    const updateState = (prev: Contact[]) => prev.map(c => 
      c.id === id ? { ...c, isVerified: true } : c
    );
    setAllContacts(updateState);
    setDisplayedContacts(updateState);
  };

  const handleStatusChange = (id: string, newStatus: ContactStatus) => {
    const updateState = (prev: Contact[]) => prev.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    );
    setAllContacts(updateState);
    setDisplayedContacts(updateState);
  };

  const stats = {
    total: allContacts.length,
    yes: allContacts.filter(c => c.status === ContactStatus.YES).length,
    pending: allContacts.filter(c => c.status === ContactStatus.PENDING).length
  };

  return (
    <div className="min-h-screen bg-rose-50/50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="text-rose-500 fill-rose-500" />
              LuxeList <span className="text-slate-400 font-light italic text-xl">Bangalore</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Curated Beauty Directory</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-slate-900 leading-none">{stats.total}</span>
                <span className="text-[10px] uppercase">Total</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-whatsapp leading-none">{stats.yes}</span>
                <span className="text-[10px] uppercase">Selected</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-whatsapp hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-green-200 transition flex items-center gap-2 text-sm"
            >
              <Phone size={16} />
              <span>Auto-Create Group</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 sm:text-sm shadow-sm transition"
            placeholder="Search by name, role, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="text-rose-400 animate-spin mb-4" />
            <p className="text-slate-500 animate-pulse">Curating the finest list for you...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayedContacts.map(contact => (
                <div key={contact.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col sm:flex-row gap-5 relative overflow-hidden group">
                  {/* Status Indicator Stripe */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    contact.status === ContactStatus.YES ? 'bg-whatsapp' : 
                    contact.status === ContactStatus.NO ? 'bg-red-400' : 'bg-gray-200'
                  }`} />

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img 
                      src={contact.avatarUrl} 
                      alt={contact.name} 
                      loading="lazy"
                      className="w-20 h-20 rounded-full object-cover border-4 border-rose-50 shadow-inner"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-800 truncate">{contact.name}</h3>
                        <p className="text-rose-600 text-xs font-semibold uppercase tracking-wide mb-1">{contact.role}</p>
                      </div>
                      
                      {/* Status Toggle */}
                      <div className="flex bg-gray-100 rounded-lg p-1">
                        {Object.values(ContactStatus).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(contact.id, status)}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${
                              contact.status === status
                                ? status === ContactStatus.YES ? 'bg-whatsapp text-white shadow'
                                : status === ContactStatus.NO ? 'bg-red-500 text-white shadow'
                                : 'bg-white text-gray-700 shadow'
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">{contact.bio}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} className="text-rose-400" />
                        <span className="truncate">{contact.location}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a 
                          href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs font-medium text-pink-600 hover:text-pink-700 bg-pink-50 px-2 py-1 rounded-full transition"
                        >
                          <Instagram size={12} />
                          {contact.instagram}
                        </a>

                        <TruecallerVerify 
                          phone={contact.phone} 
                          isVerified={contact.isVerified}
                          onVerify={(success) => success && handleVerify(contact.id)}
                          autoCheck={true}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <a 
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="group/phone flex items-center gap-2 font-mono text-sm text-slate-600 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 -ml-2 rounded-lg transition"
                        title="Call now"
                      >
                        <Phone size={14} className="text-slate-400 group-hover/phone:text-rose-500 transition" />
                        <span>{contact.phone}</span>
                      </a>

                      <a 
                        href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-whatsapp hover:text-green-700 font-semibold text-sm transition"
                      >
                        <span>Chat</span>
                        <MessageCircle size={18} className="fill-current" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lazy Load Sentinel */}
            {displayedContacts.length < filteredContacts.length && (
              <div ref={observerTarget} className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm animate-pulse">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Loading more contacts...</span>
                </div>
              </div>
            )}
            
            {/* End of list message */}
            {displayedContacts.length > 0 && displayedContacts.length === filteredContacts.length && (
              <div className="text-center py-10 text-slate-400 text-sm flex flex-col items-center gap-2">
                <Sparkles size={16} className="text-rose-300" />
                <span>You've reached the end of the list</span>
              </div>
            )}
          </>
        )}

        {!loading && filteredContacts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p>No contacts found matching your search.</p>
            <button 
              onClick={() => {setSearchTerm(''); setPage(1); loadContacts();}}
              className="mt-4 text-rose-500 flex items-center justify-center gap-2 mx-auto hover:underline"
            >
              <RefreshCcw size={16} /> Reload Data
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} LuxeList Bangalore. All rights reserved.</p>
        <p className="text-xs mt-2 max-w-md mx-auto">
          Truecaller verification is performed securely via Netlify Functions backend. Group creation requires manual copy-paste due to WhatsApp API privacy restrictions.
        </p>
      </footer>

      <GroupCreatorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        contacts={allContacts}
      />
    </div>
  );
}