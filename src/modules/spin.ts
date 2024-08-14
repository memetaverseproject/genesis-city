import { engine, Schemas, Transform } from '@mtvproject/sdk/ecs'
import { Quaternion, Vector3 } from '@mtvproject/sdk/math'

export const SpinComponent = engine.defineComponent('SpinComponent', { speed: Schemas.Number, axis:  Schemas.String})

export function handleSpin(dt: number) {
  for (const [entity, cardSpin] of engine.getEntitiesWith(SpinComponent)) {
    const transform = Transform.getMutable(entity)
    // update the rotation value accordingly
    transform.rotation = Quaternion.multiply(
      transform.rotation,
      Quaternion.fromAngleAxis(dt * cardSpin.speed, cardSpin.axis == "forward" ? Vector3.Forward() : Vector3.Up())
    )
  }
}
