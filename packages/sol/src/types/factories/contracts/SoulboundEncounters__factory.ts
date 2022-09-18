/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  SoulboundEncounters,
  SoulboundEncountersInterface,
} from "../../contracts/SoulboundEncounters";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "give",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "initialName",
        type: "string",
      },
      {
        internalType: "string",
        name: "initialSymbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "initialVersion",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "take",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "unequip",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a0604052306080523480156200001557600080fd5b506200002062000026565b62000116565b600054610100900460ff16156200005a5760405162461bcd60e51b81526004016200005190620000b4565b60405180910390fd5b60005460ff9081161015620000b2576000805460ff191660ff9081179091556040517f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249891620000a99162000106565b60405180910390a15b565b602080825281016200010081602781527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469602082015266616c697a696e6760c81b604082015260600190565b92915050565b60ff821681526020810162000100565b60805161242d6200014e600039600081816103eb01528181610434015281816104e50152818161052501526105ca015261242d6000f3fe6080604052600436106100f35760003560e01c80638da5cb5b1161008a578063c87b56dd11610059578063c87b56dd1461027c578063d179e3d01461029c578063ec64948e146102bc578063f2fde38b146102dc57600080fd5b80638da5cb5b1461020957806395d89b4114610227578063a39478031461023c578063a6487c531461025c57600080fd5b806352d1902d116100c657806352d1902d146101855780636352211e146101a757806370a08231146101d4578063715018a6146101f457600080fd5b806301ffc9a7146100f857806306fdde031461012e5780633659cfe6146101505780634f1ef28614610172575b600080fd5b34801561010457600080fd5b50610118610113366004611504565b6102fc565b6040516101259190611537565b60405180910390f35b34801561013a57600080fd5b5061014361034e565b604051610125919061159b565b34801561015c57600080fd5b5061017061016b3660046115d1565b6103e1565b005b6101706101803660046116ed565b6104db565b34801561019157600080fd5b5061019a6105bd565b604051610125919061174b565b3480156101b357600080fd5b506101c76101c236600461176a565b61062c565b6040516101259190611794565b3480156101e057600080fd5b5061019a6101ef3660046115d1565b610662565b34801561020057600080fd5b506101706106a7565b34801561021557600080fd5b506033546001600160a01b03166101c7565b34801561023357600080fd5b506101436106bb565b34801561024857600080fd5b5061019a6102573660046117ed565b6106cb565b34801561026857600080fd5b5061017061027736600461187d565b610776565b34801561028857600080fd5b5061014361029736600461176a565b61087e565b3480156102a857600080fd5b506101706102b736600461176a565b610955565b3480156102c857600080fd5b5061019a6102d73660046117ed565b6109b8565b3480156102e857600080fd5b506101706102f73660046115d1565b610a36565b60006001600160e01b03198216635b5e139f60e01b148061032d57506001600160e01b031982166346bdd63960e11b145b8061034857506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060610130805461035e90611933565b80601f016020809104026020016040519081016040528092919081815260200182805461038a90611933565b80156103d75780601f106103ac576101008083540402835291602001916103d7565b820191906000526020600020905b8154815290600101906020018083116103ba57829003601f168201915b5050505050905090565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036104325760405162461bcd60e51b8152600401610429906119bc565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661048d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6001600160a01b0316146104b35760405162461bcd60e51b815260040161042990611a26565b6104bc81610a6d565b604080516000808252602082019092526104d891839190610a75565b50565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105235760405162461bcd60e51b8152600401610429906119bc565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661057e7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6001600160a01b0316146105a45760405162461bcd60e51b815260040161042990611a26565b6105ad82610a6d565b6105b982826001610a75565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146106075760405162461bcd60e51b815260040161042990611a90565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b600081815261013260205260408120546001600160a01b0316806103485760405162461bcd60e51b815260040161042990611ad7565b60006001600160a01b03821661068a5760405162461bcd60e51b815260040161042990611b41565b506001600160a01b03166000908152610134602052604090205490565b6106af610b6e565b6106b96000610b98565b565b6060610131805461035e90611933565b60006001600160a01b03861633036106f55760405162461bcd60e51b815260040161042990611b85565b6000610705338888888888610bea565b905061074987338389898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610ca892505050565b50600881901c600090815261012f602052604090208054600160ff84161b17905590505b95945050505050565b600054610100900460ff16158080156107965750600054600160ff909116105b806107b05750303b1580156107b0575060005460ff166001145b6107cc5760405162461bcd60e51b815260040161042990611bef565b6000805460ff1916600117905580156107ef576000805461ff0019166101001790555b6101306107fc8582611c9f565b5061013161080a8482611c9f565b50610813610d95565b61081b610dc4565b6108258483610deb565b61082d610dc4565b8015610878576000805461ff00191690556040517f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989061086f90600190611d77565b60405180910390a15b50505050565b600081815261013260205260409020546060906001600160a01b03166108b65760405162461bcd60e51b815260040161042990611db9565b60008281526101336020526040902080546108d090611933565b80601f01602080910402602001604051908101604052809291908181526020018280546108fc90611933565b80156109495780601f1061091e57610100808354040283529160200191610949565b820191906000526020600020905b81548152906001019060200180831161092c57829003601f168201915b50505050509050919050565b61095e8161062c565b6001600160a01b0316336001600160a01b03161461098e5760405162461bcd60e51b815260040161042990611dfd565b600881901c600090815261012f602052604090208054600160ff84161b191690556104d881610e1c565b60006001600160a01b03861633036109e25760405162461bcd60e51b815260040161042990611e41565b60006109f2338888888888610bea565b905061074933888389898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610ca892505050565b610a3e610b6e565b6001600160a01b038116610a645760405162461bcd60e51b815260040161042990611eab565b6104d881610b98565b6104d8610b6e565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610aad57610aa883610ec8565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610b07575060408051601f3d908101601f19168201909252610b0491810190611ec6565b60015b610b235760405162461bcd60e51b815260040161042990611f41565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8114610b625760405162461bcd60e51b815260040161042990611fab565b50610aa8838383610f30565b6033546001600160a01b031633146106b95760405162461bcd60e51b815260040161042990611fed565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600080610bf988888888610f55565b905060008160001c9050610c44888387878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610fc492505050565b610c605760405162461bcd60e51b815260040161042990612057565b600881901c600090815261012f6020526040902054600160ff83161b1615610c9a5760405162461bcd60e51b8152600401610429906120a5565b9150505b9695505050505050565b600082815261013260205260408120546001600160a01b031615610cde5760405162461bcd60e51b8152600401610429906120e9565b6001600160a01b038416600090815261013460205260408120805460019290610d0890849061210f565b909155505060008381526101326020908152604080832080546001600160a01b0319166001600160a01b0389161790556101339091529020610d4a8382611c9f565b5082846001600160a01b0316866001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a450909392505050565b600054610100900460ff16610dbc5760405162461bcd60e51b81526004016104299061217c565b6106b961111d565b600054610100900460ff166106b95760405162461bcd60e51b81526004016104299061217c565b600054610100900460ff16610e125760405162461bcd60e51b81526004016104299061217c565b6105b9828261114d565b6000610e278261062c565b6001600160a01b0381166000908152610134602052604081208054929350600192909190610e5690849061218c565b909155505060008281526101326020908152604080832080546001600160a01b03191690556101339091528120610e8c91611494565b60405182906000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b0381163b610eef5760405162461bcd60e51b8152600401610429906121f9565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b610f398361118e565b600082511180610f465750805b15610aa85761087883836111ce565b6000807fe76a195fbe43f0eaa611595069f780493db2202a1cc4b2d7d44b47069812998a86868686604051610f8b92919061221c565b604051908190038120610fa394939291602001612229565b604051602081830303815290604052805190602001209050610c9e8161127a565b6000806000610fd3858561128d565b90925090506000816004811115610fec57610fec61225e565b14801561100a5750856001600160a01b0316826001600160a01b0316145b1561101a57600192505050611116565b600080876001600160a01b0316631626ba7e60e01b8888604051602401611042929190612274565b60408051601f198184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166001600160e01b031990941693909317909252905161109591906122b6565b600060405180830381855afa9150503d80600081146110d0576040519150601f19603f3d011682016040523d82523d6000602084013e6110d5565b606091505b50915091508180156110e8575080516020145b801561110f57508051630b135d3f60e11b9061110d9083016020908101908401611ec6565b145b9450505050505b9392505050565b600054610100900460ff166111445760405162461bcd60e51b81526004016104299061217c565b6106b933610b98565b600054610100900460ff166111745760405162461bcd60e51b81526004016104299061217c565b815160209283012081519190920120609791909155609855565b61119781610ec8565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6111f75760405162461bcd60e51b81526004016104299061231c565b600080846001600160a01b03168460405161121291906122b6565b600060405180830381855af49150503d806000811461124d576040519150601f19603f3d011682016040523d82523d6000602084013e611252565b606091505b509150915061076d82826040518060600160405280602781526020016123d1602791396112d2565b600061034861128761130b565b83611347565b60008082516041036112c35760208301516040840151606085015160001a6112b78782858561137a565b945094505050506112cb565b506000905060025b9250929050565b606083156112e1575081611116565b8251156112f15782518084602001fd5b8160405162461bcd60e51b8152600401610429919061159b565b60006113427f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f61133a60975490565b60985461145a565b905090565b6000828260405160200161135c92919061232c565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156113b15750600090506003611451565b8460ff16601b141580156113c957508460ff16601c14155b156113da5750600090506004611451565b6000600187878787604051600081526020016040526040516113ff9493929190612366565b6020604051602081039080840390855afa158015611421573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661144a57600060019250925050611451565b9150600090505b94509492505050565b6000838383463060405160200161147595949392919061238e565b6040516020818303038152906040528051906020012090509392505050565b5080546114a090611933565b6000825580601f106114b0575050565b601f0160209004906000526020600020908101906104d891905b808211156114de57600081556001016114ca565b5090565b6001600160e01b031981165b81146104d857600080fd5b8035610348816114e2565b60006020828403121561151957611519600080fd5b600061152584846114f9565b949350505050565b8015155b82525050565b60208101610348828461152d565b60005b83811015611560578181015183820152602001611548565b50506000910152565b6000611573825190565b80845260208401935061158a818560208601611545565b601f01601f19169290920192915050565b602080825281016111168184611569565b60006001600160a01b038216610348565b6114ee816115ac565b8035610348816115bd565b6000602082840312156115e6576115e6600080fd5b600061152584846115c6565b634e487b7160e01b600052604160045260246000fd5b601f19601f830116810181811067ffffffffffffffff8211171561162e5761162e6115f2565b6040525050565b600061164060405190565b905061164c8282611608565b919050565b600067ffffffffffffffff82111561166b5761166b6115f2565b601f19601f83011660200192915050565b82818337506000910152565b600061169b61169684611651565b611635565b9050828152602081018484840111156116b6576116b6600080fd5b6116c184828561167c565b509392505050565b600082601f8301126116dd576116dd600080fd5b8135611525848260208601611688565b6000806040838503121561170357611703600080fd5b600061170f85856115c6565b925050602083013567ffffffffffffffff81111561172f5761172f600080fd5b61173b858286016116c9565b9150509250929050565b80611531565b602081016103488284611745565b806114ee565b803561034881611759565b60006020828403121561177f5761177f600080fd5b6000611525848461175f565b611531816115ac565b60208101610348828461178b565b60008083601f8401126117b7576117b7600080fd5b50813567ffffffffffffffff8111156117d2576117d2600080fd5b6020830191508360018202830111156112cb576112cb600080fd5b60008060008060006060868803121561180857611808600080fd5b600061181488886115c6565b955050602086013567ffffffffffffffff81111561183457611834600080fd5b611840888289016117a2565b9450945050604086013567ffffffffffffffff81111561186257611862600080fd5b61186e888289016117a2565b92509250509295509295909350565b60008060006060848603121561189557611895600080fd5b833567ffffffffffffffff8111156118af576118af600080fd5b6118bb868287016116c9565b935050602084013567ffffffffffffffff8111156118db576118db600080fd5b6118e7868287016116c9565b925050604084013567ffffffffffffffff81111561190757611907600080fd5b611913868287016116c9565b9150509250925092565b634e487b7160e01b600052602260045260246000fd5b60028104600182168061194757607f821691505b6020821081036119595761195961191d565b50919050565b602c81526000602082017f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682081527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015291505b5060400190565b602080825281016103488161195f565b602c81526000602082017f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682081527f6163746976652070726f78790000000000000000000000000000000000000000602082015291506119b5565b60208082528101610348816119cc565b603881526000602082017f555550535570677261646561626c653a206d757374206e6f742062652063616c81527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015291506119b5565b6020808252810161034881611a36565b601c81526000602082017f6f776e65724f663a20746f6b656e20646f65736e277420657869737400000000815291505b5060200190565b6020808252810161034881611aa0565b602c81526000602082017f62616c616e63654f663a2061646472657373207a65726f206973206e6f74206181527f2076616c6964206f776e65720000000000000000000000000000000000000000602082015291506119b5565b6020808252810161034881611ae7565b601b81526000602082017f74616b653a2063616e6e6f742074616b652066726f6d2073656c66000000000081529150611ad0565b6020808252810161034881611b51565b602e81526000602082017f496e697469616c697a61626c653a20636f6e747261637420697320616c72656181527f647920696e697469616c697a6564000000000000000000000000000000000000602082015291506119b5565b6020808252810161034881611b95565b6000610348611c0b8381565b90565b611c1783611bff565b81546008840282811b60001990911b908116901990911617825550505050565b6000610aa8818484611c0e565b818110156105b957611c57600082611c37565b600101611c44565b601f821115610aa8576000818152602090206020601f85010481016020851015611c865750805b611c986020601f860104830182611c44565b5050505050565b815167ffffffffffffffff811115611cb957611cb96115f2565b611cc38254611933565b611cce828285611c5f565b6020601f831160018114611d025760008415611cea5750858201515b600019600886021c1981166002860217865550611d5b565b600085815260208120601f198616915b82811015611d325788850151825560209485019460019092019101611d12565b86831015611d4e5784890151600019601f89166008021c191682555b6001600288020188555050505b505050505050565b600060ff8216610348565b61153181611d63565b602081016103488284611d6e565b601d81526000602082017f746f6b656e5552493a20746f6b656e20646f65736e277420657869737400000081529150611ad0565b6020808252810161034881611d85565b601d81526000602082017f756e65717569703a2073656e646572206d757374206265206f776e657200000081529150611ad0565b6020808252810161034881611dc9565b601b81526000602082017f676976653a2063616e6e6f7420676976652066726f6d2073656c66000000000081529150611ad0565b6020808252810161034881611e0d565b602681526000602082017f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181527f6464726573730000000000000000000000000000000000000000000000000000602082015291506119b5565b6020808252810161034881611e51565b805161034881611759565b600060208284031215611edb57611edb600080fd5b60006115258484611ebb565b602e81526000602082017f45524331393637557067726164653a206e657720696d706c656d656e7461746981527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015291506119b5565b6020808252810161034881611ee7565b602981526000602082017f45524331393637557067726164653a20756e737570706f727465642070726f7881527f6961626c65555549440000000000000000000000000000000000000000000000602082015291506119b5565b6020808252810161034881611f51565b60208082527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657291019081526000611ad0565b6020808252810161034881611fbb565b602681526000602082017f5f73616665436865636b41677265656d656e743a20696e76616c69642073696781527f6e61747572650000000000000000000000000000000000000000000000000000602082015291506119b5565b6020808252810161034881611ffd565b602181526000602082017f5f73616665436865636b41677265656d656e743a20616c7265616479207573658152601960fa1b602082015291506119b5565b6020808252810161034881612067565b601481526000602082017f6d696e743a20746f6b656e49442065786973747300000000000000000000000081529150611ad0565b60208082528101610348816120b5565b634e487b7160e01b600052601160045260246000fd5b80820180821115610348576103486120f9565b602b81526000602082017f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206981527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015291506119b5565b6020808252810161034881612122565b81810381811115610348576103486120f9565b602d81526000602082017f455243313936373a206e657720696d706c656d656e746174696f6e206973206e81527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015291506119b5565b602080825281016103488161219f565b600061221683858461167c565b50500190565b6000611525828486612209565b608081016122378287611745565b612244602083018661178b565b612251604083018561178b565b61076d6060830184611745565b634e487b7160e01b600052602160045260246000fd5b604081016122828285611745565b81810360208301526115258184611569565b600061229e825190565b6122ac818560208601611545565b9290920192915050565b60006111168284612294565b602681526000602082017f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f81527f6e74726163740000000000000000000000000000000000000000000000000000602082015291506119b5565b60208082528101610348816122c2565b61190160f01b815260020160006123438285611745565b6020820191506123538284611745565b5060200192915050565b60ff8116611531565b608081016123748287611745565b612381602083018661235d565b6122516040830185611745565b60a0810161239c8288611745565b6123a96020830187611745565b6123b66040830186611745565b6123c36060830185611745565b610c9e608083018461178b56fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212201541cb443c24bdfa5b7ca8d28e072a5b7147365bc85486c838ea7464ac815de664736f6c63430008100033";

type SoulboundEncountersConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SoulboundEncountersConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SoulboundEncounters__factory extends ContractFactory {
  constructor(...args: SoulboundEncountersConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SoulboundEncounters> {
    return super.deploy(overrides || {}) as Promise<SoulboundEncounters>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SoulboundEncounters {
    return super.attach(address) as SoulboundEncounters;
  }
  override connect(signer: Signer): SoulboundEncounters__factory {
    return super.connect(signer) as SoulboundEncounters__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SoulboundEncountersInterface {
    return new utils.Interface(_abi) as SoulboundEncountersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SoulboundEncounters {
    return new Contract(address, _abi, signerOrProvider) as SoulboundEncounters;
  }
}
