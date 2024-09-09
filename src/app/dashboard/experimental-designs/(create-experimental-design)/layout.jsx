import { ExperimentalDesignProvider } from "@/context/ExperimentalDesignContext";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

const StepsLayout = ({ children }) => {
  return (
    <ExperimentalDesignProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </ExperimentalDesignProvider>
  );
};

export default StepsLayout;
