import { FiCamera } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

export default function ProfileSidebar({ formData, setFormData }) {
  return (
    <div className="space-y-6 relative">
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="mb-4">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback>{formData.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="outline" className="w-full">
            <FiCamera className="mr-2" /> Change Photo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">Preferences</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Currency</label>
            <select
              defaultValue="USD"
              onChange={(e) => console.log(e.target.value)}
              className="w-full border rounded-md p-2 text-sm"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <select
              defaultValue="en"
              onChange={(e) => console.log(e.target.value)}
              className="w-full border rounded-md p-2 text-sm"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Notifications</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push notifications</span>
                <Switch />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">Account Actions</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full">Download My Data</Button>
          <Button variant="destructive" className="w-full">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}