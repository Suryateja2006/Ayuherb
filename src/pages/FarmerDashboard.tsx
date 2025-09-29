import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sprout, 
  MapPin, 
  Trophy, 
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Clock,
  Award
} from "lucide-react";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [herbForm, setHerbForm] = useState({
    type: "",
    quantity: "",
    description: "",
    auctionStart: "",
    auctionEnd: ""
  });

  const [registeredHerbs, setRegisteredHerbs] = useState([
    {
      id: "RH001",
      type: "Organic Turmeric",
      quantity: "500 kg",
      status: "Registered - Awaiting Testing",
      registeredAt: "2024-01-14"
    }
  ]);

  const mockData = {
    farmer: {
      name: "Green Valley Farms",
      location: "Himachal Pradesh, India",
      rank: 3,
      totalBatches: 24,
      qualityScore: 92,
      totalEarnings: 425000
    },
    herbs: [
      {
        id: "HB001",
        type: "Organic Turmeric",
        quantity: "500 kg",
        status: "In Auction",
        currentBid: "₹45,000",
        auctionEnds: "2024-01-15",
        testScore: 95
      },
      {
        id: "HB002",
        type: "Ashwagandha Root",
        quantity: "200 kg",
        status: "Testing",
        testScore: null
      }
    ],
    leaderboard: [
      { rank: 1, name: "Mountain Herbs Co.", score: 98 },
      { rank: 2, name: "Organic Valley", score: 94 },
      { rank: 3, name: "Green Valley Farms", score: 92 },
      { rank: 4, name: "Pure Earth Farms", score: 89 }
    ]
  };

  const handleHerbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHerb = {
      id: `RH${Date.now().toString().slice(-3)}`,
      type: herbForm.type,
      quantity: herbForm.quantity + " kg",
      status: "Registered - Awaiting Testing",
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setRegisteredHerbs([...registeredHerbs, newHerb]);
    setHerbForm({
      type: "",
      quantity: "",
      description: "",
      auctionStart: "",
      auctionEnd: ""
    });
    alert("Herb batch registered successfully! It will be sent for testing first.");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Farmer Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {mockData.farmer.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                {mockData.farmer.location}
              </Badge>
              <Badge className="bg-gradient-success px-4 py-2 text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Rank #{mockData.farmer.rank}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sprout className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Total Batches</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.farmer.totalBatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Award className="w-6 h-6 text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Quality Score</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.farmer.qualityScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Current Bids</p>
                  <p className="text-2xl font-bold text-foreground">₹45,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-foreground">₹{mockData.farmer.totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "register", label: "Register Herbs" },
            { id: "leaderboard", label: "Leaderboard" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="px-6"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registered Herbs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Recently Registered Herbs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registeredHerbs.map((herb) => (
                    <div key={herb.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{herb.type}</h4>
                          <p className="text-sm text-muted-foreground">ID: {herb.id}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {herb.quantity}</p>
                          <p className="text-sm text-muted-foreground">Registered: {herb.registeredAt}</p>
                        </div>
                        <Badge variant="secondary">
                          {herb.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-foreground">In Auction</h4>
                  {mockData.herbs.map((herb) => (
                    <div key={herb.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{herb.type}</h4>
                          <p className="text-sm text-muted-foreground">ID: {herb.id}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {herb.quantity}</p>
                        </div>
                        <Badge 
                          variant={herb.status === "In Auction" ? "default" : "secondary"}
                        >
                          {herb.status}
                        </Badge>
                      </div>
                      
                      {herb.currentBid && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Current Bid:</span>
                          <span className="font-semibold text-accent">{herb.currentBid}</span>
                        </div>
                      )}
                      
                      {herb.testScore && (
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">Quality Score:</span>
                          <Badge className="bg-gradient-success text-white">
                            {herb.testScore}/100
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Quality Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.leaderboard.map((farmer) => (
                    <div 
                      key={farmer.rank} 
                      className={`p-3 rounded-lg flex justify-between items-center ${
                        farmer.name === mockData.farmer.name ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          farmer.rank <= 3 ? 'bg-gradient-primary text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {farmer.rank}
                        </div>
                        <span className="font-medium text-foreground">{farmer.name}</span>
                      </div>
                      <Badge className="bg-gradient-success text-white">
                        {farmer.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "register" && (
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Register New Herb Batch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHerbSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="type">Herb Type</Label>
                  <Input
                    id="type"
                    value={herbForm.type}
                    onChange={(e) => setHerbForm({...herbForm, type: e.target.value})}
                    placeholder="e.g., Organic Turmeric"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={herbForm.quantity}
                    onChange={(e) => setHerbForm({...herbForm, quantity: e.target.value})}
                    placeholder="500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={herbForm.description}
                    onChange={(e) => setHerbForm({...herbForm, description: e.target.value})}
                    placeholder="Additional details about the herb batch..."
                    rows={3}
                  />
                </div>

                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Note about Auction Dates</h4>
                  <p className="text-sm text-muted-foreground">
                    Auction dates can only be set after testing is completed. 
                    Your herb will first be sent for testing, and once results are available, 
                    you can then set the auction timing.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Register Herb Batch
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "leaderboard" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Farmer Quality Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.leaderboard.map((farmer) => (
                  <div 
                    key={farmer.rank} 
                    className={`p-6 rounded-lg border-2 transition-all ${
                      farmer.name === mockData.farmer.name 
                        ? 'border-primary bg-primary/5 shadow-custom-md' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                          farmer.rank === 1 ? 'bg-gradient-primary text-white' :
                          farmer.rank === 2 ? 'bg-gradient-accent text-white' :
                          farmer.rank === 3 ? 'bg-gradient-success text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          <span className="text-lg font-bold">#{farmer.rank}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{farmer.name}</h4>
                          {farmer.name === mockData.farmer.name && (
                            <Badge variant="outline" className="mt-1">Your Farm</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-gradient-success text-white text-lg px-4 py-2">
                          {farmer.score}%
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">Quality Score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;