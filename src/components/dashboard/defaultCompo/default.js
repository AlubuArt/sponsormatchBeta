import React ,{useEffect , Fragment, useState} from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { DollarSign, Tag, ShoppingBag, MessageCircle, MinusCircle, ThumbsUp, MessageSquare, Briefcase, MoreHorizontal, Send, Activity, Anchor, Compass, Cpu, Slack, Umbrella, Box, Book } from 'react-feather';
import { calcultionOptions, calcultionData } from '../../../data/default'
import ChartistGraph from 'react-chartist';
import EventCharts from './eventCharts';
import configDB from '../../../data/customizer/config';
import { firebase_app } from '../../../data/config';
import {New,NewSale,NewMessage,NewVisits,TotalProfit,AllCustomIncome,All,TotalInvestment,TotalReview,CustomerReview,Change,Online,MarshiKisteen,Dashboard,Ui,Xi,Message,Portfolio,NewUser,Month,Today,NickStone,Follow,WiltorNoice,NewReport,TotalFeedback,MilanoEsco,AnnaStrong,RecentNotification,Order,Download, Trash,ByKan,ByKaint,ByTailer,ByWaiter,ByComman,Calculation,TotalIncome,TotalLoss,Conversations,View,Media,Search,SellingUpdate,Shipping,Purchase,TotalSell,Feedback,ByCall,Activitys} from '../../../constant'

var Knob = require('knob')// browserify require
var primary = localStorage.getItem('primary_color') || configDB.data.color.primary_color;

const Default = (props) => {

    const [currentUser, setCurrentUser] =  useState('');

    useEffect( () => {

        firebase_app.auth().onAuthStateChanged(setCurrentUser);
        

        var profit = Knob({
            value: 35,
            left: 1,
            angleOffset: 90,
            className: "review",
            thickness: 0.2,
            width: 270,
            height: 270,
            fgColor: primary,
            readOnly: false,
            dynamicDraw: false,
            tickColorizeValues: true,
            bgColor: '#f6f7fb',
            lineCap: 'round',
            displayPrevious:true,
            
        })

        
       
    },[]);
    
    console.log(props.us.uid)

    return (
        <Fragment>
            <Breadcrumb title = "Forside" />
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 xl-100">
                            <h3>ksldklfn</h3>
                            
                        </div>
                        {/* news column start */}
                        <div className="col-xl-4 xl-100">
                            <div className="card">
                                <div className="card-header">
                                    <h5>{Activitys}</h5>
                                </div>
                                <div className="card-body activity-scroll">
                                    <div className="activity">
                                        <div className="media">
                                            <div className="gradient-round m-r-30 gradient-line-1">
                                                <ShoppingBag />
                                            </div>
                                            <div className="media-body">
                                                <h6>{NewSale} <span className="pull-right f-14">{New}</span></h6>
                                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry."}</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="gradient-round m-r-30 gradient-line-1">
                                                <MessageCircle />
                                            </div>
                                            <div className="media-body">
                                                <h6>{NewMessage} <span className="pull-right f-14">{"14m Ago"}</span></h6>
                                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry."}</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="gradient-round m-r-30 small-line">
                                                <MinusCircle />
                                            </div>
                                            <div className="media-body">
                                                <h6>{NewReport} <span className="pull-right f-14">{"14m Ago"}</span></h6>
                                                <p className="activity-xl">{"Lorem Ipsum is simply dummy text."}</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="gradient-round m-r-30 gradient-line-1">
                                                <ShoppingBag />
                                            </div>
                                            <div className="media-body">
                                                <h6>{NewSale} <span className="pull-right f-14">{"14m Ago"}</span></h6>
                                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry."}</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="gradient-round m-r-30 medium-line">
                                                <Tag />
                                            </div>
                                            <div className="media-body">
                                                <h6>{NewVisits} <span className="pull-right f-14">{"14m Ago"}</span></h6>
                                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry."}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* news column end*/}
                        
                        
                        
                        
                        
                        
                        
                        
                        
                    </div>
                </div>

        </Fragment>
    );
};

export default Default;