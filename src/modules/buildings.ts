import { ColliderLayer, engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export function addBuildings() {

    const adsScreensGrp = engine.addEntity()
    GltfContainer.create(adsScreensGrp, {
        src: 'models/AdsScreensGrp.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(adsScreensGrp, {
        position: Vector3.create(0, 0, 0)
    })


    const casino = engine.addEntity()
    Transform.create(casino, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(casino, {
        src: 'models/casino/Casino.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })


    const central = engine.addEntity()
    Transform.create(central, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(central, {
        src: 'models/Central.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })


    const city = engine.addEntity()
    Transform.create(city, {
        position: Vector3.create(0, 0, 0),

    })
    GltfContainer.create(city, {
        src: 'models/City.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })

    const holoAds = engine.addEntity()
    GltfContainer.create(holoAds, {
        src: 'models/HoloAds.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(holoAds, {
        position: Vector3.create(0, 0, 0)
    })


    const park = engine.addEntity()
    GltfContainer.create(park, {
        src: 'models/Park.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(park, {
        position: Vector3.create(0, 0, 0)
    })

    const blocks = engine.addEntity()
    GltfContainer.create(blocks, {
        src: 'models/Blocks.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(blocks, {
        position: Vector3.create(0, 0, 0)
    })

    const shops = engine.addEntity()
    GltfContainer.create(shops, {
        src: 'models/Shops.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(shops, {
        position: Vector3.create(0, 0, 0)
    })

    const vehicles = engine.addEntity()
    GltfContainer.create(vehicles, {
        src: 'models/Vehicles.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(vehicles, {
        position: Vector3.create(0, 0, 0)
    })

    addConcertBuilding()
    addCarShowRoomBuilding();
    addCity()
    addCasino()
    addPark()
}

function addPark() {
    const sideWalk = engine.addEntity()
    GltfContainer.create(sideWalk, {
        src: 'models/park/SideWalk.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(sideWalk, {
        position: Vector3.create(0, 0, 0)
    })
}

function addCasino() {
    const floor = engine.addEntity()
    GltfContainer.create(floor, {
        src: 'models/casino/Floor.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(floor, {
        position: Vector3.create(0, 0, 0)
    })

    const cards = engine.addEntity()
    GltfContainer.create(cards, {
        src: 'models/casino/Cards.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(cards, {
        position: Vector3.create(0, 0, 0)
    })

    const env = engine.addEntity()
    GltfContainer.create(env, {
        src: 'models/casino/Env.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(env, {
        position: Vector3.create(0, 0, 0)
    })

    const floorFx = engine.addEntity()
    GltfContainer.create(floorFx, {
        src: 'models/casino/FloorFx.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(floorFx, {
        position: Vector3.create(0, 0, 0)
    })

    const props = engine.addEntity()
    GltfContainer.create(props, {
        src: 'models/casino/Props.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(props, {
        position: Vector3.create(0, 0, 0)
    })
}

function addCity() {
    const city = engine.addEntity()
    Transform.create(city, {
        position: Vector3.create(0, 0, 0),

    })
    GltfContainer.create(city, {
        src: 'models/City.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })

    const watter = engine.addEntity()
    Transform.create(watter, {
        position: Vector3.create(0, 0, 0),

    })
    GltfContainer.create(watter, {
        src: 'models/WaterPlane.glb',
    })


    const sidewalkBarrier = engine.addEntity()
    GltfContainer.create(sidewalkBarrier, {
        src: 'models/city/SidewalkBarrier.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(sidewalkBarrier, {
        position: Vector3.create(0, 0, 0)
    })

    const sidewalks = engine.addEntity()
    GltfContainer.create(sidewalks, {
        src: 'models/city/Sidewalks.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(sidewalks, {
        position: Vector3.create(0, 0, 0)
    })

    const streetLights = engine.addEntity()
    GltfContainer.create(streetLights, {
        src: 'models/city/StreetLights.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(streetLights, {
        position: Vector3.create(0, 0, 0)
    })
}

function addCarShowRoomBuilding() {
    const aurora = engine.addEntity()
    GltfContainer.create(aurora, {
        src: 'models/car_showroom/Aurora.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(aurora, {
        position: Vector3.create(0, 0, 0)
    })

    const props = engine.addEntity()
    GltfContainer.create(props, {
        src: 'models/car_showroom/Props.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(props, {
        position: Vector3.create(0, 0, 0)
    })

    const car = engine.addEntity()
    GltfContainer.create(car, {
        src: 'models/car_showroom/Car.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(car, {
        position: Vector3.create(0, 0, 0)
    })

    const road = engine.addEntity()
    GltfContainer.create(road, {
        src: 'models/car_showroom/Roads.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(road, {
        position: Vector3.create(0, 0, 0)
    })

    const sidewalkStraight = engine.addEntity()
    GltfContainer.create(sidewalkStraight, {
        src: 'models/car_showroom/SidewalkStraight.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(sidewalkStraight, {
        position: Vector3.create(0, 0, 0)
    })

    const bldPlatformLarge = engine.addEntity()
    GltfContainer.create(bldPlatformLarge, {
        src: 'models/car_showroom/BldPlatformLarge.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(bldPlatformLarge, {
        position: Vector3.create(0, 0, 0)
    })

    const trees = engine.addEntity()
    GltfContainer.create(trees, {
        src: 'models/car_showroom/Trees.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(trees, {
        position: Vector3.create(0, 0, 0)
    })

    const building = engine.addEntity()
    GltfContainer.create(building, {
        src: 'models/car_showroom/Building.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(building, {
        position: Vector3.create(0, 0, 0)
    })

    const quad = engine.addEntity()
    GltfContainer.create(quad, {
        src: 'models/car_showroom/Quad.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(quad, {
        position: Vector3.create(0, 0, 0)
    })

    const pathSide = engine.addEntity()
    GltfContainer.create(pathSide, {
        src: 'models/car_showroom/PathSide.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
    Transform.create(pathSide, {
        position: Vector3.create(0, 0, 0)
    })
}


function addConcertBuilding() {

    const musicFloor = engine.addEntity()
    Transform.create(musicFloor, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(musicFloor, {
        src: 'models/concert/MusicFloor.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })

    const musicFloor01 = engine.addEntity()
    Transform.create(musicFloor01, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(musicFloor01, {
        src: 'models/concert/MusicFloor01.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })


    const fxDancer = engine.addEntity()
    Transform.create(fxDancer, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(fxDancer, {
        src: 'models/concert/FxDancer.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })

    const props = engine.addEntity()
    Transform.create(props, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(props, {
        src: 'models/concert/Props.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })

    const sMBldPlatformLarge = engine.addEntity()
    Transform.create(sMBldPlatformLarge, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(sMBldPlatformLarge, {
        src: 'models/concert/SMBldPlatformLarge.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })

    const sMBldPortal = engine.addEntity()
    Transform.create(sMBldPortal, {
        position: Vector3.create(0, 0, 0)
    })
    GltfContainer.create(sMBldPortal, {
        src: 'models/concert/SMBldPortal.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    })
}