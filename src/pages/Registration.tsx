import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { registerPerson, PersonData } from '@/lib/api';
import { Loader2, UserPlus, Camera, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [formData, setFormData] = useState<PersonData>({
    name: '',
    fatherName: '',
    phone: '',
    birthMarks: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.fatherName || !formData.phone || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (photos.length === 0) {
      toast({
        title: "No Photos",
        description: "Please upload at least one photo.",
        variant: "destructive"
      });
      return;
    }

    if (photos.length > 10) {
      toast({
        title: "Too Many Photos",
        description: "You can upload a maximum of 10 photos.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const result = await registerPerson(formData, photos);
      
      if (result.success) {
        toast({
          title: "Registration Successful",
          description: `Case submitted successfully! ID: ${result.person_id}`,
        });
        
        // Reset form
        setFormData({
          name: '',
          fatherName: '',
          phone: '',
          birthMarks: '',
          description: ''
        });
        setPhotos([]);

        // Redirect to All Cases after a short delay
        setTimeout(() => {
          navigate('/all-cases');
        }, 1500); // 1.5 seconds delay for user to see the toast
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "An error occurred during registration.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Register New Missing Person
            </h1>
            <p className="text-gray-300 text-lg">
              Help us help you find your missing loved one by providing detailed information
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-300">
                Please provide accurate information to help with identification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherName" className="text-white">Father's Name *</Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="Enter father's name"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Contact Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter contact phone number"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthMarks" className="text-white">Birth Marks / Distinguishing Features</Label>
                  <Input
                    id="birthMarks"
                    name="birthMarks"
                    value={formData.birthMarks}
                    onChange={handleInputChange}
                    placeholder="Scars, tattoos, birthmarks, etc."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Personal Information / Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Physical description, last seen location, circumstances, etc."
                    required
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Photos * (Upload 5-10 clear face photos)
                  </Label>
                  <FileUpload
                    onFilesChange={setPhotos}
                    multiple
                    accept="image/*"
                    className="border-white/20"
                  />
                  <p className="text-sm text-gray-400">
                    Upload 5–10 clear face photos. Multiple angles help improve matching accuracy. Maximum 10 photos allowed.
                  </p>
                  {photos.length > 0 && (
                    <p className="text-sm text-green-400">
                      {photos.length} photo(s) selected
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Case...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Submit Case
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}