import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as web3_utils from 'web3-utils';
import { faBook, faTag, faImage, faPerson, faDollar } from "@fortawesome/free-solid-svg-icons";
class Profile extends Component {

    render(){
        return (
            <>
                <div className="account">
                    <small className="text-secondary account-name">
                        {this.props.account ? 
                        <small>{this.props.account}</small>:
                        <small>Untitled</small>}
                    </small>
                    { this.props.account
                    ? <img
                        className='account-image ml-50'
                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                        alt="PaperGramaccount address"
                        
                    />
                    : <span></span>
                    }
                </div>

                <div class="section form-input">
                    
                    <div className='paper-owned mt-5'>
                        <h2>Paper Owned</h2>
                        <p class="subtitle fancy">
                            <span>Knowledge is of no value unless you put it into practice</span>
                        </p>
                    </div>

                    <div className='store-bg'>
                        <div className="container ">
                            <div className='row'>
                                {this.props.papers.map((paper,key)=>{
                                    if(paper.author_address===this.props.account){
                                        return(
                                        <div className='col-12 col-sm-4 items-card' key={key}>
                                        <div className="card">
                                            <div className="items-bg">
                                            <div className="top_part">
                                                <div className="circle">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className="image">
                                                <a href={`https://ipfs.io/ipfs/${paper.hashes}/${paper.title}`}>
                                                    <img src={`https://ipfs.io/ipfs/${paper.cover}/${paper.title}Cover`} alt="store-item"/>
                                                </a>
                                            </div>
                                            <div className="vitamin">
                                                <h3>{paper.title}</h3>
                                            </div>
                                            <div className="reviews">
                                                <p>{web3_utils.fromWei(paper.price.toString(), 'ether')}</p>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        )
                                    }
                                    else{
                                        return(<></>)
                                    }
                                })}
                                

                            
                            </div>
                        </div>

                    </div>


                    <div class="container">
                    
                        <div class="row full-height justify-content-center">
                            <div class="col-12 text-center align-self-center py-5">
                                <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                    <h5 class="mb-0 pb-3"><span>Upload </span><span>Locker</span></h5>
                                    <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"></input>
                                    <label for="reg-log"></label>
                                    <div class="card-3d-wrap mx-auto">
                                        
                                        <div class="card-3d-wrapper">

                                        <div class="card-front">
                                        <div class="center-wrap">

                                        <form class="section text-center"
                                            onSubmit={(event) => {
                                                event.preventDefault()
                                                var title = this.paperTitle.value
                                                const author = this.paperAuthor.value
                                                const price = this.paperPrice.value
                                                const titleCover = title+"Cover"
                                                // console.log(title,author,price)
                                                this.props.uploadPaper(price,title,author,titleCover)
                                                }}
                                        >

                                            <h4 class="mb-4 pb-3">Upload Paper</h4>

                                            <div class="form-group">
                                                <input type="text"
                                                    ref={(input) => { this.paperTitle = input }}
                                                    name="Title" 
                                                    class="form-style" 
                                                    placeholder="Title" 
                                                    id="title" 
                                                    autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faTag}/></i>
                                            </div>

                                            <div class="form-group mt-2">
                                                <input type="text" 
                                                ref={(input) => { this.paperAuthor = input }}
                                                class="form-style" 
                                                placeholder="Author" 
                                                id="author" 
                                                autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faPerson}/></i>
                                            </div>

                                            <div class="form-group mt-2">
                                                <input type="number" 
                                                ref={(input) => { this.paperPrice = input }}
                                                class="form-style" 
                                                placeholder="Price" 
                                                id="price" 
                                                autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faDollar}/></i>
                                            </div>

                                            <div class="form-group mt-2">
                                                
                                                <input type="file" 
                                                onChange={this.props.capturePaper} 
                                                class="form-style"
                                                id="paper" 
                                                autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faBook}/></i>
                                            </div>

                                            <div class="form-group mt-2">
                                                <input type="file" 
                                                onChange={this.props.captureCover} 
                                                class="form-style" 
                                                id="cover" 
                                                autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faImage}/></i>
                                            </div>
                                            
                                            <button type="submit" className="btn border border-dark mt-3">Upload</button>
                                            
                                        </form>

                                        </div>
                                        </div>

                                        <div class="card-back">
                                        <div class="center-wrap">
                                        <form class="section text-center"
                                            onSubmit={(event) => {
                                                event.preventDefault()
                                                var title = this.paperCoverTitle.value
                                                const titleCover = title+"Cover"
                                                this.props.uploadLockerPaper(title,titleCover)
                                                }}
                                        >

                                            <h4 class="mb-4 pb-3">Upload Locker</h4>

                                            <div class="form-group">
                                                <input type="text"
                                                    ref={(input) => { this.paperCoverTitle = input }} 
                                                    class="form-style" 
                                                    placeholder="Title" 
                                                    id="title" 
                                                    autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faTag}/></i>
                                            </div>

                                            <div class="form-group mt-2">
                                                
                                                <input type="file" 
                                                onChange={this.props.captureLocker} 
                                                class="form-style"
                                                id="paper" 
                                                autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faBook}/></i>
                                            </div>

                                            <div class="form-group mt-2">
                                                <input type="file" 
                                                onChange={this.props.captureCoverLocker} 
                                                class="form-style" 
                                                id="cover" 
                                                autocomplete="off"/>
                                                <i class="input-icon"><FontAwesomeIcon icon={faImage}/></i>
                                            </div>
                                            
                                            <button type="submit" className="btn border border-dark mt-3">Lock Paper</button>
                                            
                                        </form>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='paper-owned'>
                        <h2>Locker</h2>
                        <p class="subtitle fancy"><span>Decentralized storage for your papers</span></p>
                    </div>
                    
                    <div className='store-bg'>
                        <div className="container ">
                            <div className='row'>
                                {this.props.lockers.map((locker,key)=>{
                                    if(locker.author===this.props.account){
                                        return(
                                        <div className='col-12 col-sm-4 items-card' key={key}>
                                        <div className="card locker-card">
                                            <div className="items-bg">
                                            <div className="top_part">
                                                <div className="circle">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className="image">
                                                <a href={`https://ipfs.io/ipfs/${locker.hashes}/${locker.title}`}>
                                                    <img src={`https://ipfs.io/ipfs/${locker.cover}/${locker.title}Cover`} alt="store-item"/>
                                                </a>
                                            </div>
                                            <div className="vitamin">
                                                
                                                <h3>{locker.title}</h3>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        )
                                    }
                                    else{
                                        return(<></>)
                                    }
                                })}
                                

                            
                            </div>
                        </div>

                    </div>

                </div>
                
                

            </>
        );
    }
}
export default Profile;
