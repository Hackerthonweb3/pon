// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.16;

import { IERC4973 } from 'erc4973/src/interfaces/IERC4973.sol';
import { IERC721Metadata } from 'erc4973/src/interfaces/IERC721Metadata.sol';

import { EIP712Upgradeable } from '@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol';
import { ERC165Upgradeable } from '@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol';
import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { UUPSUpgradeable } from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

import { BitMaps } from '@openzeppelin/contracts/utils/structs/BitMaps.sol';
import { SignatureChecker } from '@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol';

bytes32 constant AGREEMENT_HASH = keccak256('Agreement(address active,address passive,string tokenURI)');

contract SoulboundEncounters is
    IERC4973,
    IERC721Metadata,
    OwnableUpgradeable,
    ERC165Upgradeable,
    EIP712Upgradeable,
    UUPSUpgradeable
{
    using BitMaps for BitMaps.BitMap;
    BitMaps.BitMap private _usedHashes;

    string private _name;
    string private _symbol;

    mapping(uint256 => address) private _owners;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) private _balances;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory initialName,
        string memory initialSymbol,
        string memory initialVersion
    ) public initializer {
        _name = initialName;
        _symbol = initialSymbol;

        __Ownable_init();
        __ERC165_init();
        __EIP712_init(initialName, initialVersion);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(
        address /*newImplementation*/
    ) internal virtual override onlyOwner {}

    function supportsInterface(bytes4 _interfaceId) public view virtual override returns (bool) {
        return
            _interfaceId == type(IERC721Metadata).interfaceId ||
            _interfaceId == type(IERC4973).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    function balanceOf(address owner) external view virtual returns (uint256) {
        require(owner != address(0), 'balanceOf: address zero is not a valid owner');
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view virtual returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ownerOf: token doesn't exist");
        return owner;
    }

    function unequip(uint256 tokenId) external virtual {
        require(msg.sender == ownerOf(tokenId), 'unequip: sender must be owner');
        _usedHashes.unset(tokenId);
        _burn(tokenId);
    }

    function give(
        address to,
        string calldata uri,
        bytes calldata signature
    ) external virtual returns (uint256) {
        require(msg.sender != to, 'give: cannot give from self');
        uint256 tokenId = _safeCheckAgreement(msg.sender, to, uri, signature);
        _mint(msg.sender, to, tokenId, uri);
        _usedHashes.set(tokenId);
        return tokenId;
    }

    function take(
        address from,
        string calldata uri,
        bytes calldata signature
    ) external virtual returns (uint256) {
        require(msg.sender != from, 'take: cannot take from self');
        uint256 tokenId = _safeCheckAgreement(msg.sender, from, uri, signature);
        _mint(from, msg.sender, tokenId, uri);
        _usedHashes.set(tokenId);
        return tokenId;
    }

    function name() external view virtual returns (string memory) {
        return _name;
    }

    function symbol() external view virtual returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId) external view virtual returns (string memory) {
        require(_exists(tokenId), "tokenURI: token doesn't exist");
        return _tokenURIs[tokenId];
    }

    function _safeCheckAgreement(
        address active,
        address passive,
        string calldata uri,
        bytes calldata signature
    ) internal virtual returns (uint256) {
        bytes32 hash = _getHash(active, passive, uri);
        uint256 tokenId = uint256(hash);

        require(
            SignatureChecker.isValidSignatureNow(passive, hash, signature),
            '_safeCheckAgreement: invalid signature'
        );
        require(!_usedHashes.get(tokenId), '_safeCheckAgreement: already used');
        return tokenId;
    }

    function _getHash(
        address active,
        address passive,
        string calldata uri
    ) internal view virtual returns (bytes32) {
        bytes32 structHash = keccak256(abi.encode(AGREEMENT_HASH, active, passive, keccak256(bytes(uri))));
        return _hashTypedDataV4(structHash);
    }

    function _mint(
        address from,
        address to,
        uint256 tokenId,
        string memory uri
    ) internal virtual returns (uint256) {
        require(!_exists(tokenId), 'mint: tokenID exists');
        _balances[to] += 1;
        _owners[tokenId] = to;
        _tokenURIs[tokenId] = uri;
        emit Transfer(from, to, tokenId);
        return tokenId;
    }

    function _burn(uint256 tokenId) internal virtual {
        address owner = ownerOf(tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];
        delete _tokenURIs[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }
}
