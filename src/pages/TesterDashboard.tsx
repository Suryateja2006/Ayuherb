import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FlaskConical, 
  Plus,
  Save,
  Eye,
  BarChart3,
  MessageSquare,
  Award,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2,
  MapPin,
  Lock,
  ArrowRight,
  Navigation
} from "lucide-react";

const TesterDashboard = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [batchId, setBatchId] = useState("");
  const [currentBatch, setCurrentBatch] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [testerId, setTesterId] = useState("");
  const [testerName, setTesterName] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);

  // Step-based testing workflow - dynamic steps
  const [testingSteps, setTestingSteps] = useState([
    {
      id: "step1",
      title: "Testing Step 1", 
      description: "Add your testing procedures and results"
    }
  ]);

  const [stepData, setStepData] = useState<{[stepId: string]: any}>({});
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [newResultName, setNewResultName] = useState("");
  const [newResultValue, setNewResultValue] = useState("");

  // Mock batch data (empty - tester fills everything)
  const mockBatchIds = ["CB001", "CB002", "CB003"];

  const captureLocation = async () => {
    setIsCapturingLocation(true);
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation not supported");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      setCurrentLocation(location);
      console.log("Location captured:", location);
    } catch (error) {
      console.error("Error capturing location:", error);
      alert("Could not capture location. Please enable location permissions.");
    } finally {
      setIsCapturingLocation(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId || !testerId || !testerName) {
      alert("Please fill in all fields");
      return;
    }

    if (mockBatchIds.includes(batchId)) {
      setCurrentBatch({ 
        batchId,
        testerId,
        testerName,
        loginTime: new Date().toISOString()
      });
      setActiveTab("testing");
      
      // Load existing step data for this batch (if any)
      const savedData = localStorage.getItem(`batch_${batchId}_steps`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setStepData(parsed.stepData || {});
        setCompletedSteps(parsed.completedSteps || []);
        if (parsed.testingSteps) {
          setTestingSteps(parsed.testingSteps);
        }
        
        // Find current step
        const stepsToUse = parsed.testingSteps || testingSteps;
        const nextStep = stepsToUse.findIndex(step => 
          !parsed.completedSteps?.includes(step.id)
        );
        setCurrentStep(nextStep >= 0 ? nextStep : stepsToUse.length - 1);
      }
    } else {
      alert(`Invalid Batch ID. Available IDs: ${mockBatchIds.join(", ")}`);
    }
  };

  const addResult = () => {
    if (!newResultName.trim() || !newResultValue.trim()) {
      alert("Please enter both result name and value");
      return;
    }

    const currentStepId = testingSteps[currentStep].id;
    setStepData(prev => ({
      ...prev,
      [currentStepId]: {
        ...prev[currentStepId],
        [newResultName]: newResultValue
      }
    }));

    setNewResultName("");
    setNewResultValue("");
  };

  const removeResult = (resultName: string) => {
    const currentStepId = testingSteps[currentStep].id;
    setStepData(prev => {
      const newData = { ...prev };
      if (newData[currentStepId]) {
        delete newData[currentStepId][resultName];
      }
      return newData;
    });
  };

  const addNewStep = () => {
    const newStepId = `step${testingSteps.length + 1}`;
    setTestingSteps(prev => [...prev, {
      id: newStepId,
      title: `Testing Step ${testingSteps.length + 1}`,
      description: "Add your testing procedures and results"
    }]);
  };

  const removeStep = (stepIndex: number) => {
    if (testingSteps.length <= 1) {
      alert("Cannot remove the last step");
      return;
    }
    
    const stepToRemove = testingSteps[stepIndex];
    if (isStepCompleted(stepToRemove.id)) {
      alert("Cannot remove a completed step");
      return;
    }

    setTestingSteps(prev => prev.filter((_, index) => index !== stepIndex));
    if (currentStep >= stepIndex && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeCurrentStep = async () => {
    if (!currentLocation) {
      alert("Please capture location before completing this step");
      return;
    }

    const currentStepId = testingSteps[currentStep].id;
    const currentStepData = stepData[currentStepId] || {};
    
    // Validate at least one result is added
    if (Object.keys(currentStepData).length === 0) {
      alert("Please add at least one test result before completing this step");
      return;
    }

    // Complete the step with location and tester info
    const completedStepData = {
      ...currentStepData,
      completedBy: testerId,
      testerName: testerName,
      completedAt: new Date().toISOString(),
      location: currentLocation
    };

    const newStepData = {
      ...stepData,
      [currentStepId]: completedStepData
    };

    const newCompletedSteps = [...completedSteps, currentStepId];
    
    setStepData(newStepData);
    setCompletedSteps(newCompletedSteps);

    // Save to localStorage (in real app, save to blockchain)
    localStorage.setItem(`batch_${batchId}_steps`, JSON.stringify({
      stepData: newStepData,
      completedSteps: newCompletedSteps,
      testingSteps: testingSteps
    }));

    console.log("Step completed:", {
      batchId,
      stepId: currentStepId,
      data: completedStepData
    });

    // Move to next step or finish
    if (currentStep < testingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentLocation(null); // Reset location for next step
    } else {
      alert("All testing steps completed! Results saved to blockchain.");
      setActiveTab("feedback");
    }
  };

  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  const isStepLocked = (stepIndex: number) => {
    return stepIndex < currentStep || isStepCompleted(testingSteps[stepIndex].id);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Tester Dashboard
          </h1>
          <p className="text-muted-foreground">
            Step-by-Step Quality Testing Interface
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 w-fit">
          {[
            { id: "login", label: "Tester Login" },
            { id: "testing", label: "Testing Steps", disabled: !currentBatch },
            { id: "feedback", label: "Consumer Feedback", disabled: !currentBatch }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              className="px-6"
              disabled={tab.disabled}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tester Login */}
        {activeTab === "login" && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <FlaskConical className="w-6 h-6 mr-2" />
                Tester Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="testerId">Tester ID</Label>
                  <Input
                    id="testerId"
                    value={testerId}
                    onChange={(e) => setTesterId(e.target.value)}
                    placeholder="Enter your Tester ID"
                    required
                    className="font-mono"
                  />
                </div>

                <div>
                  <Label htmlFor="testerName">Tester Name</Label>
                  <Input
                    id="testerName"
                    value={testerName}
                    onChange={(e) => setTesterName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="batchId">Batch ID to Test</Label>
                  <Input
                    id="batchId"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    placeholder="Enter Batch ID (CB001, CB002, CB003)"
                    required
                    className="text-center font-mono text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Available for testing: {mockBatchIds.join(", ")}
                  </p>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Start Testing Process
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Testing Steps */}
        {activeTab === "testing" && currentBatch && (
          <div className="space-y-8">
            {/* Progress Indicator */}
            <Card>
              <CardHeader>
                <CardTitle>Testing Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  {testingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                        ${isStepCompleted(step.id) ? 'bg-success text-white' : 
                          index === currentStep ? 'bg-primary text-white' : 
                          'bg-muted text-muted-foreground'}
                      `}>
                        {isStepCompleted(step.id) ? <CheckCircle className="w-5 h-5" /> : index + 1}
                      </div>
                      {index < testingSteps.length - 1 && (
                        <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    Step {currentStep + 1}: {testingSteps[currentStep]?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {testingSteps[currentStep]?.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Current Step Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FlaskConical className="w-5 h-5 mr-2" />
                      {testingSteps[currentStep]?.title}
                      {isStepLocked(currentStep) && (
                        <Lock className="w-4 h-4 ml-2 text-muted-foreground" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Location Capture */}
                    <div className="border rounded-lg p-4 bg-primary/5">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location Verification
                      </h4>
                      {currentLocation ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Location Captured</p>
                            <p className="font-mono text-sm">
                              {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                            </p>
                          </div>
                          <CheckCircle className="w-6 h-6 text-success" />
                        </div>
                      ) : (
                        <Button 
                          onClick={captureLocation}
                          disabled={isCapturingLocation}
                          variant="outline"
                          className="w-full"
                        >
                          {isCapturingLocation ? (
                            <Clock className="w-4 h-4 mr-2" />
                          ) : (
                            <Navigation className="w-4 h-4 mr-2" />
                          )}
                          {isCapturingLocation ? "Capturing Location..." : "Capture Current Location"}
                        </Button>
                      )}
                    </div>

                    {/* Dynamic Step Management */}
                    {!isStepCompleted(testingSteps[currentStep]?.id) && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">Step Management</h4>
                          <div className="flex gap-2">
                            <Button 
                              onClick={addNewStep}
                              size="sm" 
                              variant="outline"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Step
                            </Button>
                            {testingSteps.length > 1 && (
                              <Button 
                                onClick={() => removeStep(currentStep)}
                                size="sm" 
                                variant="outline"
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove Step
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Test Results Entry */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Test Results</h4>
                      
                      {/* Add New Result */}
                      {!isStepCompleted(testingSteps[currentStep]?.id) && (
                        <div className="border rounded-lg p-4 bg-muted/5">
                          <div className="flex gap-2 mb-2">
                            <div className="flex-1">
                              <Label htmlFor="resultName">Result Name</Label>
                              <Input
                                id="resultName"
                                value={newResultName}
                                onChange={(e) => setNewResultName(e.target.value)}
                                placeholder="e.g., Moisture Content, pH Level"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor="resultValue">Result Value</Label>
                              <Input
                                id="resultValue"
                                value={newResultValue}
                                onChange={(e) => setNewResultValue(e.target.value)}
                                placeholder="e.g., 12.5%, 6.8"
                              />
                            </div>
                          </div>
                          <Button onClick={addResult} size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Result
                          </Button>
                        </div>
                      )}

                      {/* Current Results */}
                      <div className="space-y-2">
                        {Object.entries(stepData[testingSteps[currentStep]?.id] || {})
                          .filter(([key]) => !['completedBy', 'testerName', 'completedAt', 'location'].includes(key))
                          .map(([name, value]) => (
                          <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <span className="font-medium">{name}:</span>
                              <span className="ml-2">{String(value)}</span>
                            </div>
                            {!isStepCompleted(testingSteps[currentStep]?.id) && (
                              <Button 
                                onClick={() => removeResult(name)}
                                size="sm" 
                                variant="ghost"
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Complete Step Button */}
                    {!isStepCompleted(testingSteps[currentStep]?.id) && (
                      <Button 
                        onClick={completeCurrentStep}
                        className="w-full bg-gradient-success"
                        size="lg"
                        disabled={!currentLocation}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Complete Step & Continue
                      </Button>
                    )}

                    {isStepCompleted(testingSteps[currentStep]?.id) && (
                      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-success mr-2" />
                          <span className="font-semibold text-success">Step Completed</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Completed by: {stepData[testingSteps[currentStep].id]?.testerName}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Step Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Step Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testingSteps.map((step, index) => (
                    <div 
                      key={step.id} 
                      className={`p-3 rounded-lg border ${
                        index === currentStep ? 'border-primary bg-primary/5' :
                        isStepCompleted(step.id) ? 'border-success bg-success/5' :
                        'border-muted bg-muted/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{step.title}</h4>
                        {isStepCompleted(step.id) ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : index === currentStep ? (
                          <Clock className="w-4 h-4 text-primary" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-muted" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                      {isStepCompleted(step.id) && (
                        <div className="mt-2 text-xs">
                          <p>By: {stepData[step.id]?.testerName}</p>
                          <p>At: {new Date(stepData[step.id]?.completedAt).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Consumer Feedback */}
        {activeTab === "feedback" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Consumer Feedback for Batch {currentBatch?.batchId}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Consumer Feedback Yet
                </h3>
                <p className="text-muted-foreground">
                  Feedback will appear here when consumers scan QR codes of products made from this batch.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TesterDashboard;