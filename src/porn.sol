pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Token {
    string  public name = "PornCoin";
    string  public symbol = "PC";
    uint256 public totalSupply;
    uint8   public decimals = 0;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    address public chairperson;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initialSupply, string memory _name) public {
        chairperson = msg.sender;
        join(chairperson, _name);
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
    /////////
    struct Comment {
        uint256 id;
        bool like;
        string content;
        uint comment_time;
        string author;
        address author_addr;
    }
    struct Post {
        string type_;
        string title;
        string content;
        string author;
        address author_addr;
        int pb_value;
        uint post_time;
        uint id;
    }
    Post[] public posts;
    Comment[] public comments;
    mapping(address => uint[]) public account_to_post;
    mapping(uint => address) public post_to_account;
    mapping(uint => Comment[]) public post_to_comment;
    mapping(uint => address) public comment_to_account;
    mapping(address => string) public addrToName;
    mapping(address => uint256) public addrToTime;
    mapping (address => mapping (address => uint256)) allowed;
    event NewPostAdded(uint post_id, uint comment_id, address owner);
    function join(address addr, string memory _name) public{
        string memory empty = "";

        if (keccak256(bytes(addrToName[addr])) == keccak256(bytes(empty))){
            addrToName[addr] = _name;
            balanceOf[addr] = 100000;
            addrToTime[addr] = block.timestamp;
        }
        else{
            uint256 diff = block.timestamp - addrToTime[addr];
            if (diff >= 10){
                transfer(addr, 1000);
                addrToTime[addr] = block.timestamp;
            }
            if (keccak256(bytes(_name)) != keccak256(bytes(empty)))
                addrToName[addr] = _name;
                
        }
    }
    function get_p_value(address addr) view public returns(uint256) {
        return balanceOf[addr];
    }
    function new_post(address addr,string memory _type_, string memory title, string memory text) public{
        if (balanceOf[addr] <= 0 ) {
            return;
        }
        Post memory post = Post({
            type_: _type_,
            title: title,
            content: text, 
            author: addrToName[addr],
            author_addr: addr,
            pb_value: 0,
            post_time: block.timestamp,
            id: posts.length
        });

        posts.push(post);
        uint id = posts.length - 1;
        post_to_account[id] = addr;
        account_to_post[addr].push(id);
        uint256 a = bytes(text).length;
        transfer(addr,10*a);
        
        emit NewPostAdded(id, 0, addr);
    }

    function new_comment(address _from, uint post_id, bool _like, string memory text,uint256 value) public{
        if (balanceOf[_from]<value){
            return;
        }
        
        uint comment_id = comments.length;
        Comment memory comment = Comment({id: comment_id,like: _like, content: text, comment_time: block.timestamp, author: addrToName[_from], author_addr: _from});
        comments.push(comment);

        post_to_comment[post_id].push(comment);
        comment_to_account[comment_id] = _from;
        if(_like){
            transferFrom(_from, post_to_account[post_id], value);
            posts[post_id].pb_value += 1;
        }
        else{
            if(balanceOf[post_to_account[post_id]]<value){
                transferFrom(post_to_account[post_id],chairperson, balanceOf[post_to_account[post_id]]);
            }
            else{
                transferFrom(post_to_account[post_id],chairperson, value);
            }
            transferFrom(_from,chairperson, value);
            posts[post_id].pb_value -= 1;
        }
        emit NewPostAdded(post_id, comment_id, _from);
    }
    
    /////////
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[chairperson] >= _value);
        balanceOf[chairperson] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(chairperson, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        // require(_value <= allowance[_from][chairperson]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        // allowance[_from][chairperson] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function get_posts() public view returns( Post[] memory){
        return posts;
    }

    function get_comments(uint post_id) view public returns( Comment[] memory){
        return post_to_comment[post_id];
    }
}
