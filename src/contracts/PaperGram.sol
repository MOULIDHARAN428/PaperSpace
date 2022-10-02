// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract PaperGram{
    uint public paperCount = 0;
    uint public lockerCount =0;
    uint public favoritesCount =0;
    string public name = "PaperGram";
    mapping(uint => Paper) public papers;
    mapping(uint => LockerPaper) public locker;
    mapping(uint => Favorites) public favorites;

    constructor(){}

    struct Paper {
        uint id;
        uint price;
        uint owner;
        string hashes;
        string cover;
        string title;
        string author;
        address payable author_address;
    }

    struct LockerPaper {
        uint id;
        string hashes;
        string cover;
        string title;
        address author;
    }

    struct Favorites {
        uint id;
        uint price;
        string hashes;
        string cover;
        string title;
        string author;
        address owner;
    }

    event paperUploaded(
        uint id,
        uint price,
        uint owner,
        string hashes,
        string cover,
        string title,
        string author,
        address payable author_address
    );

    event lockerUploaded(
        uint id,
        string hashes,
        string cover,
        string title,
        address author
    );

    event favoritesUploaded(
        uint id,
        uint price,
        string hashes,
        string cover,
        string title,
        string author,
        address owner
    );

    function uploadPaper(uint _price,string memory _hash,string memory _cover, string memory _title, string memory _author) public {
        require(bytes(_hash).length > 0);
        require(bytes(_title).length > 0);
        require(bytes(_author).length > 0);
        require(bytes(_cover).length > 0);
        require(msg.sender!=address(0));
        require(_price > 0);
        paperCount++;
        papers[paperCount] = Paper(paperCount,_price,1, _hash, _cover, _title,_author, payable(msg.sender));
        emit paperUploaded(paperCount,_price,1, _hash, _cover ,_title,_author, papers[paperCount].author_address);
    }

    function uploadLockerPaper(string memory _hash,string memory _cover, string memory _title) public {
        require(bytes(_hash).length > 0);
        require(bytes(_title).length > 0);
        require(bytes(_cover).length > 0);
        require(msg.sender!=address(0));
        lockerCount++;
        locker[lockerCount] = LockerPaper(lockerCount, _hash,_cover, _title, msg.sender);
        emit lockerUploaded(lockerCount, _hash,_cover, _title, msg.sender);
    }

    function uploadFavorites(uint _id) public{
        Paper memory _paper = papers[_id];
        require(_paper.id>0 && _paper.id<=paperCount);
        favoritesCount++;
        favorites[favoritesCount] = Favorites(favoritesCount,_paper.price,_paper.hashes,_paper.cover,_paper.title,_paper.author,msg.sender);
        emit favoritesUploaded(favoritesCount,_paper.price,_paper.hashes,_paper.cover,_paper.title,_paper.author,msg.sender);
    }

    function purchasePaper(uint _id) public payable{
        Paper memory _paper = papers[_id];
        address payable _seller = _paper.author_address;
        require(_paper.id>0 && _paper.id<=paperCount);
        require(msg.value>=_paper.price);
        require(_seller!=msg.sender);
        require(_paper.owner==1);
        _paper.owner=0;
        _paper.author_address=payable(msg.sender);
        paperCount++;
        _paper.id=paperCount;
        papers[paperCount]=_paper;
        payable(address(_seller)).transfer(msg.value);
        emit paperUploaded(paperCount, _paper.price,_paper.owner,_paper.hashes,_paper.cover, _paper.title,_paper.author, payable(_paper.author_address));
    }

}