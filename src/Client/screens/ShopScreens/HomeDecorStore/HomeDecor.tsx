import React from "react";
import { useNavigate } from "react-router-dom";
import PixelShopLayout from "../../../components/PixelShopLayout/PixelShopLayout";

const HomeDecor = () => {
  const navigate = useNavigate();
  const shopID =3;
  const homeDecorShelves = [
    {
      title: "Furniture",
      position: { x: 10, y: 5 },
      shelfType: "wall" as const
    },
    {
      title: "Lighting",
      position: { x: 10, y: 18 },
      shelfType: "wall" as const
    },
    {
      title: "Rugs",
      position: { x: 10, y: 31 },
      shelfType: "floor" as const
    },
    {
      title: "Plants",
      position: { x: 10, y: 44 },
      shelfType: "floor" as const
    },
    {
      title: "Art & Decor",
      position: { x: 10, y: 57 },
      shelfType: "corner" as const
    }
  ];

  const homeDecorBackground = `
    linear-gradient(180deg, 
      #E6E6FA 0%, 
      #E6E6FA 30%, 
      #F0E68C 30%, 
      #F0E68C 100%)
  `;

  return (
    <PixelShopLayout
      shopTitle="HOME DECOR STORE"
      shopIcon="🏠"
      shelves={homeDecorShelves}
      shopkeeperName="Meera"
      shopID={shopID}
      backgroundGradient={homeDecorBackground}
      coins={2100}
      onShopkeeperClick={(prompt: string) => navigate("/ai-assistant", { state: { prompt } })}
    />
  );
};

export default HomeDecor;