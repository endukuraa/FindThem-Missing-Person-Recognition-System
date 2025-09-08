import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Phone, Mail, MessageCircle, Shield, Camera, Search, UserPlus, AlertTriangle, Clock } from 'lucide-react';

export default function Help() {
  const emergencyContacts = [
    { name: "Emergency Hotline", number: "911", description: "Immediate emergencies" },
    { name: "Missing Persons Unit", number: "1-800-MISSING", description: "Specialized missing persons support" },
    { name: "National Center", number: "1-800-THE-LOST", description: "24/7 missing persons helpline" },
  ];

  const faqs = [
    {
      question: "How does the face recognition system work?",
      answer: "Our AI-powered system analyzes facial features using advanced machine learning algorithms. It compares uploaded photos against our database to find potential matches with high accuracy rates."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use end-to-end encryption and follow strict privacy protocols. All data is stored securely and only used for missing persons identification purposes."
    },
    {
      question: "How accurate is the matching system?",
      answer: "Our system achieves over 85% accuracy in controlled conditions. However, photo quality, lighting, and angle can affect results. We recommend uploading multiple clear, recent photos."
    },
    {
      question: "What should I do if I find a match?",
      answer: "If you find a potential match, immediately contact the provided phone number and local authorities. Do not approach the person directly - let trained professionals handle the situation."
    },
    {
      question: "How long does it take to register a case?",
      answer: "Registration typically takes 2-5 minutes. The system processes photos immediately, and your case becomes searchable within minutes of submission."
    },
    {
      question: "Can I update information after registration?",
      answer: "Yes, you can contact our support team to update case information. We recommend keeping details current to improve matching accuracy."
    }
  ];

  const steps = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Register Missing Person",
      description: "Provide detailed information and clear photos of the missing person"
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Upload Quality Photos",
      description: "Use recent, clear photos from multiple angles for better recognition"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Search & Match",
      description: "Use our AI system to search for matches in the database"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Contact Authorities",
      description: "Report any matches to the appropriate authorities immediately"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="h-8 w-8 text-purple-400" />
              Help & Support Center
            </h1>
            <p className="text-gray-300 text-lg">
              Get help using our missing persons recognition system and find answers to common questions
            </p>
          </div>

          {/* Emergency Contacts */}
          <Card className="bg-red-500/10 backdrop-blur-sm border-red-500/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Emergency Contacts
              </CardTitle>
              <CardDescription className="text-gray-300">
                If this is an emergency, contact authorities immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                    <Phone className="h-8 w-8 text-red-400 mx-auto mb-2" />
                    <h3 className="text-white font-semibold">{contact.name}</h3>
                    <p className="text-2xl font-bold text-red-400 my-2">{contact.number}</p>
                    <p className="text-gray-300 text-sm">{contact.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-white">How Our System Works</CardTitle>
              <CardDescription className="text-gray-300">
                Follow these steps to effectively use our missing persons recognition platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-400">
                      {step.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-gray-300">
                Find answers to the most common questions about our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                    <AccordionTrigger className="text-white hover:text-gray-300">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Need More Help?</CardTitle>
              <CardDescription className="text-gray-300">
                Our support team is available 24/7 to assist you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-lg">
                  <Mail className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-300 mb-4">support@findthem.com</p>
                  <Badge variant="outline" className="border-blue-400/50 text-blue-400">
                    <Clock className="h-3 w-3 mr-1" />
                    24h response
                  </Badge>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg">
                  <Phone className="h-8 w-8 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-300 mb-4">1-800-SUPPORT</p>
                  <Badge variant="outline" className="border-green-400/50 text-green-400">
                    <Clock className="h-3 w-3 mr-1" />
                    24/7 available
                  </Badge>
                </div>
                
                <div className="text-center p-6 bg-white/5 rounded-lg">
                  <MessageCircle className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-300 mb-4">Instant messaging</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">Data Protection:</strong> All personal information is encrypted and stored securely following GDPR compliance standards.
                </p>
                <p>
                  <strong className="text-white">Photo Security:</strong> Uploaded photos are processed using secure algorithms and are not shared with unauthorized parties.
                </p>
                <p>
                  <strong className="text-white">Access Control:</strong> Only authorized personnel have access to the database, and all activities are logged and monitored.
                </p>
                <p>
                  <strong className="text-white">Data Retention:</strong> Information is retained only as long as necessary for identification purposes and can be removed upon request.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}