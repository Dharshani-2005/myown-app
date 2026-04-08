import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { ArrowRight, Bot, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'landing-hero-1');

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: 'Academic Organizer',
      description: 'Manage timetables, deadlines, and exam schedules in one place.',
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Personal Note-Taking',
      description: 'Capture notes with Markdown, code snippets, and math formulas.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'AI Study Tools',
      description: 'Generate video scripts, mock tests, and flashcards from your notes.',
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: 'Smart Career Compass',
      description: 'Find jobs, track applications, and get AI-driven role recommendations.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-8 pb-8 pt-6 md:py-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <h1 className="font-headline text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              The All-in-One Super App for Engineering Students
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
              From lecture schedules and AI-powered study tools to smart job matching and interview coaching, Forge Flow is the ultimate platform to forge your path to success.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
          <div className="relative mx-auto mt-8 w-full max-w-6xl">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={675}
                className="rounded-xl border shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </section>

        <section id="features" className="container space-y-8 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Features</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Forge Flow is packed with features designed to help you excel academically and professionally.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-6xl md:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center justify-start gap-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex items-center justify-between">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Built for the next generation of engineers.
          </p>
          <p className="text-sm text-muted-foreground">&copy; 2024 Forge Flow</p>
        </div>
      </footer>
    </div>
  );
}
