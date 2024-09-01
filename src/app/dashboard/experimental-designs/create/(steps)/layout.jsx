import { ExperimentalDesignProvider } from "@/context/ExperimentalDesignContext";

const StepsLayout = ({ children }) => {
  return <ExperimentalDesignProvider>{children}</ExperimentalDesignProvider>;
};

export default StepsLayout;
