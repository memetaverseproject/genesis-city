import { TransformTypeWithOptionals } from "@mtvproject/sdk/ecs";
import { Vector3 } from "@mtvproject/sdk/math";

export let positionMaps: Map<number, TransformTypeWithOptionals> = new Map();


function initPosition(start: number, end: number, x: number, y: number, z: number) {
  for (let i = 0; i < end-start; i++) {
    positionMaps.set(start + i, {
      position: Vector3.create(x + 20 * i, z, y)
    })
    // createChestEntry({
    //   id: "1",
    //   position: start + i,
    // })
  }
}

initPosition(0,12, -110, 2,1)
initPosition(12,14, -90, 50,1.9)
initPosition(14,16, -90, 70,1.9)
initPosition(16,18, -90, 90,1.9)
initPosition(18,30, -110, 40,1)
initPosition(18,23, -110, -13,1)
initPosition(23,25, -10, -13,0.5)
initPosition(25,27, -10, -26,0.5)
initPosition(27,29, -10, -39,0.5)
initPosition(29,31, -10, -52,0.5)
initPosition(31,36, -45, -65,1)
initPosition(36,41, -45, -78,1)
initPosition(41,46, 25, -13,1)
initPosition(46,50, -45, -91,1.3)
