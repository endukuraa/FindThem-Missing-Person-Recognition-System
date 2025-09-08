import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { matchPerson, MatchResult } from '@/lib/api';
import { Search, Loader2, CheckCircle, XCircle, User, Phone, FileText, Zap, Eye } from 'lucide-react';

export default function Match() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePhotoChange = (files: File[]) => {
    const selectedFile = files[0] || null;
    setPhoto(selectedFile);
    setResult(null);
    setHasSearched(false);
    
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleMatch = async () => {
    if (!photo) {
      toast({
        title: "No Photo Selected",
        description: "Please upload a photo to search for matches.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setHasSearched(false);

    try {
      const matchResult = await matchPerson(photo);
      setResult(matchResult);
      setHasSearched(true);

      if (matchResult.matchFound) {
        const confidence = matchResult.cosineSimilarity || 
                          (matchResult.distance ? (100 * (1 - matchResult.distance)) : 0);
        toast({
          title: "Match Found!",
          description: `Found a potential match with ${confidence.toFixed(1)}% confidence.`,
        });
      } else {
        toast({
          title: "No Match Found",
          description: "No matching person found in our database.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getConfidence = (result: MatchResult) => {
    if (result.cosineSimilarity) return result.cosineSimilarity;
    if (result.distance) return (100 * (1 - result.distance));
    return 0;
  };

  const getSimilarityColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getSimilarityBadgeVariant = (confidence: number) => {
    if (confidence >= 90) return 'default';
    if (confidence >= 80) return 'secondary';
    return 'outline';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Search className="h-8 w-8 text-purple-400" />
              Find a Missing Person
            </h1>
            <p className="text-gray-300 text-lg">
              Upload a photo to search for matching persons in our database using AI-powered facial recognition
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Upload Found Person's Photo
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Upload a clear photo of the person you want to find. Our AI will analyze facial features for matching.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FileUpload
                  onFilesChange={handlePhotoChange}
                  accept="image/*"
                  maxSize={10485760} // 10MB
                  className="border-white/20"
                />

                {/* Preview */}
                {preview && (
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Preview:</h4>
                    <div className="flex justify-center">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-40 h-40 object-cover rounded-lg border-2 border-white/20"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Tips for better results:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Use clear, well-lit photos</li>
                    <li>• Ensure the face is clearly visible</li>
                    <li>• Avoid blurry or low-quality images</li>
                    <li>• Front-facing photos work best</li>
                  </ul>
                </div>

                <Button
                  onClick={handleMatch}
                  disabled={!photo || loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      🔍 Searching...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Search for Match
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  {result?.matchFound ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : hasSearched ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  Search Results
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {!hasSearched 
                    ? "Results will appear here after searching"
                    : result?.matchFound 
                      ? "✅ Match Found!"
                      : "❌ No match found"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!hasSearched && !loading && (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Upload a photo and click search to see results</p>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-12">
                    <Loader2 className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-spin" />
                    <p className="text-white">🔍 Searching...</p>
                    <p className="text-gray-400 text-sm mt-2">Analyzing facial features...</p>
                  </div>
                )}

                {hasSearched && result && !result.matchFound && (
                  <div className="text-center py-12">
                    <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">❌ No Match Found</h3>
                    <p className="text-gray-400 mb-4">
                      No matching person found in our database. The person may not be registered yet.
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full">
                      Register New Case
                    </Button>
                  </div>
                )}

                {hasSearched && result?.matchFound && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={getSimilarityBadgeVariant(getConfidence(result))}
                        className="text-lg px-4 py-2"
                      >
                        <span className={getSimilarityColor(getConfidence(result))}>
                          {getConfidence(result).toFixed(1)}% Match
                        </span>
                      </Badge>
                      {result.euclideanDistance && (
                        <div className="text-right text-sm text-gray-400">
                          Distance: {result.euclideanDistance}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white">
                        <User className="h-5 w-5 text-purple-400" />
                        <div>
                          <span className="font-medium">Name:</span>
                          <span className="ml-2 text-lg">{result.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white">
                        <User className="h-5 w-5 text-blue-400" />
                        <div>
                          <span className="font-medium">Father's Name:</span>
                          <span className="ml-2">{result.fatherName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white">
                        <Phone className="h-5 w-5 text-green-400" />
                        <div>
                          <span className="font-medium">Phone:</span>
                          <span className="ml-2">{result.phone}</span>
                        </div>
                      </div>

                      {result.birthMarks && (
                        <div className="flex items-start gap-3 text-white">
                          <Badge variant="outline" className="border-orange-400/50 text-orange-400 mt-1">
                            Birth Marks
                          </Badge>
                          <span>{result.birthMarks}</span>
                        </div>
                      )}

                      <div className="flex items-start gap-3 text-white">
                        <FileText className="h-5 w-5 text-purple-400 mt-1" />
                        <div>
                          <span className="font-medium block mb-2">Details:</span>
                          <p className="text-gray-300 leading-relaxed">
                            {result.personalInfo || result.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Contact & Report Match
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}