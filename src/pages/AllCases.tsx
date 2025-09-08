import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllCases, CaseData } from '@/lib/api';
import { Search, Users, Phone, User, FileText, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AllCases() {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [filteredCases, setFilteredCases] = useState<CaseData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await getAllCases();
        setCases(data);
        setFilteredCases(data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  useEffect(() => {
    const filtered = cases.filter(case_ =>
      case_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.personalInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCases(filtered);
  }, [searchTerm, cases]);

  const CaseCard = ({ case_ }: { case_: CaseData }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
      <>
        <Card className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 border-2 border-purple-600/40 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group rounded-xl overflow-hidden">
          <CardHeader className="pb-2 flex flex-col items-center">
            {case_.image && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-4">
                <img
                  src={`data:image/jpeg;base64,${case_.image}`}
                  alt={case_.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardTitle className="text-white text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6 text-purple-400" />
              {case_.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full font-semibold"
              onClick={() => setShowDetails(true)}
            >
              View Full Details
            </Button>
          </CardContent>
        </Card>

        {/* Modal for details */}
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-slate-900 rounded-xl p-8 max-w-md w-full shadow-2xl border-2 border-purple-600/40 relative">
              <button
                className="absolute top-2 right-2 text-white text-xl"
                onClick={() => setShowDetails(false)}
              >
                &times;
              </button>
              <div className="flex flex-col items-center mb-4">
                {case_.image && (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-4">
                    <img
                      src={`data:image/jpeg;base64,${case_.image}`}
                      alt={case_.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h2 className="text-white text-2xl font-bold mb-2">{case_.name}</h2>
              </div>
              <div className="space-y-2 text-gray-300">
                <div>
                  <span className="font-semibold">Father's Name:</span> {case_.fatherName}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {case_.phone}
                </div>
                {case_.birthMarks && (
                  <div>
                    <span className="font-semibold">Birth Marks:</span> {case_.birthMarks}
                  </div>
                )}
                <div>
                  <span className="font-semibold">Description:</span>
                  <p className="text-gray-400">{case_.personalInfo}</p>
                </div>
                <div>
                  <span className="font-semibold">Case ID:</span> #{case_.id}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-400" />
            All Missing Persons Cases
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Browse through all registered missing persons cases. Use the search to find specific individuals.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, father's name, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{cases.length}</div>
              <div className="text-gray-300">Total Cases</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{filteredCases.length}</div>
              <div className="text-gray-300">Matching Search</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Active Monitoring</div>
            </CardContent>
          </Card>
        </div>

        {/* Cases Grid */}
        {filteredCases.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm ? 'No matching cases found' : 'No cases registered yet'}
              </h3>
              <p className="text-gray-400">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse all cases.'
                  : 'Be the first to register a missing person case.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((case_) => (
              <CaseCard key={case_.id} case_={case_} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}