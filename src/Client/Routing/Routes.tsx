import { BrowserRouter as Router, Route, Routes as RoutesComponent } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import EthinicStore from "../screens/ShopScreens/EthinicStore/EthinicStore";
import WesternStore from "../screens/ShopScreens/WesternStore/WesternStore";
import HomeDecor from "../screens/ShopScreens/HomeDecorStore/HomeDecor";
import Park from "../screens/Park/Park";
import GameParlour from "../screens/GameParlour/GameParlour";
import AIInteraction from "../screens/AIInteraction/AIInteraction";

const Routes = () => {
  return <Router>
    <RoutesComponent>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ethinic-store" element={<EthinicStore />} />
        <Route path="/western-store" element={<WesternStore />} />
        <Route path="/home-decor" element={<HomeDecor />} />
        <Route path="/game-parlour" element={<GameParlour />} />
        <Route path="/park" element={<Park />} />
        <Route path="/ai-assistant" element={<AIInteraction />} />
    </RoutesComponent>
  </Router>;
};

export default Routes;