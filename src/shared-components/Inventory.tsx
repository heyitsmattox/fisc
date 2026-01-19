import InventoryForm from "./InventoryForm";
import Navbar from "./Navbar";
const Inventory = () => {
  return (
    <div>
      <h1 className="text-2xl text-center p-2">Inventory component</h1>
       <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
      <InventoryForm />
    </div>
  );
};

export default Inventory;
