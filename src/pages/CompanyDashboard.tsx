import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Building2, 
  Eye,
  DollarSign,
  Gavel,
  Package,
  Plus,
  Award,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock
} from "lucide-react";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [bidForm, setBidForm] = useState({
    batchId: "",
    bidAmount: "",
    notes: ""
  });
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);

  const [masterBatchForm, setMasterBatchForm] = useState({
    productName: "",
    description: "",
    selectedBatches: [] as string[],
    processingMethod: "",
    packagingDate: ""
  });

  const mockData = {
    company: {
      name: "Organic Solutions Ltd.",
      registrationId: "OSL2024",
      totalPurchases: 45,
      activeBids: 3
    },
    availableHerbs: [
      {
        batchId: "FB001",
        herbType: "Organic Turmeric",
        farmer: "Green Valley Farms",
        location: "Himachal Pradesh",
        quantity: "500 kg",
        qualityScore: 95,
        currentBid: 42000,
        auctionEnds: "2024-01-15T18:00:00",
        status: "Active Auction",
        testResults: {
          moisture: "8.5%",
          pesticides: "Not Detected",
          curcumin: "6.2%"
        }
      },
      {
        batchId: "FB002",
        herbType: "Ashwagandha Root",
        farmer: "Organic Valley Farm",
        location: "Karnataka",
        quantity: "300 kg", 
        qualityScore: 88,
        currentBid: 28000,
        auctionEnds: "2024-01-16T15:30:00",
        status: "Active Auction",
        testResults: {
          moisture: "12.2%",
          pesticides: "Not Detected",
          withanolides: "2.8%"
        }
      },
      {
        batchId: "FB003",
        herbType: "Brahmi Leaves",
        farmer: "Pure Earth Farms",
        location: "Kerala",
        quantity: "200 kg",
        qualityScore: 92,
        currentBid: null,
        auctionEnds: "2024-01-17T12:00:00",
        status: "Awaiting Bids",
        testResults: {
          moisture: "9.1%",
          pesticides: "Not Detected",
          bacosides: "3.1%"
        }
      }
    ],
    myBids: [
      {
        batchId: "FB001",
        herbType: "Organic Turmeric",
        bidAmount: 42000,
        status: "Leading",
        placedAt: "2024-01-14T10:30:00"
      },
      {
        batchId: "FB002", 
        herbType: "Ashwagandha Root",
        bidAmount: 27500,
        status: "Outbid",
        placedAt: "2024-01-14T09:15:00"
      }
    ],
    wonBatches: [
      {
        batchId: "FB004",
        herbType: "Neem Leaves", 
        quantity: "400 kg",
        finalPrice: 35000,
        wonAt: "2024-01-10T16:45:00"
      }
    ]
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Placing bid:", bidForm);
    alert(`Bid placed: ₹${bidForm.bidAmount} for batch ${bidForm.batchId}`);
    setBidForm({ batchId: "", bidAmount: "", notes: "" });
  };

  const handleMasterBatchCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const masterBatchId = `MB${Date.now().toString().slice(-6)}`;
    console.log("Creating master batch:", { ...masterBatchForm, masterBatchId });
    alert(`Master Batch Created: ${masterBatchId}`);
    setMasterBatchForm({
      productName: "",
      description: "",
      selectedBatches: [],
      processingMethod: "",
      packagingDate: ""
    });
  };

  const timeUntilAuction = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Company Dashboard
              </h1>
              <p className="text-muted-foreground">
                {mockData.company.name} - {mockData.company.registrationId}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Package className="w-4 h-4 mr-2" />
                {mockData.company.totalPurchases} Purchases
              </Badge>
              <Badge className="bg-gradient-accent text-white px-4 py-2">
                <Gavel className="w-4 h-4 mr-2" />
                {mockData.company.activeBids} Active Bids
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
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Available Herbs</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.availableHerbs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Gavel className="w-6 h-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">My Bids</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.myBids.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Won Auctions</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.wonBatches.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">₹18.5L</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 w-fit">
        {[
            { id: "marketplace", label: "Herb Marketplace" },
            { id: "bids", label: "My Bids" }
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

        {/* Herb Marketplace */}
        {activeTab === "marketplace" && (
          <div className="space-y-6">
            {mockData.availableHerbs.map((herb) => (
              <Card key={herb.batchId}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Herb Details */}
                    <div className="lg:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {herb.herbType}
                          </h3>
                          <p className="text-muted-foreground mb-1">
                            Batch ID: <span className="font-mono">{herb.batchId}</span>
                          </p>
                          <p className="text-muted-foreground mb-1">
                            Farmer: {herb.farmer}
                          </p>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {herb.location}
                          </div>
                        </div>
                        <Badge 
                          className={`${
                            herb.status === "Active Auction" 
                              ? "bg-gradient-success text-white" 
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {herb.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="font-semibold text-foreground">{herb.quantity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quality Score</p>
                          <Badge className="bg-gradient-success text-white">
                            <Award className="w-3 h-3 mr-1" />
                            {herb.qualityScore}/100
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Test Results */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Test Results</h4>
                      <div className="space-y-2">
                        {Object.entries(herb.testResults).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground capitalize">
                              {key}:
                            </span>
                            <span className="font-medium text-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bidding Section */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Auction Details</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Bid</p>
                          <p className="text-2xl font-bold text-accent">
                            {herb.currentBid ? `₹${herb.currentBid.toLocaleString()}` : "No bids yet"}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Auction Ends</p>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-warning" />
                            <span className="font-medium text-foreground">
                              {timeUntilAuction(herb.auctionEnds)}
                            </span>
                          </div>
                        </div>

                        <Dialog open={isBidDialogOpen} onOpenChange={setIsBidDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full bg-gradient-primary"
                              onClick={() => setBidForm({...bidForm, batchId: herb.batchId})}
                            >
                              <Gavel className="w-4 h-4 mr-2" />
                              Place Bid
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Place Bid for {herb.batchId}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              console.log("Placing bid:", bidForm);
                              alert(`Bid placed: ₹${bidForm.bidAmount} for batch ${bidForm.batchId}`);
                              setBidForm({ batchId: "", bidAmount: "", notes: "" });
                              setIsBidDialogOpen(false);
                            }} className="space-y-4">
                              <div>
                                <Label htmlFor="bidAmount">Bid Amount (₹)</Label>
                                <Input
                                  id="bidAmount"
                                  type="number"
                                  value={bidForm.bidAmount}
                                  onChange={(e) => setBidForm({...bidForm, bidAmount: e.target.value})}
                                  placeholder="45000"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Textarea
                                  id="notes"
                                  value={bidForm.notes}
                                  onChange={(e) => setBidForm({...bidForm, notes: e.target.value})}
                                  placeholder="Any additional comments..."
                                  rows={2}
                                />
                              </div>

                              <div className="flex space-x-2">
                                <Button type="submit" className="flex-1 bg-gradient-primary">
                                  Submit Bid
                                </Button>
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={() => {
                                    setBidForm({batchId: "", bidAmount: "", notes: ""});
                                    setIsBidDialogOpen(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          </div>
        )}

        {/* My Bids */}
        {activeTab === "bids" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gavel className="w-5 h-5 mr-2" />
                  My Active Bids
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.myBids.map((bid) => (
                    <div key={bid.batchId} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-foreground">{bid.herbType}</h4>
                          <p className="text-sm text-muted-foreground">
                            Batch: {bid.batchId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Placed: {new Date(bid.placedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-accent">
                            ₹{bid.bidAmount.toLocaleString()}
                          </p>
                          <Badge 
                            variant={bid.status === "Leading" ? "default" : "secondary"}
                          >
                            {bid.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Won Auctions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Won Auctions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.wonBatches.map((batch) => (
                    <div key={batch.batchId} className="p-4 border rounded-lg bg-success/5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground">{batch.herbType}</h4>
                          <p className="text-sm text-muted-foreground">
                            Batch: {batch.batchId} • {batch.quantity}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Won: {new Date(batch.wonAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-success">
                            ₹{batch.finalPrice.toLocaleString()}
                          </p>
                          <Badge className="bg-gradient-success text-white mb-2">
                            Won
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-primary">
                        <Package className="w-4 h-4 mr-2" />
                        Assign Collector
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompanyDashboard;