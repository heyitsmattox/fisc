import Navbar from "../layout/Navbar";
import SearchBar from "../ui/SearchBar";
import { InventoryForm, inventoryFields } from "./InventoryForm";

const Inventory = () => {

  return (
    <>
      <div>
        <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
      </div>
      {/* Div element that will control UI placement on the Inventory page */}
      <div className=" m-4">
        <SearchBar
          searchBarPlaceholderTxt={"Search"}
          buttonText={"New Entry"}
          onSearchChange={function (): void {
            throw new Error("Function not implemented.");
          }}
          onButtonClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          widthOfSearchBar={"72"}
        />
      </div>

      <InventoryForm config={inventoryFields}  />
    </>
  );
};

export default Inventory;
