import Navbar from "./Navbar";
import PerformanceCard from "./PerformanceCard";


const Dashboard = () => {

  return (
    <>
    <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
    <div className="p-8 min-h-screen]">
   {/* This 'max-w-7xl mx-auto' keeps the content from getting too wide on huge monitors */}
   <div className="max-w-7xl mx-auto flex flex-col gap-10"></div>
    <div className="flex w-full gap-6">
      <PerformanceCard />
    </div>
    </div>
    
    

    </>
  );
};

export default Dashboard;
