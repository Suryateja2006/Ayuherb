import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Truck, 
  MapPin, 
  Calendar,
  Package,
  Send,
  Plus,
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from "lucide-react";

const CollectorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [collectionForm, setCollectionForm] = useState({
    farmerId: "",
    herbType: "",
    quantity: "",
    location: ""
  });

  const mockData = {
    collector: {
      name: "Mountain Logistics AEO",
      region: "Himachal Pradesh",
      totalCollections: 156,
      activeFarmers: 24
    },
    recentCollections: [
      {
        batchId: "CB001",
        farmerId: "GVF001", 
        farmerName: "Green Valley Farms",
        herbType: "Organic Turmeric",
        quantity: "500 kg",
        status: "Sent to Tester",
        collectionDate: "2024-01-12",
        location: "Kullu District"
      },
      {
        batchId: "CB002",
        farmerId: "OVF001",
        farmerName: "Organic Valley Farm",
        herbType: "Ashwagandha Root",
        quantity: "300 kg", 
        status: "In Transit",
        collectionDate: "2024-01-11",
        location: "Shimla District"
      }
    ],
    assignedFarmers: [
      { id: "GVF001", name: "Green Valley Farms", location: "Kullu", herbs: 3, status: "Active" },
      { id: "OVF001", name: "Organic Valley Farm", location: "Shimla", herbs: 2, status: "Active" },
      { id: "PEF001", name: "Pure Earth Farms", location: "Mandi", herbs: 1, status: "Pending" }
    ]
  };

  const handleCollectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate batch ID automatically
    const batchId = `CB${Date.now().toString().slice(-3)}`;
    console.log("Creating collection:", { ...collectionForm, batchId });
    // Reset form
    setCollectionForm({
      farmerId: "",
      herbType: "",
      quantity: "",
      location: ""
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Collector Dashboard
              </h1>
              <p className="text-muted-foreground">
                {mockData.collector.name} - {mockData.collector.region}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                Current Location: Auto-detected
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
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Total Collections</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.collector.totalCollections}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Active Farmers</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.collector.activeFarmers}</p>
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
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground">18</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Pending Tests</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "collect", label: "New Collection" },
            { id: "farmers", label: "My Farmers" }
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Collections */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Recent Collections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.recentCollections.map((collection) => (
                      <div key={collection.batchId} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {collection.herbType}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Batch ID: {collection.batchId}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              From: {collection.farmerName}
                            </p>
                          </div>
                          <Badge 
                            variant={collection.status === "Sent to Tester" ? "default" : "secondary"}
                          >
                            {collection.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <span className="ml-2 font-medium text-foreground">{collection.quantity}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <span className="ml-2 font-medium text-foreground">{collection.collectionDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {collection.location}
                        </div>

                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Today's Collections</h4>
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-sm text-muted-foreground">800 kg total</p>
                </div>
                
                <div className="p-4 bg-accent/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">This Week</h4>
                  <p className="text-2xl font-bold text-accent">8</p>
                  <p className="text-sm text-muted-foreground">3.2 tons total</p>
                </div>
                
                <div className="p-4 bg-success/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Completion Rate</h4>
                  <p className="text-2xl font-bold text-success">94%</p>
                  <p className="text-sm text-muted-foreground">Collections to tests</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "collect" && (
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                New Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCollectionSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="farmerId">Farmer ID</Label>
                  <Select 
                    value={collectionForm.farmerId} 
                    onValueChange={(value) => setCollectionForm({...collectionForm, farmerId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select farmer" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockData.assignedFarmers.map((farmer) => (
                        <SelectItem key={farmer.id} value={farmer.id}>
                          {farmer.id} - {farmer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="herbType">Herb Type</Label>
                  <Input
                    id="herbType"
                    value={collectionForm.herbType}
                    onChange={(e) => setCollectionForm({...collectionForm, herbType: e.target.value})}
                    placeholder="e.g., Organic Turmeric"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={collectionForm.quantity}
                    onChange={(e) => setCollectionForm({...collectionForm, quantity: e.target.value})}
                    placeholder="500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Collection Location</Label>
                  <Input
                    id="location"
                    value={collectionForm.location}
                    onChange={(e) => setCollectionForm({...collectionForm, location: e.target.value})}
                    placeholder="Auto-detected from GPS"
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Location is automatically captured from your GPS
                  </p>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Auto-Generated Details</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Batch ID:</span> <span className="font-mono">CB{Date.now().toString().slice(-3)}</span></p>
                    <p><span className="text-muted-foreground">Collection Time:</span> {new Date().toLocaleString()}</p>
                    <p><span className="text-muted-foreground">Collector:</span> {mockData.collector.name}</p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  <Package className="w-4 h-4 mr-2" />
                  Create Collection Record
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "farmers" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Assigned Farmers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.assignedFarmers.map((farmer) => (
                  <div key={farmer.id} className="p-6 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{farmer.name}</h4>
                        <p className="text-muted-foreground">ID: {farmer.id}</p>
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {farmer.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={farmer.status === "Active" ? "default" : "secondary"}
                          className="mb-2"
                        >
                          {farmer.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {farmer.herbs} herb batches
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <MapPin className="w-4 h-4 mr-2" />
                        View Location
                      </Button>
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

export default CollectorDashboard;