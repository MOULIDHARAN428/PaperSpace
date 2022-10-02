const { assert } = require('chai')

const paperGram = artifacts.require('./PaperGram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('PaperGram', ([deployer, author,buyer]) => {
    let PaperGram

  before(async () => {
    PaperGram = await paperGram.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await PaperGram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await PaperGram.name()
      assert.equal(name, 'PaperGram')
    })
  })

  describe('Upload paper', async () => {
    let result, paperCount,result1,favoritesCount,result3
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    const cover = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wc'

    before(async () => {
      result = await PaperGram.uploadPaper(web3.utils.toWei('1','Ether'),hash,cover, 'Title','Author', { from: author })
      paperCount = await PaperGram.paperCount()
    })

    //check event
    it('creates paper', async () => {
      assert.equal(paperCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), paperCount.toNumber(), 'id is correct')
      assert.equal(event.price,web3.utils.toWei('1','Ether'),'Price is correct')
      assert.equal(event.hashes, hash, 'Hash is correct')
      assert.equal(event.cover, cover, 'Cover is correct')
      assert.equal(event.title, 'Title', 'title is correct')
      assert.equal(event.author,'Author','author is correct')
      assert.equal(event.author_address, author, 'author_address is correct')
    //   assert.equal(event.owner,[],'Owner is correct')

      // FAILURE: Video must have hash
      await PaperGram.uploadPaper(web3.utils.toWei('1','Ether'),'',cover, 'Title','Author', { from: author }).should.be.rejected;
      await PaperGram.uploadPaper(web3.utils.toWei('1','Ether'),hash,'', 'Title','Author', { from: author }).should.be.rejected;
      await PaperGram.uploadPaper(web3.utils.toWei('1','Ether'),hash,cover, '','Author', { from: author }).should.be.rejected;
      await PaperGram.uploadPaper(web3.utils.toWei('1','Ether'),hash,cover, 'Title','', { from: author }).should.be.rejected;
      await PaperGram.uploadPaper(0,hash,cover, 'Title','Author', { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists paper', async () => {
      const paper = await PaperGram.papers(paperCount)
      assert.equal(paper.id.toNumber(), paperCount.toNumber(), 'id is correct')
      assert.equal(paper.price,web3.utils.toWei('1','Ether'),'Price is correct')
      assert.equal(paper.hashes, hash, 'Hash is correct')
      assert.equal(paper.cover, cover, 'Cover is correct')
      assert.equal(paper.title, 'Title', 'title is correct')
      assert.equal(paper.author,'Author','author is correct')
      assert.equal(paper.author_address, author, 'author_address is correct')
    //   assert.equal(paper.owner,[],'Owner is correct')
    })

    before(async () => {
        result1 = await PaperGram.uploadFavorites(1, { from: author })
        favoritesCount = await PaperGram.favoritesCount()
    })

    //check event
    it('creates favorites', async () => {
        assert.equal(favoritesCount, 1)
        const event = result1.logs[0].args
        assert.equal(event.id.toNumber(), favoritesCount.toNumber(), 'id is correct')
        assert.equal(event.price,web3.utils.toWei('1','Ether'),'Price is correct')
        assert.equal(event.hashes, hash, 'Hash is correct')
        assert.equal(event.cover, cover, 'Hash is correct')
        assert.equal(event.title, 'Title', 'title is correct')
        assert.equal(event.author,'Author','author is correct')
        assert.equal(event.owner, author, 'author_address is correct')
  
        // FAILURE: Video must have hash
        await PaperGram.uploadLockerPaper(1, { from: author }).should.be.rejected;
        await PaperGram.uploadLockerPaper(-1, { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists favorites', async () => {
        const favorite = await PaperGram.favorites(favoritesCount)
        assert.equal(favorite.id.toNumber(), favoritesCount.toNumber(), 'id is correct')
        assert.equal(favorite.price,web3.utils.toWei('1','Ether'),'Price is correct')
        assert.equal(favorite.hashes, hash, 'Hash is correct')
        assert.equal(favorite.cover, cover, 'Cover is correct')
        assert.equal(favorite.title, 'Title', 'title is correct')
        assert.equal(favorite.author,'Author','author is correct')
        assert.equal(favorite.owner, author, 'author_address is correct')
    })

    it('Owns Paper',async()=>{
        let oldSellerBalance
        oldSellerBalance = await web3.eth.getBalance(author)
        oldSellerBalance = new web3.utils.BN(oldSellerBalance)
        
        //SUCCESS
        result3 = await PaperGram.purchasePaper(paperCount,{from:buyer,value:web3.utils.toWei('1','Ether')})
        const event = result3.logs[0].args
        paperCount =  await PaperGram.paperCount()
        assert.equal(event.id.toNumber(), paperCount.toNumber(), 'id is correct')
        assert.equal(event.price,web3.utils.toWei('1','Ether'),'Price is correct')
        assert.equal(event.hashes, hash, 'Hash is correct')
        assert.equal(event.cover, cover, 'Cover is correct')
        assert.equal(event.title, 'Title', 'title is correct')
        assert.equal(event.author,'Author','author is correct')
        assert.equal(event.author_address, buyer, 'author_address is correct')
        assert.equal(event.owner,0,'Owner is correct')

        let newSellerBalance
        newSellerBalance = await web3.eth.getBalance(author)
        newSellerBalance = new web3.utils.BN(newSellerBalance)
        let price
        price = web3.utils.toWei('1','Ether')
        price = new web3.utils.BN(price)

        const expectedBalance = oldSellerBalance.add(price)
        assert.equal(newSellerBalance.toString(),expectedBalance.toString())
        
        
        const Newpaper = await PaperGram.papers(paperCount)
        // paperCount =  await PaperGram.paperCount()
        assert.equal(Newpaper.id.toNumber(), paperCount.toNumber(), 'id is correct')
        assert.equal(Newpaper.price,web3.utils.toWei('1','Ether'),'Price is correct')
        assert.equal(Newpaper.hashes, hash, 'Hash is correct')
        assert.equal(Newpaper.cover, cover, 'Cover is correct')
        assert.equal(Newpaper.title, 'Title', 'title is correct')
        assert.equal(Newpaper.author,'Author','author is correct')
        assert.equal(Newpaper.author_address, buyer, 'author_address is correct')
        assert.equal(Newpaper.owner,0,'Owner is correct')

        await PaperGram.purchasePaper(-1,{from:buyer,value:web3.utils.toWei('1','Ether')}).should.be.rejected;
        await PaperGram.purchasePaper(2,{from:buyer,value:web3.utils.toWei('0.5','Ether')}).should.be.rejected;

    })

    
  })

  describe('Upload Locker paper', async () => {
    let result, lockerCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    const cover = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wc'

    before(async () => {
      result = await PaperGram.uploadLockerPaper(hash,cover, 'Title', { from: author })
      lockerCount = await PaperGram.lockerCount()
    })

    //check event
    it('creates locker paper', async () => {
      assert.equal(lockerCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), lockerCount.toNumber(), 'id is correct')
      assert.equal(event.hashes, hash, 'Hash is correct')
      assert.equal(event.cover, cover, 'Cover is correct')
      assert.equal(event.title, 'Title', 'title is correct')

      // FAILURE: Video must have hash
      await PaperGram.uploadLockerPaper('',cover, 'Title', { from: author }).should.be.rejected;
      await PaperGram.uploadLockerPaper(hash,'', 'Title', { from: author }).should.be.rejected;
      await PaperGram.uploadLockerPaper(hash,cover, '', { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists locker paper', async () => {
      const locker = await PaperGram.locker(lockerCount)
      assert.equal(locker.id.toNumber(), lockerCount.toNumber(), 'id is correct')
      assert.equal(locker.hashes, hash, 'Hash is correct')
      assert.equal(locker.cover, cover, 'Cover is correct')
      assert.equal(locker.title, 'Title', 'title is correct')
    })
    
  })

  


})