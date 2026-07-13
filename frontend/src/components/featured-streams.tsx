import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, Users } from 'lucide-react';

interface Stream {
  id: string;
  title: string;
  thumbnail?: string;
  viewerCount: number;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export function FeaturedStreams() {
  // Placeholder data - will be replaced with real API data
  const featuredStreams: Stream[] = [
    {
      id: '1',
      title: 'Building NovaLive - Live Coding Session',
      thumbnail: 'https://picsum.photos/seed/stream1/400/225',
      viewerCount: 1247,
      user: {
        id: 'user1',
        username: 'dev_creator',
        avatar: 'https://picsum.photos/seed/user1/40/40',
      },
    },
    {
      id: '2',
      title: 'Gaming with Friends - Valorant Ranked',
      thumbnail: 'https://picsum.photos/seed/stream2/400/225',
      viewerCount: 3421,
      user: {
        id: 'user2',
        username: 'gamer_pro',
        avatar: 'https://picsum.photos/seed/user2/40/40',
      },
    },
    {
      id: '3',
      title: 'Music Production Live - New Track Coming!',
      thumbnail: 'https://picsum.photos/seed/stream3/400/225',
      viewerCount: 892,
      user: {
        id: 'user3',
        username: 'music_maker',
        avatar: 'https://picsum.photos/seed/user3/40/40',
      },
    },
  ];

  return (
    <section className="w-full py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStreams.map((stream) => (
            <Card key={stream.id} className="group cursor-pointer transition-all hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="relative aspect-video rounded-t-lg overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(stream.viewerCount / 1000)}k viewers
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border border-background">
                    <AvatarImage src={stream.user.avatar} alt={stream.user.username} />
                    <AvatarFallback>{stream.user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold line-clamp-2 mb-1">
                      {stream.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{stream.user.username}</span>
                      <Users className="h-3 w-3" />
                      <span>{stream.viewerCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
