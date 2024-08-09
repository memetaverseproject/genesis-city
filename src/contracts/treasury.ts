export const abi: any[] = [
  { type: 'constructor', stateMutability: 'nonpayable', inputs: [] },
  {
    type: 'event',
    name: 'ClaimedERC721',
    inputs: [
      { type: 'address', name: 'token', internalType: 'address', indexed: false },
      { type: 'address', name: 'to', internalType: 'address', indexed: false },
      { type: 'uint256', name: 'itemId', internalType: 'uint256', indexed: false },
      { type: 'uint256', name: 'cId', internalType: 'uint256', indexed: false }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'ClaimedErc20',
    inputs: [
      { type: 'address', name: 'token', internalType: 'address', indexed: false },
      { type: 'address', name: 'to', internalType: 'address', indexed: false },
      { type: 'uint256', name: 'amount', internalType: 'uint256', indexed: false },
      { type: 'uint256', name: 'cId', internalType: 'uint256', indexed: false }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { type: 'address', name: 'previousOwner', internalType: 'address', indexed: true },
      { type: 'address', name: 'newOwner', internalType: 'address', indexed: true }
    ],
    anonymous: false
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'claimNft',
    inputs: [
      { type: 'address', name: 'token', internalType: 'address' },
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'uint256', name: 'itemId', internalType: 'uint256' },
      { type: 'uint256', name: 'rhId', internalType: 'uint256' },
      { type: 'bytes', name: 'sig', internalType: 'bytes' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'claimToken',
    inputs: [
      { type: 'address', name: 'token', internalType: 'address' },
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' },
      { type: 'uint256', name: 'rhId', internalType: 'uint256' },
      { type: 'bytes', name: 'sig', internalType: 'bytes' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'getBalance',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'getChainID',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'owner',
    inputs: []
  },
  { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'renounceOwnership', inputs: [] },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'withdraw',
    inputs: [
      { type: 'address', name: 'token', internalType: 'address' },
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'withdrawNFT',
    inputs: [
      { type: 'address', name: 'token', internalType: 'address' },
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'uint256', name: 'tokenId', internalType: 'uint256' }
    ]
  },
  { type: 'receive', stateMutability: 'payable' }
]
