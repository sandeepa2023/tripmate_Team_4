import React, { useEffect, useState } from 'react';
import { Building2, Mail, Phone, Globe, MapPin, Tag, Trash2, Plus } from 'lucide-react';

const BASE_URL = 'http://localhost:8080/api/business';

const BusinessPage = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    telephone: '',
    website: '',
    description: '',
    category: '',
  });

  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusinesses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/all`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setBusinesses(data);
      } else {
        setBusinesses([]);
      }
    } catch (err) {
      console.error('Error fetching businesses', err);
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Business registered!');
        setForm({
          name: '',
          address: '',
          email: '',
          telephone: '',
          website: '',
          description: '',
          category: '',
        });
        fetchBusinesses();
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this business?')) return;
    setIsLoading(true);
    try {
      await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      fetchBusinesses();
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant': return '🍽️';
      case 'hotel': return '🏨';
      case 'tour-guide': return '🗺️';
      case 'transportation': return '🚗';
      case 'attraction': return '🎢';
      case 'shop': return '🛍️';
      case 'entertainment': return '🎭';
      default: return '🏢';
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Building2 className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Business Management</h1>
          </div>
          <p className="text-muted-foreground text-lg">Manage your business directory with ease</p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 space-y-8">
          <div className="flex items-center gap-2 text-xl font-semibold text-card-foreground">
            <Plus className="w-5 h-5 text-primary" />
            Register New Business
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Business Name', name: 'name', icon: <Building2 className="w-4 h-4 mr-2 text-muted-foreground" /> },
              { label: 'Address', name: 'address', icon: <MapPin className="w-4 h-4 mr-2 text-muted-foreground" /> },
              { label: 'Email', name: 'email', type: 'email', icon: <Mail className="w-4 h-4 mr-2 text-muted-foreground" /> },
              { label: 'Telephone', name: 'telephone', icon: <Phone className="w-4 h-4 mr-2 text-muted-foreground" /> },
              { label: 'Website (optional)', name: 'website', icon: <Globe className="w-4 h-4 mr-2 text-muted-foreground" /> },
            ].map(({ label, name, type = 'text', icon }) => (
              <div key={name}>
                <label className="text-sm font-medium flex items-center mb-1 text-card-foreground">{icon}{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full bg-input text-foreground placeholder-muted-foreground border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required={['name', 'address', 'email', 'telephone'].includes(name)}
                />
              </div>
            ))}

            <div>
              <label className="text-sm font-medium flex items-center mb-1 text-card-foreground">
                <Tag className="w-4 h-4 mr-2 text-muted-foreground" /> Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent [&>option]:bg-input [&>option]:text-foreground"
                required
              >
                <option value="" className="text-muted-foreground">Select Category</option>
                <option value="restaurant">🍽️ Restaurant</option>
                <option value="hotel">🏨 Hotel</option>
                <option value="tour-guide">🗺️ Tour Guide</option>
                <option value="transportation">🚗 Transportation</option>
                <option value="attraction">🎢 Attraction</option>
                <option value="shop">🛍️ Shop</option>
                <option value="entertainment">🎭 Entertainment</option>
                <option value="other">🏢 Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1 text-card-foreground">Description (optional)</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter business description"
              className="w-full bg-input text-foreground placeholder-muted-foreground border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registering...' : 'Register Business'}
          </button>
        </div>

        {/* Business List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Registered Businesses</h2>
            <span className="text-muted-foreground text-sm">{businesses.length} total</span>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">Loading businesses...</div>
          ) : businesses.length === 0 ? (
            <div className="text-center text-muted-foreground">No businesses found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((b) => (
                <div key={b.id} className="bg-card border border-border rounded-xl p-5 shadow hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(b.category)}</span>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{b.name}</h3>
                        <p className="text-xs text-muted-foreground">{b.category}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(b.id)} className="text-destructive hover:underline" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">{b.address}</p>
                  <p className="text-sm text-muted-foreground">{b.email}</p>
                  <p className="text-sm text-muted-foreground">{b.telephone}</p>
                  {b.website && (
                    <a
                      href={b.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline mt-1"
                    >
                      Visit Website
                    </a>
                  )}
                  {b.description && (
                    <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;