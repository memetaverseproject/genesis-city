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
  TextShape,
  Transform,
} from '@mtvproject/sdk/ecs'
import { Vector3 } from '@mtvproject/sdk/math'
import { signedFetch } from '~system/SignedFetch'
import { SpinComponent } from '../spin'
import { RequestManager, ContractFactory } from 'eth-connect'
import { createEthereumProvider } from '@mtvproject/sdk/ethereum-provider'
import { abi } from '../../contracts/treasury'
import { getPlayer } from '@mtvproject/sdk/src/players'
import * as utils from '@mtvproject/sdk-utils'
import { getBalanceAmount, getDecimalAmount, getDecimals } from './currency'
import BigNumber from 'bignumber.js'
import { positionMaps } from './position'

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


executeTask(async () => {
	try {
		let response = await fetch(ITEMS_ENDPOINT)
		let json = await response.json()
		rewardItems = json.rows;
	} catch {
		console.log('failed to reach URL')
	}
})



// utils.timers.setTimeout(() => {
//   createChestEntry({
//     id: "1",
//     position: 6,
//   })

// }, 2000);


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
  reward.amount = itemData.amount;
  if (!itemData) return null;
  switch (itemData.tokenAddress.toLowerCase()) {
    case "0xf64fb1ca7f302739c509c4a8346ba48bcacab845":
      createChestRewardU2UTshirtEntity(data, chest, reward);
      break;
    case "0x0000000000000000000000000000000000000000":
      createChestRewardTokenEntity(data, chest, reward, "models/tokens/u2u.glb", itemData.tokenAddress.toLowerCase());
      break;
    case "0x5175ffa72649b90e1850ba355ea2788316755922":
      createChestRewardTokenEntity(data, chest, reward, "models/tokens/inutap.glb", itemData.tokenAddress.toLowerCase());
      break;
    case "0x24024448384c8254de72ef06098808e1ed352b14":
      createChestRewardTokenEntity(data, chest, reward, "models/tokens/shib.glb", itemData.tokenAddress.toLowerCase());
      break;
    case "0x9fc40359fe4788cccd8ac12c1f198dc1f467c189":
      createChestRewardTokenEntity(data, chest, reward, "models/tokens/usdt.glb", itemData.tokenAddress.toLowerCase());
      break;
    case '0x68741b16564bd49948c4af1b3a73d8069ee1afc8':
      createChestRewardTokenEntity(data, chest, reward, "models/tokens/meme.glb", itemData.tokenAddress.toLowerCase());
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
  utils.tweens.startTranslation(clother, Vector3.create(0,-0.7,0.3), Vector3.create(0,-0.1,0.3), 3)


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

function createChestRewardTokenEntity(data: ISlotData, chest: Entity, reward: any, model: string, tokenAddr: string) {
  let isClaimed = false
  const clother = engine.addEntity()
  GltfContainer.create(clother, {
    src: model,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })

  Transform.create(clother, {
    parent: chest,
    position: Vector3.create(0,1.5,0.3),
  })
  
  MeshCollider.setBox(clother);

  SpinComponent.create(clother, { speed: 50 })

  async function handleSubmitTx() {
    await submitClaimTx(reward);
    isClaimed = true;
    MeshCollider.deleteFrom(clother);
  }

  const amount = engine.addEntity()
  TextShape.create(amount, {
    text: getBalanceAmount(new BigNumber(reward.amount), getDecimals(tokenAddr)).toString(),
    fontSize: 2,
  })

  Transform.create(amount, {
    parent: clother,
    position: Vector3.create(0, 0.5, 0),
  })

  utils.tweens.startTranslation(clother, Vector3.create(0,1,0.3), Vector3.create(0,1.5,0.3), 3)


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
  const contract = (await factory.at('0x0F3bC580E790717a7C580703977577bD0F867872')) as any
  
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


  const samePosition = chests.filter(c => c.position == data.position);
  const p = positionMaps.get(data.position);
  Transform.create(chest, {
    ...positionMaps.get(data.position),
    position: samePosition.length > 0 ? Vector3.create(p.position.x + samePosition.length * 4, p.position.y, p.position.z) : p.position,
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

  const effect = engine.addEntity()
  GltfContainer.create(effect, {
    src: `models/eddy.glb`,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })

  Transform.create(effect, {
    parent: chest,
    position: Vector3.create(0,0.5,0.2),
    scale: Vector3.create(0.12, 0.12,0.12),
  })
  SpinComponent.create(effect, { speed: 100})

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