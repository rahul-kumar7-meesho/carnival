import React from "react";
import { useNavigate } from "react-router-dom";
import PixelShopLayout from "../../../components/PixelShopLayout/PixelShopLayout";

const WesternStore = () => {
  const navigate = useNavigate();
  const shopID =2;
  const westernShelves = [
    {
      title: "Jeans",
      position: { x: 10, y: 5 },
      shelfType: "wall" as const
    },
    {
      title: "T-Shirts",
      position: { x: 10, y: 18 },
      shelfType: "wall" as const
    },
    {
      title: "Jackets",
      position: { x: 10, y: 31 },
      shelfType: "floor" as const
    },
    {
      title: "Dresses",
      position: { x: 10, y: 44 },
      shelfType: "floor" as const
    },
    {
      title: "Accessories",
      position: { x: 10, y: 57 },
      shelfType: "corner" as const
    }
  ];

  const westernBackground = `
    linear-gradient(180deg, 
      #F4A460 0%, 
      #F4A460 30%, 
      #DEB887 30%, 
      #DEB887 100%)
  `;

  return (
    <PixelShopLayout
      shopTitle="WESTERN STORE"
      shopIcon="🤠"
      shelves={westernShelves}
      shopID={shopID}
      shopkeeperName="Meera"
      backgroundGradient={westernBackground}
      coins={1850}
      onShopkeeperClick={(prompt: string) => navigate("/ai-assistant", { state: { prompt } })}
    />
  );
};

export default WesternStore;