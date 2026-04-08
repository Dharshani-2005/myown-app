import { user } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function ProfilePage() {
    const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
    const qrCode = PlaceHolderImages.find((p) => p.id === 'qr-code-whatsapp');

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Your Profile</h1>
                <p className="text-muted-foreground">
                    Manage your personal information and application settings.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your name, branch, and other details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} />}
                                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline">Change Photo</Button>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={user.email} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch">Branch</Label>
                                    <Input id="branch" defaultValue={user.branch} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input id="year" defaultValue={user.year} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="section">Section</Label>
                                    <Input id="section" defaultValue={user.section} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                                    <Input id="whatsapp" defaultValue={user.whatsapp} />
                                </div>
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>WhatsApp Assistant</CardTitle>
                            <CardDescription>Connect with Forge Flow on the go.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center text-center gap-4">
                            {qrCode && <Image src={qrCode.imageUrl} alt="WhatsApp QR Code" width={150} height={150} className="rounded-md" data-ai-hint={qrCode.imageHint}/>}
                            <p className="text-sm text-muted-foreground">
                                Scan this QR code or send 'JOIN' to our WhatsApp number to activate your assistant.
                            </p>
                            <Button variant="secondary" className="w-full">
                                Copy WhatsApp Number
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
