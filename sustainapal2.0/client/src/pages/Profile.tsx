import React, { useEffect, useState } from 'react';
import { getProfileData, updateUserSettings } from '@/api/profile';
import { PageTitle } from '@/components/PageTitle';
import { UserProfile, Achievement, Badge } from '@/types';
import { User, Award, Settings, LogOut, DollarSign, Leaf, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState('daily');
  const [reminderTime, setReminderTime] = useState('evening');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const data = await getProfileData();
        setProfile(data.user);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load profile data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [toast]);

  const handleUpdateSettings = async () => {
    try {
      const result = await updateUserSettings({
        notificationFrequency,
        reminderTime
      });
      
      if (result.success) {
        toast({
          title: "Settings Updated",
          description: "Your preferences have been saved",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const calculateLevelProgress = () => {
    if (!profile) return 0;
    // Level progress calculation (simulated)
    const pointsForCurrentLevel = profile.level * 100;
    const pointsForNextLevel = (profile.level + 1) * 100;
    const pointsNeeded = pointsForNextLevel - pointsForCurrentLevel;
    const currentPoints = profile.points - pointsForCurrentLevel;
    return Math.floor((currentPoints / pointsNeeded) * 100);
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Profile"
        description="Manage your account and track your progress"
        icon={User}
      />

      {profile && (
        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-slate-500 dark:text-slate-400">{profile.email}</p>
                  <div className="flex items-center mt-2 mb-4 gap-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Level {profile.level}
                    </span>
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
                      {profile.streak} Day Streak
                    </span>
                  </div>
                  <div className="w-full space-y-1 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Level Progress</span>
                      <span>{calculateLevelProgress()}%</span>
                    </div>
                    <Progress value={calculateLevelProgress()} className="h-2" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-500">${profile.totalSaved.money.toFixed(2)}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Money Saved</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pink-500">{profile.totalSaved.carbon.toFixed(1)}kg</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Carbon Saved</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-500">{profile.totalSaved.energy.toFixed(1)}kWh</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Energy Saved</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5 text-pink-500" />
                  <span>Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {profile.badges.map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center text-center">
                      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-2">
                        <span className="text-3xl">{badge.icon}</span>
                      </div>
                      <p className="text-sm font-medium">{badge.name}</p>
                    </div>
                  ))}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-2 opacity-50">
                      <span className="text-3xl">🔒</span>
                    </div>
                    <p className="text-sm font-medium text-slate-400">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4 space-y-6">
            <Tabs defaultValue="achievements">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="achievements" className="space-y-4 pt-4">
                {profile.achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.completed ? "border-green-200 dark:border-green-800" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.completed && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded dark:bg-green-900 dark:text-green-300">
                            Completed
                          </span>
                        )}
                      </div>
                      {!achievement.completed && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress} / {achievement.max}</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.max) * 100} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notification-frequency">Notification Frequency</Label>
                      <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                        <SelectTrigger id="notification-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="few-times-week">A few times a week</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reminder-time">Preferred Reminder Time</Label>
                      <Select value={reminderTime} onValueChange={setReminderTime}>
                        <SelectTrigger id="reminder-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8AM-10AM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM-2PM)</SelectItem>
                          <SelectItem value="evening">Evening (6PM-8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <Switch
                        id="dark-mode"
                        checked={isDarkMode}
                        onCheckedChange={setIsDarkMode}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button
                  className="w-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600"
                  onClick={handleUpdateSettings}
                >
                  Save Settings
                </Button>
              </TabsContent>

              <TabsContent value="account" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Information</CardTitle>
                    <CardDescription>Manage your profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input id="name" defaultValue={profile.name} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue={profile.email} disabled />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="joined">Member Since</Label>
                      <Input
                        id="joined"
                        defaultValue={new Date(profile.joinDate).toLocaleDateString()}
                        disabled
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}