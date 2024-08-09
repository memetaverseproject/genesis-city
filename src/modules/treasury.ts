import {
  Animator,
  ColliderLayer,
  engine,
  Entity,
  executeTask,
  GltfContainer,
  InputAction,
  MeshCollider,
  pointerEventsSystem,
  Transform,
  TransformTypeWithOptionals
} from '@mtvproject/sdk/ecs'
import { Vector3 } from '@mtvproject/sdk/math'
import { signedFetch } from '~system/SignedFetch'
import { SpinComponent } from './spin'
import { RequestManager, ContractFactory } from 'eth-connect'
import { createEthereumProvider } from '@mtvproject/sdk/ethereum-provider'
import { abi } from '../contracts/treasury'
import { getPlayer } from '@mtvproject/sdk/src/players'
import * as utils from '@mtvproject/sdk-utils'

let rewardItems : any[] = []

const ITEMS_ENDPOINT = 'https://treasury-hunt.memetaverse.club/api/v1/items?limit=1000';
const API_BASEURL = 'https://treasury-hunt.memetaverse.club/api/v1/treasuries/6e9add27-5bfb-4b66-b63e-047eca1c3663/slots'

const SLOT_ENPOINT = API_BASEURL
interface ISlotData {
  id: string
  position: number
}

interface IChest {
  id: string
  entity: Entity
  playAnimation(): void
  position: number
}

let chests: IChest[] = []

let currentSlotData: ISlotData[] = []

let positionMaps: Map<number, TransformTypeWithOptionals> = new Map();

executeTask(async () => {
	try {
		let response = await fetch(ITEMS_ENDPOINT)
		let json = await response.json()
		rewardItems = json.rows;
	} catch {
		console.log('failed to reach URL')
	}
})

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



function neededClean(newSlotData: ISlotData[]) {
  const currSlotDataIds = currentSlotData.map(s => s.id);
  let intersection = newSlotData.filter((x) => !currSlotDataIds.includes(x.id))
  return intersection.length > 0;
}

function updateSlot(newSlotData: ISlotData[]) {
  const newSlotDataIds = newSlotData.map(s => s.id);
  if (neededClean(newSlotData)) {
    for (let chest of chests) {
      engine.removeEntityWithChildren(chest.entity)
    }

    for (let slotData of newSlotData) {
      chests.push(createChestEntry(slotData))
    }
  } else {
    let difference = currentSlotData.filter((x) => !newSlotDataIds.includes(x.id)).map((s) => s.id)
    for (let chest of chests) {
      if (difference.includes(chest.id)) {
        chest.playAnimation()
        break
      }
    }
  }
  currentSlotData = newSlotData;
}

function createChestRewardItemEntity(data: ISlotData, chest: Entity, reward: any) : any {
  const itemData = rewardItems.find(r => r.id == reward.itemId);
  if (!itemData) return null;
  switch (itemData.tokenAddress.toLowerCase()) {
    case "0xf64fb1ca7f302739c509c4a8346ba48bcacab845":
      createChestRewardU2UTshirtEntity(data, chest, reward);
      break;
  }
}

function createChestRewardU2UTshirtEntity(data: ISlotData, chest: Entity, reward: any) {
  let isClaimed = false

  const clother = engine.addEntity()
  GltfContainer.create(clother, {
    src: `models/u2u_tshirt.glb`,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })

  Transform.create(clother, {
    parent: chest,
    position: Vector3.create(0,-0.5,0),
    scale: Vector3.create(1.5, 1.5, 1.5)
  })

  MeshCollider.setBox(clother);

  SpinComponent.create(clother, { speed: 50 })

  async function handleSubmitTx() {
    await submitClaimTx(reward);
    isClaimed = true;
    MeshCollider.deleteFrom(clother);
  }

  pointerEventsSystem.onPointerDown(
    {
      entity: clother,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Claim this item' }
    },
    function () {
      if (!isClaimed) {
        handleSubmitTx();
      }
    }
  )
}

async function submitClaimTx(reward: any) {
  let userData = getPlayer()
  const itemData = rewardItems.find(r => r.id == reward.itemId);
  // create an instance of the web3 provider to interface with Metamask
  const provider = createEthereumProvider()
  // Create the object that will handle the sending and receiving of RPC messages
  const requestManager = new RequestManager(provider)
  // Create a factory object based on the abi
  const factory = new ContractFactory(requestManager, abi)
  const contract = (await factory.at('0xb8a9617128bD868eE2Ae2F1B25F16a669B9B1472')) as any
  
  if (itemData.type == "ERC20") {
    // Perform a function from the contract
    return contract.claimToken(itemData.tokenAddress, userData.userId, itemData.amount, reward.id, reward.signature, {
      from: userData.userId
    })
  }

   // Perform a function from the contract
   return contract.claimNft(itemData.tokenAddress, userData.userId, itemData.collectionItemId, reward.id, reward.signature, {
    from: userData.userId
  })
}

function createChestEntry(data: ISlotData): IChest {
  let isOpen = false
  const chest = engine.addEntity()
  GltfContainer.create(chest, {
    src: `models/Chest01.glb`,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })


  const samePosition = chests.filter(c => c.position);
  const p = positionMaps.get(data.position);
  Transform.create(chest, {
    ...positionMaps.get(data.position),
    position: samePosition.length > 0 ? Vector3.create(p.position.x + samePosition.length + 5, p.position.y, p.position.z) : p.position,
  })

  Animator.create(chest, {
    states: [
      {
        clip: 'Run',
        playing: false,
        loop: false
      }
    ]
  })

  MeshCollider.setBox(chest)

  async function claim() {
    try {
      const reward = await claimRequest(data.id)
      createChestRewardItemEntity(data, chest, reward)
    } catch {}
  }

  pointerEventsSystem.onPointerDown(
    {
      entity: chest,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Open chest' }
    },
    function () {
      if (!isOpen) {
        Animator.playSingleAnimation(chest, 'Run')
        isOpen = true
        MeshCollider.deleteFrom(chest);
        claim();
      }
    }
  )
  return {
    id: data.id,
    entity: chest,
    position: data.position,
    playAnimation: () => {
      if (!isOpen) {
        Animator.playSingleAnimation(chest, 'Run')
        isOpen = true
      }
    }
  }
}

async function claimRequest(slotId: string) {
  const response = await signedFetch({
    url: `${API_BASEURL}/${slotId}/claim`,
    init: {
      method: 'POST',
      headers: {}
    }
  })
  return JSON.parse(response.body)
}

export async function loadTreasurySlot() {
  utils.timers.setInterval(async () => {
    try {
      let response = await fetch(SLOT_ENPOINT)
      let json = await response.json()
      updateSlot(json.rows.filter((r: { position: number }) => r.position <= 50))
    } catch {
      console.log('failed to r1each URL')
    }
  }, 3000);
}
