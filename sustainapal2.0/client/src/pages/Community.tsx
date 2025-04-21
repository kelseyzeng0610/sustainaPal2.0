import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardItem } from "@/components/LeaderboardItem";
import { CommunityPosts } from "@/components/CommunityPosts";
import { getLeaderboard } from "@/api/energy";
import { useToast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";

export function Community() {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState({
    leaderboard: [],
    currentUser: { id: "", position: 0 }
  });
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard();
      setLeaderboardData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch leaderboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Campus Community</h1>

      <Tabs defaultValue="leaderboard">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard" className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Card className="ios-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Energy Savers This Week</CardTitle>
                  <Tabs defaultValue="friends" className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2 bg-secondary/20">
                      <TabsTrigger value="friends">Friends</TabsTrigger>
                      <TabsTrigger value="nearby">Nearby</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboardData.leaderboard.map((user, index) => (
                    <LeaderboardItem
                      key={user.id}
                      name={user.name}
                      avatar={user.avatar}
                      savings={user.savings}
                      position={index + 1}
                      isCurrentUser={user.id === leaderboardData.currentUser.id}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="posts" className="mt-6">
          <CommunityPosts />
        </TabsContent>
      </Tabs>
    </div>
  );
}