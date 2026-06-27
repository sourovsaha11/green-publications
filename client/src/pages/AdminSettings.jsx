import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSettings, updateSettings, updateAdminProfile } from '../services/api';
import toast from 'react-hot-toast';
import { HiArrowLeft } from 'react-icons/hi';
import { MdSave, MdPerson, MdSettings } from 'react-icons/md';

const AdminSettings = () => {
  const [site, setSite] = useState({ paymentNumber: '', paymentMethods: '', phone: '', address: '', fbLink: '' });
  const [profile, setProfile] = useState({ name: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    fetchSettings().then((res) => {
      const s = res.data;
      setSite({
        paymentNumber:  s.paymentNumber  || '',
        paymentMethods: s.paymentMethods || '',
        phone:          s.phone          || '',
        address:        s.address        || '',
        fbLink:         s.fbLink         || '',
      });
    }).catch(() => toast.error('Failed to load settings'));
  }, []);

  const handleSiteSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(site);
      toast.success('Site settings updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      return toast.error('New passwords do not match');
    }
    setSavingProfile(true);
    try {
      await updateAdminProfile({
        name: profile.name,
        email: profile.email,
        currentPassword: profile.currentPassword,
        newPassword: profile.newPassword,
      });
      toast.success('Profile updated!');
      setProfile({ name: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#222] text-white text-sm focus:outline-none focus:border-[#2ecc71] transition-all";
  const labelCls = "block text-xs font-semibold uppercase tracking-wider text-[#606060] mb-2";

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '32px' }}>
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-[#2ecc71] mb-8 transition-colors">
        <HiArrowLeft /> Back to Dashboard
      </Link>

      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Settings</h1>
      <p style={{ color: '#606060', fontSize: '14px', marginBottom: '40px' }}>Manage your site info and admin profile</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '1000px' }}>

        {/* ── Site Settings ── */}
        <div style={{ background: '#161616', border: '1px solid #222', borderRadius: '16px', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <MdSettings style={{ color: '#2ecc71', fontSize: '20px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Site Settings</h2>
          </div>

          <form onSubmit={handleSiteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className={labelCls}>Payment Number *</label>
              <input className={inputCls} value={site.paymentNumber}
                onChange={(e) => setSite({ ...site, paymentNumber: e.target.value })}
                placeholder="e.g. 01923507973" required />
              <p style={{ fontSize: '11px', color: '#606060', marginTop: '6px' }}>This number shows on the order form for customers to send payment</p>
            </div>
            <div>
              <label className={labelCls}>Payment Methods</label>
              <input className={inputCls} value={site.paymentMethods}
                onChange={(e) => setSite({ ...site, paymentMethods: e.target.value })}
                placeholder="e.g. bKash · Nagad · Rocket" />
            </div>
            <div>
              <label className={labelCls}>Contact Phone</label>
              <input className={inputCls} value={site.phone}
                onChange={(e) => setSite({ ...site, phone: e.target.value })}
                placeholder="e.g. 01923507973" />
            </div>
            <div>
              <label className={labelCls}>Address</label>
              <textarea className={inputCls} value={site.address} rows={2}
                onChange={(e) => setSite({ ...site, address: e.target.value })}
                placeholder="Office address" style={{ resize: 'none' }} />
            </div>
            <div>
              <label className={labelCls}>Facebook Page Link</label>
              <input className={inputCls} value={site.fbLink}
                onChange={(e) => setSite({ ...site, fbLink: e.target.value })}
                placeholder="https://facebook.com/..." />
            </div>
            <button type="submit" disabled={saving}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '8px', background: '#2ecc71', color: '#000', fontWeight: 700, fontSize: '14px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginTop: '8px' }}>
              <MdSave /> {saving ? 'Saving...' : 'Save Site Settings'}
            </button>
          </form>
        </div>

        {/* ── Admin Profile ── */}
        <div style={{ background: '#161616', border: '1px solid #222', borderRadius: '16px', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <MdPerson style={{ color: '#2ecc71', fontSize: '20px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Admin Profile</h2>
          </div>

          <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className={labelCls}>Name</label>
              <input className={inputCls} value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Admin name" />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" className={inputCls} value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="admin@email.com" />
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #222' }} />
            <p style={{ fontSize: '12px', color: '#606060' }}>Leave password fields empty if you don't want to change it</p>
            <div>
              <label className={labelCls}>Current Password</label>
              <input type="password" className={inputCls} value={profile.currentPassword}
                onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                placeholder="Current password" />
            </div>
            <div>
              <label className={labelCls}>New Password</label>
              <input type="password" className={inputCls} value={profile.newPassword}
                onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                placeholder="New password" />
            </div>
            <div>
              <label className={labelCls}>Confirm New Password</label>
              <input type="password" className={inputCls} value={profile.confirmPassword}
                onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                placeholder="Confirm new password" />
            </div>
            <button type="submit" disabled={savingProfile}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '8px', background: '#2ecc71', color: '#000', fontWeight: 700, fontSize: '14px', border: 'none', cursor: savingProfile ? 'not-allowed' : 'pointer', opacity: savingProfile ? 0.7 : 1, marginTop: '8px' }}>
              <MdSave /> {savingProfile ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;
