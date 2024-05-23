import { ColliderLayer, engine, GltfContainer, Transform } from '@mtvproject/sdk/ecs'
import { Vector3 } from '@mtvproject/sdk/math'

export function addBuildings() {
  for (let i = 1; i < 8; i++) {
    const street = engine.addEntity()
    GltfContainer.create(street, {
      src: `models/StreetPart0${i}.glb`,
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })
    Transform.create(street, {
      position: Vector3.create(0, 0, 0)
    })
  }
}
