import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/api/posts";
import { useToast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";

export function CommunityPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data.posts);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Card className="ios-card">
      <CardHeader>
        <CardTitle>Community Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
                timestamp={post.timestamp}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}