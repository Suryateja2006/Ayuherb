import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Factory, 
  Plus,
  MapPin,
  Package,
  Beaker,
  QrCode,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  Settings
} from "lucide-react";

const ManufacturerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [masterBatchForm, setMasterBatchForm] = useState({
    productName: "",
    description: "",
    selectedBatches: [] as string[],
  });
  
  const [manufacturingSteps, setManufacturingSteps] = useState([
    {
      id: "MS001",
      stepName: "Initial Processing",
      description: "Cleaning and sorting raw herbs",
      herbsAdded: [{ name: "Turmeric", quantity: "500kg" }],
      geoLocation: "Auto-captured",
      timestamp: new Date().toISOString(),
      status: "completed",
      additionalDetails: ""
    }
  ]);

  const [newStep, setNewStep] = useState({
    stepName: "",
    description: "",
    herbsAdded: [{ name: "", quantity: "" }],
    additionalDetails: ""
  });

  const mockData = {
    manufacturer: {
      name: "Ayurvedic Industries Ltd.",
      registrationId: "AIL2024",
      totalMasterBatches: 18,
      activeProcessing: 3
    },
    availableBatches: [
      {
        batchId: "FB004",
        herbType: "Neem Leaves", 
        quantity: "400 kg",
        farmer: "Pure Earth Farms",
        finalPrice: 35000
      },
      {
        batchId: "FB001",
        herbType: "Organic Turmeric",
        quantity: "500 kg", 
        farmer: "Green Valley Farms",
        finalPrice: 42000
      }
    ],
    masterBatches: [
      {
        id: "MB001",
        productName: "Premium Turmeric Powder",
        status: "In Production",
        batchesUsed: ["FB001", "FB002"],
        createdAt: "2024-01-14",
        qrGenerated: false
      }
    ]
  };

  const handleAddStep = () => {
    const stepId = `MS${Date.now().toString().slice(-3)}`;
    const step = {
      id: stepId,
      stepName: newStep.stepName,
      description: newStep.description,
      herbsAdded: newStep.herbsAdded.filter(herb => herb.name && herb.quantity),
      geoLocation: "Auto-captured from GPS",
      timestamp: new Date().toISOString(),
      status: "completed",
      additionalDetails: newStep.additionalDetails
    };
    
    setManufacturingSteps([...manufacturingSteps, step]);
    setNewStep({
      stepName: "",
      description: "",
      herbsAdded: [{ name: "", quantity: "" }],
      additionalDetails: ""
    });
    
    // Simulate blockchain storage
    console.log("Storing to blockchain:", step);
    alert(`Manufacturing step "${step.stepName}" recorded on blockchain`);
  };

  const handleDeleteStep = (stepId: string) => {
    setManufacturingSteps(manufacturingSteps.filter(step => step.id !== stepId));
  };

  const addHerbField = () => {
    setNewStep({
      ...newStep,
      herbsAdded: [...newStep.herbsAdded, { name: "", quantity: "" }]
    });
  };

  const updateHerbField = (index: number, field: string, value: string) => {
    const updated = [...newStep.herbsAdded];
    updated[index] = { ...updated[index], [field]: value };
    setNewStep({ ...newStep, herbsAdded: updated });
  };

  const removeHerbField = (index: number) => {
    setNewStep({
      ...newStep,
      herbsAdded: newStep.herbsAdded.filter((_, i) => i !== index)
    });
  };

  const handleCreateMasterBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const masterBatchId = `MB${Date.now().toString().slice(-6)}`;
    console.log("Creating master batch:", { ...masterBatchForm, masterBatchId, manufacturingSteps });
    alert(`Master Batch Created: ${masterBatchId} with ${manufacturingSteps.length} manufacturing steps`);
    
    setMasterBatchForm({
      productName: "",
      description: "",
      selectedBatches: []
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
                Manufacturer Dashboard
              </h1>
              <p className="text-muted-foreground">
                {mockData.manufacturer.name} - {mockData.manufacturer.registrationId}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Factory className="w-4 h-4 mr-2" />
                {mockData.manufacturer.totalMasterBatches} Master Batches
              </Badge>
              <Badge className="bg-gradient-accent text-white px-4 py-2">
                <Settings className="w-4 h-4 mr-2" />
                {mockData.manufacturer.activeProcessing} In Production
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
                  <p className="text-sm text-muted-foreground">Available Batches</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.availableBatches.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Factory className="w-6 h-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Master Batches</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.manufacturer.totalMasterBatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Beaker className="w-6 h-6 text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Manufacturing Steps</p>
                  <p className="text-2xl font-bold text-foreground">{manufacturingSteps.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <QrCode className="w-6 h-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">QR Codes Generated</p>
                  <p className="text-2xl font-bold text-foreground">15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "manufacturing", label: "Manufacturing Steps" },
            { id: "master-batch", label: "Create Master Batch" }
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

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Herb Batches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Available Herb Batches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.availableBatches.map((batch) => (
                    <div key={batch.batchId} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{batch.herbType}</h4>
                          <p className="text-sm text-muted-foreground">Batch: {batch.batchId}</p>
                          <p className="text-sm text-muted-foreground">From: {batch.farmer}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {batch.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accent">₹{batch.finalPrice.toLocaleString()}</p>
                          <Badge className="bg-gradient-success text-white">Available</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Master Batches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Factory className="w-5 h-5 mr-2" />
                  Master Batches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.masterBatches.map((batch) => (
                    <div key={batch.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{batch.productName}</h4>
                          <p className="text-sm text-muted-foreground">ID: {batch.id}</p>
                          <p className="text-sm text-muted-foreground">Created: {batch.createdAt}</p>
                          <p className="text-sm text-muted-foreground">
                            Batches: {batch.batchesUsed.join(", ")}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge 
                            variant={batch.status === "In Production" ? "default" : "secondary"}
                          >
                            {batch.status}
                          </Badge>
                          {!batch.qrGenerated && (
                            <Button size="sm" className="bg-gradient-primary block">
                              <QrCode className="w-4 h-4 mr-2" />
                              Generate QR
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Manufacturing Steps */}
        {activeTab === "manufacturing" && (
          <div className="space-y-8">
            {/* Current Manufacturing Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Beaker className="w-5 h-5 mr-2" />
                  Manufacturing Steps Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {manufacturingSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {index < manufacturingSteps.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                      )}
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 bg-card border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground">{step.stepName}</h4>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteStep(step.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {step.herbsAdded && step.herbsAdded.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-sm font-medium text-foreground mb-2">Herbs Added:</h5>
                              <div className="space-y-1">
                                {step.herbsAdded.map((herb, herbIndex) => (
                                  <Badge key={herbIndex} variant="secondary" className="mr-2">
                                    {herb.name}: {herb.quantity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Location:</span>
                              <div className="flex items-center mt-1">
                                <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                                <span className="text-foreground">{step.geoLocation}</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timestamp:</span>
                              <div className="flex items-center mt-1">
                                <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                                <span className="text-foreground">
                                  {new Date(step.timestamp).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {step.additionalDetails && (
                            <div className="mt-3 p-3 bg-muted/50 rounded">
                              <p className="text-sm text-foreground">{step.additionalDetails}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add New Step */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Manufacturing Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleAddStep(); }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stepName">Step Name</Label>
                      <Input
                        id="stepName"
                        value={newStep.stepName}
                        onChange={(e) => setNewStep({...newStep, stepName: e.target.value})}
                        placeholder="e.g., Grinding Process"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newStep.description}
                        onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                        placeholder="What is being done in this step"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Herbs Added (Optional)</Label>
                    <div className="space-y-3 mt-2">
                      {newStep.herbsAdded.map((herb, index) => (
                        <div key={index} className="flex space-x-3 items-end">
                          <div className="flex-1">
                            <Input
                              placeholder="Herb name"
                              value={herb.name}
                              onChange={(e) => updateHerbField(index, 'name', e.target.value)}
                            />
                          </div>
                          <div className="w-32">
                            <Input
                              placeholder="Quantity"
                              value={herb.quantity}
                              onChange={(e) => updateHerbField(index, 'quantity', e.target.value)}
                            />
                          </div>
                          <Button 
                            type="button"
                            size="sm"
                            variant="outline" 
                            onClick={() => removeHerbField(index)}
                            disabled={newStep.herbsAdded.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        type="button"
                        size="sm"
                        variant="outline" 
                        onClick={addHerbField}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Herb
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalDetails">Additional Details</Label>
                    <Textarea
                      id="additionalDetails"
                      value={newStep.additionalDetails}
                      onChange={(e) => setNewStep({...newStep, additionalDetails: e.target.value})}
                      placeholder="Any additional information about this step..."
                      rows={3}
                    />
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Auto-Captured Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Geo-Location:</span>
                        <p className="font-medium text-foreground">Auto-captured from GPS</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timestamp:</span>
                        <p className="font-medium text-foreground">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary" size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Record Manufacturing Step on Blockchain
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create Master Batch */}
        {activeTab === "master-batch" && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Factory className="w-5 h-5 mr-2" />
                Create Master Batch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateMasterBatch} className="space-y-6">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={masterBatchForm.productName}
                    onChange={(e) => setMasterBatchForm({...masterBatchForm, productName: e.target.value})}
                    placeholder="e.g., Premium Turmeric Powder"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    value={masterBatchForm.description}
                    onChange={(e) => setMasterBatchForm({...masterBatchForm, description: e.target.value})}
                    placeholder="Detailed product description..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Select Herb Batches to Include</Label>
                  <div className="space-y-2 mt-2">
                    {mockData.availableBatches.map((batch) => (
                      <div key={batch.batchId} className="flex items-center space-x-3 p-3 border rounded">
                        <input 
                          type="checkbox"
                          value={batch.batchId}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            setMasterBatchForm({
                              ...masterBatchForm,
                              selectedBatches: checked 
                                ? [...masterBatchForm.selectedBatches, value]
                                : masterBatchForm.selectedBatches.filter(id => id !== value)
                            });
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{batch.herbType}</p>
                          <p className="text-sm text-muted-foreground">
                            {batch.batchId} • {batch.quantity} • {batch.farmer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-success/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Manufacturing Steps to Include</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    All {manufacturingSteps.length} manufacturing steps will be linked to this master batch for complete traceability.
                  </p>
                  <div className="space-y-2">
                    {manufacturingSteps.map((step) => (
                      <div key={step.id} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm text-foreground">{step.stepName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary" size="lg">
                  <Package className="w-4 h-4 mr-2" />
                  Create Master Batch & Generate QR Code
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManufacturerDashboard;