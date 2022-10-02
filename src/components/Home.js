import React, {  } from 'react';
// import {Carousel} from './Carousel';
function Home () {
    
    const slideWidth = 30;
    const _items = [
        {
            player: {
                title: 'Cloud Technology',
                desc: 'Simply put, cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet (“the cloud”) to offer faster innovation, flexible resources, and economies of scale.',
                image: '/assets/images/cloud-research.jpg',
            },
        },
        {
            player: {
                title: "Machine Learning",
                desc: "Machine learning is a modern innovation that has enhanced many industrial and professional processes as well as our daily lives. It's a subset of artificial intelligence (AI), which focuses on using statistical techniques to build intelligent computer systems to learn from available databases.",
                image: '/assets/images/ml-research.jpg',
            },
        },
        {
            player: {
                title: 'Virtual Reality',
                desc: 'Virtual reality is a simulated 3D environment that enables users to explore and interact with a virtual surrounding in a way that approximates reality, as it is perceived through the users\' senses.',
                image: '/assets/images/vr-research.jpg',
            },
        },
        {
            player: {
                title: 'Blockchain',
                desc: 'It is a decentralized, distributed, and often public, digital ledger consisting of records called blocks that are used to record transactions across many computers so that any involved block cannot be altered retroactively, without the alteration of all subsequent blocks.',
                image: '/assets/images/blockchain-research.jpg',
            },
        },
        {
            player: {
                title: 'Artificial Intelligence',
                desc: 'It is the simulation of human intelligence processes by machines, especially computer systems. Specific applications of AI include expert systems, natural language processing, speech recognition and machine vision.',
                image: '/assets/images/ai-research.jpg',
            },
        },
    ];
    const length = _items.length;
    _items.push(..._items);
    const sleep = (ms = 0) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const createItem = (position, idx) => {
        const item = {
            styles: {
                transform: `translateX(${position * slideWidth}rem)`,
            },
            player: _items[idx].player,
        };
        switch (position) {
            case length - 1:
            case length + 1:
                item.styles = {...item.styles, filter: 'grayscale(1)'};
                break;
            case length:
                break;
            default:
                item.styles = {...item.styles, opacity: 0};
                break;
        }
        return item;
    };
    const CarouselSlideItem = ({pos, idx, activeIdx}) => {
        const item = createItem(pos, idx, activeIdx);
        return (
            <li className="carousel__slide-item" style={item.styles}>
                <div className="carousel__slide-item-img-link">
                    <img src={item.player.image} alt={item.player.title} />
                </div>
                <div className="carousel-slide-item__body">
                    <h4>{item.player.title}</h4>
                    <p>{item.player.desc}</p>
                </div>
            </li>
        );
    };
    const keys = Array.from(Array(_items.length).keys());
    function Carousel() {
        const [items, setItems] = React.useState(keys);
        const [isTicking, setIsTicking] = React.useState(false);
        const [activeIdx, setActiveIdx] = React.useState(0);
        const bigLength = items.length;
        const prevClick = (jump = 1) => {
            if (!isTicking) {
                setIsTicking(true);
                setItems((prev) => {
                    return prev.map((_, i) => prev[(i + jump) % bigLength]);
                });
            }
        };
        const nextClick = (jump = 1) => {
            if (!isTicking) {
                setIsTicking(true);
                setItems((prev) => {
                    return prev.map(
                        (_, i) => prev[(i - jump + bigLength) % bigLength],
                    );
                });
            }
        };
        const handleDotClick = (idx) => {
            if (idx < activeIdx) prevClick(activeIdx - idx);
            if (idx > activeIdx) nextClick(idx - activeIdx);
        };
        React.useEffect(() => {
            if (isTicking) sleep(300).then(() => setIsTicking(false));
        }, [isTicking]);
        React.useEffect(() => {
            setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
        }, [items]);
        return (
            <div className="carousel__wrap">
                <div className="carousel__inner">
                    <button className="carousel__btn carousel__btn--prev" onClick={() => prevClick()}>
                        <i className="carousel__btn-arrow carousel__btn-arrow--left" />
                    </button>
                    <div className="carousel__container">
                        <ul className="carousel__slide-list">
                            {items.map((pos, i) => (
                                <CarouselSlideItem
                                    key={i}
                                    idx={i}
                                    pos={pos}
                                    activeIdx={activeIdx}
                                />
                            ))}
                        </ul>
                    </div>
                    <button className="carousel__btn carousel__btn--next" onClick={() => nextClick()}>
                        <i className="carousel__btn-arrow carousel__btn-arrow--right" />
                    </button>
                    <div className="carousel__dots">
                        {items.slice(0, length).map((pos, i) => (
                            <button
                                key={i}
                                onClick={() => handleDotClick(i)}
                                className={i === activeIdx ? 'dot active' : 'dot'}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    
        return (
            <div>
                
                
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-sm-6 img-reserch d-none d-lg-block'>
                            <img alt="" src="/assets/images/paper.png" width="450" height="400" className="d-inline-block align-top" />
                        </div>
                        <div className='col-12 col-sm-6 home-store-content'>
                            <h3>"The important thing in science is not so much to obtain new facts as to 
                                discover new ways of thinking about them"</h3>
                            <p>Research is happening at every moment and everywhere across the globe. 
                                There is a high demand for research papers, but the cost of the papers 
                                is also prohibitively high. PaperGram works by storing the research papers 
                                securely and providing the users with a low price. Click on the "explore" button
                                to buy and download recent research papers.</p>
                                <div className='splitter'></div>
                            <a href="/store"><button className='glow-on-hover' type='button'>Explore</button></a>
                        </div>
                    </div>
                </div>
                <Carousel/>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-sm-5 img-paper d-none d-lg-block'>
                            <img alt="" src="/assets/images/research.png" width="390" height="300" className="d-inline-block align-top" />
                        </div>
                        <div className='col-12 col-sm-7 home-store-content-paper'>
                            <h3>"Research is seeing what everybody else has seen and thinking 
                            what nobody else has thought"</h3>
                            <p>In terms of research, storing our research papers and our data is critical these 
                            days. As technology evolves, data storing states also change. And now is the time, 
                            to safeguard our project with decentralised web storage. Click on the "store" 
                            button to store your files</p>
                            <div className='splitter'></div>
                            <a href="/profile"><button className='glow-on-hover' type='button'>Store File</button></a>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    
}
export default Home;
