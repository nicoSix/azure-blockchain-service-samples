pragma solidity >=0.5;

contract SimpleStorage {
    uint storedData;

    constructor() public {
        storedData = 0;
    }

    function get() public view returns (uint) {
        return storedData;
    }

    function set(uint value) public {
        storedData = value;
    }
}