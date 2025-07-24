import React from "react";
import { useNavigate } from "react-router-dom";
import PixelShopLayout from "../../../components/PixelShopLayout/PixelShopLayout";

const EthinicStore = () => {
  const navigate = useNavigate();
  const pixelShelves = [
    {
      title: "Sarees",
      position: { x: 10, y: 5 },
      shelfType: "wall" as const
    },
    {
      title: "Kurtas",
      position: { x: 10, y: 18 },
      shelfType: "wall" as const
    },
    {
      title: "Wedding",
      position: { x: 10, y: 31 },
      shelfType: "floor" as const
    },
    {
      title: "Festive",
      position: { x: 10, y: 44 },
      shelfType: "floor" as const
    },
    {
      title: "Lehengas",
      position: { x: 10, y: 57 },
      shelfType: "corner" as const
    }
  ];

  return (
    <PixelShopLayout
      shopTitle="ETHNIC SHOP"
      shopIcon="🏪"
      shelves={pixelShelves}
      shopkeeperName="Meera"
      coins={1250}
      onShopkeeperClick={() => navigate("/ai-assistant")}
    />
  );
};

export default EthinicStore;
