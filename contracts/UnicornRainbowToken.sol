//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UnicornRainbowToken is ERC20 {
  constructor() ERC20("UniRainbow", "UNIR") public {
    _mint(msg.sender, 4200 ether);
  }

  function burn(uint256 _amount) external {
    _burn(address(msg.sender), _amount);
  }
}