import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCard } from "@/components/BadgeCard";
import { getBadges } from "@/api/badges";
import { useToast } from "@/hooks/useToast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Progress } from "@/components/ui/progress";

export function BadgeCollection() {
  const [loading, setLoading] = useState(true);
  const [badgeData, setBadgeData] = useState({
    badges: [],
    nextBadge: {
      id: "",
      name: "",
      icon: "",
      progress: 0
    }
  });
  const { toast } = useToast();

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const data = await getBadges();
      setBadgeData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch badges",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  const unlockedBadges = badgeData.badges.filter(badge => badge.unlocked);
  const lockedBadges = badgeData.badges.filter(badge => !badge.unlocked);

  return (
    <div className="space-y-6">
      {loading ? (
        <LoadingSpinner text="Loading badges..." />
      ) : (
        <>
          <Card className="ios-card">
            <CardHeader>
              <CardTitle>Your Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {unlockedBadges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    name={badge.name}
                    icon={badge.icon}
                    unlocked={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card">
            <CardHeader>
              <CardTitle>Badges in Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {lockedBadges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    name={badge.name}
                    icon={badge.icon}
                    unlocked={false}
                    progress={badge.progress}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card">
            <CardHeader>
              <CardTitle>Next Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <BadgeCard
                  name={badgeData.nextBadge.name}
                  icon={badgeData.nextBadge.icon}
                  unlocked={false}
                  progress={badgeData.nextBadge.progress}
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">{badgeData.nextBadge.name}</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{badgeData.nextBadge.progress}%</span>
                    </div>
                    <Progress value={badgeData.nextBadge.progress} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep up your energy-saving habits to unlock this badge!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}