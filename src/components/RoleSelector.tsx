import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, 
  Truck, 
  FlaskConical, 
  Building2, 
  QrCode,
  ArrowRight,
  MapPin,
  Shield,
  Zap,
  Factory
} from "lucide-react";

const roles = [
  {
    id: "farmer",
    title: "Farmer",
    description: "Register herbs, manage auctions, view test results",
    icon: Sprout,
    features: ["Geo-location tracking", "Auction management", "Quality leaderboard"],
    color: "bg-gradient-primary",
    path: "/farmer"
  },
  {
    id: "collector",
    title: "Collector (AEO)",
    description: "Collect herb batches and generate batch IDs",
    icon: Truck,
    features: ["Batch ID generation", "Farmer coordination", "Logistics tracking"],
    color: "bg-gradient-accent",
    path: "/collector"
  },
  {
    id: "tester",
    title: "Tester",
    description: "Perform quality tests and store results on blockchain",
    icon: FlaskConical,
    features: ["Dynamic test types", "Blockchain storage", "Consumer feedback"],
    color: "bg-gradient-success",
    path: "/tester"
  },
  {
    id: "company",
    title: "Company",
    description: "Browse herbs, participate in bidding, assign collectors",
    icon: Building2,
    features: ["Herb marketplace", "Auction bidding", "Collector assignment"],
    color: "bg-gradient-primary",
    path: "/company"
  },
  {
    id: "manufacturer",
    title: "Manufacturer",
    description: "Create master batches with full manufacturing traceability",
    icon: Factory,
    features: ["Manufacturing steps", "Master batch creation", "QR generation"],
    color: "bg-gradient-success",
    path: "/manufacturer"
  },
  {
    id: "consumer",
    title: "Consumer",
    description: "Scan QR codes to view product provenance",
    icon: QrCode,
    features: ["QR code scanning", "Full traceability", "Leave feedback"],
    color: "bg-gradient-accent",
    path: "/consumer"
  }
];

interface RoleSelectorProps {
  onRoleSelect: (role: string, path: string) => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero py-24 px-4">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-white mr-4" />
            <h1 className="text-5xl font-bold text-white">HerbChain</h1>
          </div>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Blockchain-powered supply chain traceability for premium herbs. 
            From farm to consumer, every step is verified and immutable.
          </p>
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              <span>Immutable Records</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Geo-tracked</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>Quality Assured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your role in the supply chain to access your personalized dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card key={role.id} className="group cursor-pointer transition-all duration-300 hover:shadow-custom-lg hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {role.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {role.description}
                    </p>
                    
                    <div className="space-y-2 mb-8">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => onRoleSelect(role.id, role.path)}
                      className="w-full bg-primary hover:bg-primary-light group"
                    >
                      <span>Access Dashboard</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;