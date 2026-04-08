import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookUser, Calendar, Plus } from "lucide-react";

export default function CommunityPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Study Groups",
      description: "Find and join study groups for your courses. Collaborate on projects and prepare for exams together.",
      buttonText: "Browse Groups"
    },
    {
      icon: <BookUser className="h-8 w-8 text-primary" />,
      title: "Mentorship Program",
      description: "Connect with senior students and alumni for career guidance, interview preparation, and academic support.",
      buttonText: "Find a Mentor"
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Campus Events",
      description: "Stay updated on workshops, hackathons, guest lectures, and other college events.",
      buttonText: "View Calendar"
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Community & Mentorship</h1>
        <p className="text-muted-foreground">
          Connect, collaborate, and grow with your peers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-start gap-4">
                {feature.icon}
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="mt-2">{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> {feature.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>What's happening in the community right now.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Community feed and forums coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
