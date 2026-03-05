import Navbar from "./Navbar";
import { supabase } from "../lib/supabaseClient"
import { useEffect, useState } from "react";
import type { Database } from "../lib/database.types";

type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

const Dashboard = () => {
  const [inventoryData, setInventoryData ] = useState<InventoryEntry[]>([])
  const [fetchError, setFetchError] = useState<string | null>("");

useEffect(() => {
  const fetchData = async () => {
      const {data, error } = await supabase
      .from("inventory")
      .select()
      if (error) {
        setFetchError("Could not fetch the data from our inventory database")
        console.log(error)
      }
      if(data) {
       setInventoryData(data)
       setFetchError(null)
      }
  }
  fetchData()
}, [])
console.log(inventoryData)

  return (
    <>
    <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
    <h1>Dashboard component placeholder</h1>

    </>
  );
};

export default Dashboard;
