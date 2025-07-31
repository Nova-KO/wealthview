import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { User, Bell, Moon, Sun, Lock, CheckCircle2, Shield, LogOut } from 'lucide-react';

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Anjali Jayadevan',
    email: 'anjali@wealthwise.ae',
    phone: '+971 50 123 4567',
    country: 'UAE',
  });
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    product: true,
    aiTips: true,
  });
  const [notifSuccess, setNotifSuccess] = useState('');
  const [theme, setTheme] = useState('light');
  const [themeSuccess, setThemeSuccess] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleProfileChange = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileSuccess('');
    setProfileError('');
  };

  const handleProfileSave = () => {
    if (!profile.name || !profile.email) {
      setProfileError('Name and email are required.');
      return;
    }
    setProfileSuccess('Profile updated successfully!');
    setTimeout(() => setProfileSuccess(''), 2000);
  };

  const handleNotifSave = () => {
    setNotifSuccess('Notification preferences updated!');
    setTimeout(() => setNotifSuccess(''), 2000);
  };

  const handleThemeSave = () => {
    setThemeSuccess(`Theme set to ${theme}`);
    setTimeout(() => setThemeSuccess(''), 2000);
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    if (password.length >= 6) {
      setPasswordChanged(true);
      setTimeout(() => setPasswordChanged(false), 1200);
      setPassword('');
    } else {
      setPasswordError('Password must be at least 6 characters.');
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    window.location.reload(); // Or call your logout logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-color-primary">Settings</h1>
          <p className="text-gray-600 mt-1">Customize your Wealthwise experience</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['profile', 'notifications', 'theme', 'security'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTab === tab
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'profile' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input name="name" value={profile.name} onChange={handleProfileChange} />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input name="email" value={profile.email} onChange={handleProfileChange} type="email" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input name="phone" value={profile.phone} onChange={handleProfileChange} />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <Input name="country" value={profile.country} onChange={handleProfileChange} />
              </div>
              <Button className="w-full button-finera-primary" onClick={handleProfileSave}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              {profileSuccess && <div className="text-green-600 text-sm text-center mt-2">{profileSuccess}</div>}
              {profileError && <div className="text-red-600 text-sm text-center mt-2">{profileError}</div>}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'notifications' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <Switch checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Alerts</span>
                <Switch checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <span>Product Updates</span>
                <Switch checked={notifications.product} onCheckedChange={v => setNotifications(n => ({ ...n, product: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <span>AI Tips & Insights</span>
                <Switch checked={notifications.aiTips} onCheckedChange={v => setNotifications(n => ({ ...n, aiTips: v }))} />
              </div>
              <Button className="w-full button-finera-primary" onClick={handleNotifSave}>
                <Bell className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
              {notifSuccess && <div className="text-green-600 text-sm text-center mt-2">{notifSuccess}</div>}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'theme' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>Switch between light and dark mode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                <span>Light</span>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={v => setTheme(v ? 'dark' : 'light')} />
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-blue-600" />
                <span>Dark</span>
              </div>
            </div>
            <Button className="w-full button-finera-primary mt-6" onClick={handleThemeSave}>
              <Badge className="mr-2" variant="secondary">{theme === 'dark' ? 'Dark' : 'Light'}</Badge>
              Apply Theme
            </Button>
            {themeSuccess && <div className="text-green-600 text-sm text-center mt-2">{themeSuccess}</div>}
          </CardContent>
        </Card>
      )}

      {selectedTab === 'security' && (
        <Card className="feature-card max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Change your password and manage security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <Button className="w-full button-finera-primary" onClick={handlePasswordChange}>
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              {passwordChanged && (
                <div className="flex items-center gap-2 text-green-600 mt-2">
                  <CheckCircle2 className="w-4 h-4" /> Password changed!
                </div>
              )}
              {passwordError && <div className="text-red-600 text-sm text-center mt-2">{passwordError}</div>}
              <div className="mt-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">2FA and advanced security coming soon.</span>
              </div>
              <Button className="w-full mt-4" variant="outline" onClick={() => setShowLogoutConfirm(true)}>
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
              {showLogoutConfirm && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <div className="mb-2 text-red-700 font-semibold">Are you sure you want to logout?</div>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
                    <Button className="button-finera-primary" onClick={handleLogout}>Logout</Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Settings; 