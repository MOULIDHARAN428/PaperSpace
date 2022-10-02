import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faDollar, faHeart, faHeartCircleCheck , faSearch} from "@fortawesome/free-solid-svg-icons";
import * as web3_utils from 'web3-utils';
import Identicon from 'identicon.js';
class Store extends Component {
    constructor(props){
        super(props)
        this.state={
            font_awsome : faHeart,
        }
    }
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
            <div className='store-bg'>
                <div className="row search-area">
                    <div className="col-12 col-sm-9"></div>
                    <div className="col-12 col-sm-3">
                        <Form className="d-flex search-bar">
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            />
                            <button type="submit" className="btn border border-dark">
                            <FontAwesomeIcon icon={faSearch}/>
                            </button>
                        </Form>
                    </div>
                </div>
                <div className="container ">
                    <div className='row'>

                        {this.props.papers.map((paper,key)=>{
                            if(paper.owner==="1" && paper.author_address!==this.props.account){
                                
                                this.props.favorites.map((Fpaper,Fkey)=>{
                                    if(Fpaper.owner===this.props.account && 
                                       paper.hashes===Fpaper.hashes){
                                        this.setState({font_awsome:faHeartCircleCheck})
                                    }
                                    return(<></>)
                                })

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
                                        <img src={`https://ipfs.io/ipfs/${paper.cover}/${paper.title}Cover`} alt="store-item"/>
                                    </div>
                                    <div className="vitamin">
                                        <h3>{paper.title}</h3>
                                    </div>
                                    <div className="reviews">
                                        <p>{paper.author}</p>
                                    </div>
                                    <div className="last_buttons">
                                        <div className="money_bag">
                                            <a className='mr-2' href='/store'
                                                onClick={ (event)=>{
                                                    event.preventDefault()
                                                    if(this.state.font_awsome!==faHeartCircleCheck){
                                                        this.setState({font_awsome:faHeartCircleCheck})
                                                        this.props.uploadFavorites(paper.id)
                                                        alert("Crypto req for adding favorites");
                                                    }
                                                    else{
                                                        alert("Already In Favorites!");
                                                    }
                                                }
                                                }
                                            >
                                                <FontAwesomeIcon icon={this.state.font_awsome}/>
                                            </a>
                                            <h3 className='mt-2'>
                                                {web3_utils.fromWei(paper.price.toString(), 'ether')}
                                            </h3>
                                            <button
                                                onClick={(event)=>{
                                                    event.preventDefault()
                                                    this.props.purchasePaper(paper.id,paper.price)
                                                }}
                                            >
                                                <FontAwesomeIcon className="font-aw" icon={faDollar}/>
                                                    Buy
                                            </button>
                                        </div>

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
            </>
        );
    }
}
export default Store;
