import { ColliderLayer, engine, GltfContainer, Transform } from '@mtvproject/sdk/ecs'
import { Vector3 } from '@mtvproject/sdk/math'
import * as utils from '@mtvproject/sdk-utils'
import { teleportTo } from "~system/RestrictedActions"
import { SpinComponent } from './spin'

export function addBuildings() {
  for (let i = 1; i < 9; i++) {
    const street = engine.addEntity()
    GltfContainer.create(street, {
      src: `models/StreetPart0${i}.glb`,
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })
    Transform.create(street, {
      position: Vector3.create(0, 0, 0)
    })
  }

  addCasinoTeleportTrigger()
  addConcertTeleportTrigger()
}

function addCasinoTeleportTrigger() {
  const casinoButton = engine.addEntity()

  GltfContainer.create(casinoButton, {
    src: `models/CasinoButton.glb`,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })

  Transform.create(casinoButton, {
    position: Vector3.create(80, 0.5, 58),
    //position: Vector3.create(0, -2, 0)
  })

  utils.triggers.addTrigger(
    casinoButton,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [
      {
        type: 'box',
        scale: { x: 10, y: 10, z: 10 }
      }
    ],
    () => {
      teleportTo({worldCoordinates: {x: -16, y: -7}})
    }
  )
}


function addConcertTeleportTrigger() {
  const button = engine.addEntity()

  GltfContainer.create(button, {
    src: `models/ConcertButton.glb`,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })

  Transform.create(button, {
    position: Vector3.create(-3,12, -110)
  })

  SpinComponent.create(button, { speed: 100, axis :"forward"})

  utils.triggers.addTrigger(
    button,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [
      {
        type: 'box',
        scale: { x: 10, y: 20, z: 2 }
      }
    ],
    () => {
      teleportTo({worldCoordinates: {x: 3, y: 11}})

    }
  )
}