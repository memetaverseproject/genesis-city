import { engine } from "@mtvproject/sdk/ecs";
import { addBuildings } from "./modules/buildings";
import { checkin } from "./modules/checkin";
import { loadTreasurySlot } from "./modules/treasury";
import { handleSpin } from "./modules/spin";

export function main() {
    addBuildings()
    checkin();
    loadTreasurySlot();

    engine.addSystem(handleSpin);
}
