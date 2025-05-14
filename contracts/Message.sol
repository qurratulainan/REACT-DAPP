// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Message {
  mapping(address => string) public userMessages;

  event MessageUpdated(address indexed user, string message);
  
  function setMessage(string memory _message) public {
    userMessages[msg.sender] = _message;
    emit MessageUpdated(msg.sender, _message);
  }
  
  function getMessage() public view returns (string memory) {
    return userMessages[msg.sender];
  }
}
