import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import Profile from './Profile';
import Store from './Store';
import Footer from './Footer';

import PaperGram from '../abis/PaperGram.json';
import Web3 from 'web3';
import { Web3Storage,File } from 'web3.storage'

require('dotenv').config();
const web3token = process.env.REACT_APP_WEB3TOKEN;
const client = new Web3Storage({ token: web3token });

class Main extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = PaperGram.networks[networkId]
        if(networkData) {
          const papergram = new web3.eth.Contract(PaperGram.abi, networkData.address)
          this.setState({ papergram })
          const paperCount = await papergram.methods.paperCount().call()
          const lockerCount = await papergram.methods.lockerCount().call()
          const favoritesCount = await papergram.methods.favoritesCount().call()
          this.setState({favCount : favoritesCount})
          this.setState({ paperCount,lockerCount,favoritesCount })
          // Load videos, sort by newest
          for (var i=paperCount; i>=1; i--) {
            const paper = await papergram.methods.papers(i).call()
            this.setState({
                papers: [...this.state.papers, paper]
            })
          }
          for (i=lockerCount; i>=1; i--) {
            const locker = await papergram.methods.locker(i).call()
            this.setState({
                lockers: [...this.state.lockers, locker]
            })
          }
          for (i=favoritesCount; i>=1; i--) {
            const favorite = await papergram.methods.favorites(i).call()
            this.setState({
                favorites: [...this.state.favorites, favorite]
            })
          }
          console.log(this.state.papers);
          console.log(this.state.lockers);
          console.log(this.state.lockers);
          this.setState({ loading: false})
        } else {
          window.alert('Papergram contract not deployed to detected network.')
        }
    }


    capturePaper = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
    }

    captureLocker = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
          this.setState({ bufferLocker: Buffer(reader.result) })
          console.log('buffer', this.state.bufferLocker)
        }
    }

    captureCover = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
          this.setState({ cover: Buffer(reader.result) })
          console.log('buffer', this.state.cover)
        }
    }

    captureCoverLocker = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
          this.setState({ coverLocker: Buffer(reader.result) })
          console.log('buffer', this.state.coverLocker)
        }
    }
    
    async uploadPaper (price,title,author,titleCover) {
      const cid = await client.put([new File([this.state.buffer],title)]);
      const cid_cover = await client.put([new File([this.state.cover],titleCover)]);
      console.log("Uploaded Paper");
      // console.log(cid_cover);
      this.state.papergram.methods.uploadPaper(price,cid,cid_cover, title,author).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
      });
    }

    async uploadLockerPaper (title,titleCover) {
        const cid = await client.put([new File([this.state.bufferLocker],title)]);
        const cid_cover = await client.put([new File([this.state.coverLocker],titleCover)]);
        console.log("Uploaded in Locker");
        // console.log(cid_cover);
        
        this.state.papergram.methods.uploadLockerPaper(cid,cid_cover, title).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          console.log(receipt);
          this.setState({ loading: false });
        });
    }

    async uploadFavorites (id) {
        this.state.papergram.methods.uploadFavorites(id).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          console.log(receipt);
          this.setState({ loading: false });
      });
    }

    async purchasePaper  (id,price)  {
        this.state.papergram.methods.purchasePaper(id).send({from: this.state.account, value: price})
        .once('receipt', (receipt) => {
            console.log(receipt);
        });
    }
    

    constructor(props) {
        super(props)
        this.state = {
          buffer: null,
          bufferLocker : null,
          cover: null,
          coverLocker: null,
          account: '',
          papergram: null,
          papers: [],
          lockers: [],
          favorites : [],
          favCount : 0,
          loading: true,
          currentHash: null,
          currentTitle: null
        }
        this.capturePaper = this.capturePaper.bind(this)
        this.captureLocker = this.captureLocker.bind(this)
        this.captureCover = this.captureCover.bind(this)
        this.captureCoverLocker = this.captureCoverLocker.bind(this)
        this.uploadPaper = this.uploadPaper.bind(this)
        this.uploadLockerPaper = this.uploadLockerPaper.bind(this)
        this.uploadFavorites = this.uploadFavorites.bind(this)
        this.purchasePaper=this.purchasePaper.bind(this)
        
    }

    render(){
        return (
            <div>
                <Header/>
                <div className='body-content'>
                    <Switch>
                        <Route path="/home" component={Home}></Route>

                        <Route path="/profile/favorites">
                          <Favorites
                          account={this.state.account}
                          favorites={this.state.favorites}
                          purchasePaper={this.purchasePaper}
                          count={this.favCount}
                          />
                        </Route>

                        <Route exact path="/profile">
                          <Profile
                            capturePaper={this.capturePaper}
                            captureLocker={this.captureLocker}
                            captureCover={this.captureCover}
                            captureCoverLocker={this.captureCoverLocker}
                            uploadPaper={this.uploadPaper}
                            uploadLockerPaper={this.uploadLockerPaper}
                            account={this.state.account}
                            papers={this.state.papers}
                            lockers={this.state.lockers}
                            setUrl={this.setUrl}
                          />
                        </Route>

                        <Route path="/store">
                          <Store 
                          account={this.state.account}
                          papers={this.state.papers}
                          favorites={this.state.lockers}
                          purchasePaper={this.purchasePaper}
                          uploadFavorites={this.uploadFavorites}
                        />
                        </Route>

                        <Redirect to="/home" />

                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Main;
