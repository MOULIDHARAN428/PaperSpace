import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faDollar} from "@fortawesome/free-solid-svg-icons";
import * as web3_utils from 'web3-utils';
import Identicon from 'identicon.js';
class Favorites extends Component {
    render(){
        let count=0;
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
                <div className="container ">
                    <div className='row'>

                        {this.props.favorites.map((paper,key)=>{
                            if(paper.owner===this.props.account){
                                count=0;
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
                                            <h3 className='mt-2'>
                                                {web3_utils.fromWei(paper.price.toString(), 'ether')}
                                            </h3>
                                            <button
                                                buy_id={paper.id}
                                                buy_price={paper.price} 
                                                onClick={(event)=>{
                                                    this.props.purchasePaper
                                                    (event.target.buy_id,event.target.buy_price)
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
                            else if(count===0){
                                count=1
                                return(
                                <div style={{color : "white"}} className="mt-5 mb-5"> No favorites yet...
                                </div>)
                            }
                        })}
                        

                    
                    </div>
                </div>

            </div>
            </>
        );
    }
}
export default Favorites;
