import { Entity, GltfContainer, MeshRenderer, Schemas, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

const SmokeSwirl = engine.defineComponent("SmokeSwirl", {
    active: Schemas.Boolean,
    scale: Schemas.Number
})



// class SmokeControler {
//     bottomSwirl: Entity
//     bottomSwirl2: Entity

//     constructor() {
//         this.bottomSwirl = engine.addEntity()
//         GltfContainer.create(this.bottomSwirl, {
//             src: 'models/concert/bottom_swirl.glb',
//         })
//         Transform.create(this.bottomSwirl, {
//             position: Vector3.create(0, 0, 0)
//         })

//         SmokeSwirl.create(this.bottomSwirl, { isActive: false })


//         this.bottomSwirl2 = engine.addEntity()
//         GltfContainer.create(this.bottomSwirl2, {
//             src: 'models/concert/bottom_swirl2.glb',
//         })
//         Transform.create(this.bottomSwirl2, {
//             position: Vector3.create(0, 0, 0)
//         })

//         SmokeSwirl.create(this.bottomSwirl2, { isActive: false })
//     }
    
//     start() {
//         this.bottomSwirl.
//     }
// }


export function createSmoke() {
        const bottomSwirl = engine.addEntity()
        GltfContainer.create(bottomSwirl, {
            src: 'models/concert/bottom_swirl.glb',
        })
        Transform.create(bottomSwirl, {
            position: Vector3.create(12, 1, -32),
            scale: Vector3.create(2, 2, 2)
        })

        SmokeSwirl.create(bottomSwirl, { active: true })


        const bottomSwirl2 = engine.addEntity()
        GltfContainer.create(bottomSwirl2, {
            src: 'models/concert/bottom_swirl2.glb',
        })
        Transform.create(bottomSwirl2, {
            position: Vector3.create(12, 1, -32),
            scale: Vector3.create(2, 2, 2)
        })

        SmokeSwirl.create(bottomSwirl2, { active: true })
}


export function smokeSystem(dt: number) {
    // for (const [entity] of engine.getEntitiesWith(SmokeSwirl, Transform)) {
    //     const smoke = SmokeSwirl.getMutable(entity)
    //     const transform = Transform.getMutable(entity)
    //     if (smoke.active) {
    //         if (smoke.scale <1) {
    //             smoke.scale += 0.5 * dt
    //             console.log(smoke.scale)
    //             transform.scale = Vector3.create(smoke.scale, 1, smoke.scale)
    //         } else {
    //             smoke.scale = 1
    //             transform.scale = Vector3.create(1, 1, 1)
    //         }
    //     }
    // }
}