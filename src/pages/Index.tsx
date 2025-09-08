import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Shield, Heart, ArrowRight, Zap, Eye, Database } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "AI Face Recognition",
      description: "Advanced facial recognition technology to match missing persons with high accuracy",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Secure Database",
      description: "Encrypted storage of personal information with strict privacy protection",
      color: "bg-green-500/10 text-green-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Matching",
      description: "Instant face matching results with detailed similarity scores",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "GDPR compliant with end-to-end encryption and secure data handling",
      color: "bg-orange-500/10 text-orange-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Cases Registered" },
    { number: "85%", label: "Match Accuracy" },
    { number: "24/7", label: "System Availability" },
    { number: "50+", label: "Successful Reunions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
              <Heart className="h-4 w-4 mr-2" />
              Powered by AI Technology
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Missing Persons
              <br />
              <span className="text-4xl md:text-6xl">Recognition System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered facial recognition technology to help reunite families and find missing loved ones. 
              Secure, fast, and reliable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg">
                  Register Missing Person
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/match">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Find a Match
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cutting-Edge Technology
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform combines the latest in AI and machine learning to provide 
            the most accurate and efficient missing person identification system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of families using our platform to find their missing loved ones. 
            Every second counts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/all-cases">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                View All Cases
              </Button>
            </Link>
            <Link to="/help">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6">
                Get Help & Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}