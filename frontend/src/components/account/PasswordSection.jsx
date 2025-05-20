import { FiLock } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function PasswordSection() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Change Password</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
            <div key={label} className="space-y-2">
              <label className="text-sm font-medium">{label}</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="password"
                  className="pl-10"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            </div>
          ))}
          <Button type="submit">Update Password</Button>
        </form>
      </CardContent>
    </Card>
  );
}