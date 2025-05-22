import { FiUser, FiMail } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function ProfileInformation({ formData, setFormData, isEditing, setIsEditing }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Profile Information</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-muted-foreground" />
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 border-t">
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}