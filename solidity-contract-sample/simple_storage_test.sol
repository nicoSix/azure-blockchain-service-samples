pragma solidity >0.4.7;
import "remix_tests.sol"; // injected by remix-tests
import "./simple_storage.sol";

contract SimpleStorageTest {
    SimpleStorage ss;

    function beforeEach() public {
        ss = new SimpleStorage(200);
    }

    function initialValueShouldBe200() public returns (bool) {
        return Assert.equal(ss.get(), 200, "initial value is not correct");
    }

    function modifiedValueShouldBe100() public returns (bool) {
        ss.set(100);
        return Assert.equal(ss.get(), 100, "initial value is not correct");
    }
}