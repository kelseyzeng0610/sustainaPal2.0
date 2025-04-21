import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { addComment, likePost } from "@/api/posts";
import { cn } from "@/lib/utils";

interface Author {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
}

interface PostCardProps {
  id: string;
  author: Author;
  content: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export function PostCard({ id, author, content, likes, comments, timestamp }: PostCardProps) {
  const [postLikes, setPostLikes] = useState(likes);
  const [postComments, setPostComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  const handleLikePost = async () => {
    try {
      const response = await likePost(id);
      if (response.success) {
        setLiked(!liked);
        setPostLikes(liked ? postLikes - 1 : response.likes);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to like post",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const response = await addComment(id, newComment);
      if (response.success) {
        setPostComments([...postComments, response.comment]);
        setNewComment("");
        toast({
          title: "Success",
          description: "Comment added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy • h:mm a');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  };

  const displayedComments = showAllComments ? postComments : postComments.slice(0, 2);

  return (
    <Card className="ios-card">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-xs text-muted-foreground">{formatDate(timestamp)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm whitespace-pre-line">{content}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikePost}
              className="flex items-center space-x-1"
            >
              <Heart className={cn("h-4 w-4", liked && "fill-secondary text-secondary")} />
              <span>{postLikes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{postComments.length}</span>
            </Button>
          </div>
        </div>

        {postComments.length > 0 && (
          <>
            <Separator className="my-3" />
            <div className="space-y-3 w-full">
              {displayedComments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{getInitials(comment.author.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-2">
                      <p className="text-xs font-medium">{comment.author.name}</p>
                      <p className="text-xs">{comment.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(comment.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {postComments.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="text-xs"
                >
                  {showAllComments ? "Show less" : `Show all ${postComments.length} comments`}
                </Button>
              )}
            </div>
          </>
        )}

        <div className="flex items-center space-x-2 mt-3 w-full">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="text-sm ios-input"
          />
          <Button
            size="icon"
            onClick={handleAddComment}
            disabled={!newComment.trim() || isSubmitting}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}