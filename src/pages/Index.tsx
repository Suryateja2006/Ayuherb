import { useNavigate } from "react-router-dom";
import RoleSelector from "@/components/RoleSelector";

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string, path: string) => {
    navigate(path);
  };

  return <RoleSelector onRoleSelect={handleRoleSelect} />;
};

export default Index;
