import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  QrCode, 
  MapPin, 
  Calendar,
  FlaskConical,
  Truck,
  Building2,
  Sprout,
  CheckCircle,
  Star,
  MessageSquare,
  Award,
  Shield
} from "lucide-react";

const ConsumerScan = () => {
  const [scannedProduct, setScannedProduct] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  // Mock product data
  const productData = {
    masterBatchId: "MB2024001",
    productName: "Premium Turmeric Powder",
    manufacturer: "Organic Solutions Ltd.",
    packagingDate: "2024-01-10",
    expiryDate: "2024-12-10",
    
    // Supply chain journey
    journey: [
      {
        stage: "Farm",
        actor: "Green Valley Farms",
        location: "Himachal Pradesh, India",
        date: "2023-11-15",
        batchId: "FB001",
        icon: Sprout,
        details: {
          soilType: "Rich Loamy Soil",
          organicCertified: true,
          harvestMethod: "Hand-picked"
        }
      },
      {
        stage: "Collection",
        actor: "Mountain Logistics AEO",
        location: "Collection Center, HP",
        date: "2023-11-20",
        batchId: "CB001",
        icon: Truck,
        details: {
          storageTemp: "20-25°C",
          humidity: "45-55%",
          transitTime: "2 days"
        }
      },
      {
        stage: "Testing",
        actor: "Quality Labs India",
        location: "Certified Lab, Delhi",
        date: "2023-11-25",
        batchId: "TB001",
        icon: FlaskConical,
        details: {
          moistureContent: "8.5%",
          pesticideTest: "PASSED",
          dnaAuthenticity: "VERIFIED",
          curcuminContent: "6.2%",
          overallScore: 95
        }
      },
      {
        stage: "Manufacturing",
        actor: "Organic Solutions Ltd.",
        location: "Processing Unit, Punjab",
        date: "2023-12-05",
        batchId: "MB2024001",
        icon: Building2,
        details: {
          processingMethod: "Cold Grinding",
          qualityCheck: "PASSED",
          packagingStandard: "Food Grade"
        }
      }
    ],
    
    // Test results summary
    testResults: {
      overall: 95,
      moisture: "8.5%",
      pesticides: "Not Detected",
      curcumin: "6.2%",
      authenticity: "100% Pure Turmeric"
    },
    
    // Previous feedback
    consumerFeedback: [
      { rating: 5, comment: "Excellent quality, very aromatic!", date: "2024-01-08" },
      { rating: 4, comment: "Good product, packaging could be better", date: "2024-01-07" },
      { rating: 5, comment: "Pure and natural taste", date: "2024-01-06" }
    ]
  };

  const handleScan = () => {
    // Simulate QR code scan
    setScannedProduct("MB2024001");
  };

  const handleFeedbackSubmit = () => {
    // Handle feedback submission
    console.log("Feedback submitted:", { rating, feedback });
    // Reset form
    setRating(0);
    setFeedback("");
    // Show success message (could be replaced with toast)
    alert("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <QrCode className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Traceability Scanner
          </h1>
          <p className="text-xl text-white/90">
            Scan the QR code on your product to see its complete journey
          </p>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {!scannedProduct ? (
            // QR Scanner Interface
            <div className="text-center">
              <Card className="max-w-md mx-auto">
                <CardContent className="p-12">
                  <div className="w-32 h-32 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <QrCode className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Ready to Scan
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Point your camera at the QR code on the product packaging
                  </p>
                  <Button 
                    onClick={handleScan}
                    className="w-full bg-gradient-primary"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Start Scanning
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Or enter Master Batch ID manually
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Product Information Display
            <div className="space-y-8">
              {/* Product Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-foreground">
                        {productData.productName}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Master Batch ID: {productData.masterBatchId}
                      </p>
                    </div>
                    <Badge className="bg-gradient-success text-white px-4 py-2">
                      <Shield className="w-4 h-4 mr-2" />
                      Verified Authentic
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Manufacturer</p>
                      <p className="font-semibold text-foreground">{productData.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Packaged On</p>
                      <p className="font-semibold text-foreground">{productData.packagingDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expires On</p>
                      <p className="font-semibold text-foreground">{productData.expiryDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supply Chain Journey */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Supply Chain Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {productData.journey.map((step, index) => {
                      const IconComponent = step.icon;
                      return (
                        <div key={index} className="relative">
                          {index < productData.journey.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold text-foreground">{step.stage}</h4>
                                  <p className="text-sm text-muted-foreground">{step.actor}</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant="outline">{step.batchId}</Badge>
                                  <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <MapPin className="w-4 h-4 mr-1" />
                                {step.location}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                {Object.entries(step.details).map(([key, value]) => (
                                  <div key={key}>
                                    <p className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <p className="font-medium text-foreground">
                                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Test Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FlaskConical className="w-5 h-5 mr-2" />
                    Quality Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-2">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                      <p className="text-2xl font-bold text-foreground">{productData.testResults.overall}/100</p>
                    </div>
                    {Object.entries(productData.testResults).filter(([key]) => key !== 'overall').map(([key, value]) => (
                      <div key={key} className="text-center">
                        <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="font-semibold text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Consumer Feedback */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Leave Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Leave Your Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">Rate this product:</p>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="text-2xl transition-colors"
                          >
                            <Star 
                              className={`w-8 h-8 ${
                                star <= rating ? 'text-warning fill-current' : 'text-muted-foreground'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Textarea
                        placeholder="Share your experience with this product..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button 
                      onClick={handleFeedbackSubmit}
                      disabled={rating === 0}
                      className="w-full bg-gradient-primary"
                    >
                      Submit Feedback
                    </Button>
                  </CardContent>
                </Card>

                {/* Previous Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {productData.consumerFeedback.map((review, index) => (
                        <div key={index} className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating ? 'text-warning fill-current' : 'text-muted-foreground'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Scan Another Product */}
              <div className="text-center">
                <Button 
                  onClick={() => setScannedProduct(null)}
                  variant="outline"
                  className="px-8"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan Another Product
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerScan;