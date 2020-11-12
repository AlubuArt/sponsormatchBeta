import React, { Fragment, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';

import {Email,ContactUs,MarkJecno,Location} from '../../constant'
const UserProfile = () => {
    const [url, setUrl] = useState();
    const [email, setEmail] = useState('david@øb.dk');

    const readUrl = (event) => {
        if (event.target.files.length === 0)
            return;
        //Image upload validation
        var mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            setUrl(reader.result)
        }
    }


    return (
        <Fragment>
            <Breadcrumb parent="Users" title="Klub profil" />
            <div className="container-fluid">
                <div className="user-profile">
                    <div className="row">
                        {/* <!-- user profile first-style start--> */}
                        <div className="col-sm-12">
                            <div className="card hovercard text-center">
                                <div className="cardheader"></div>
                                <div className="user-image ">
                                    <div className="avatar ">
                                        <img className="pro" alt="" src={url ? url : seven} data-intro="This is Profile image" />
                                    </div>
                                    <div className="icon-wrapper">
                                        <i className="icofont icofont-pencil-alt-5" data-intro="Change Profile image here" >
                                            <input className="pencil" type="file" onChange={(e) => readUrl(e)} />
                                        </i>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="row detail" data-intro="This is the your details">
                                        <div className="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left">
                                                        <h6><i className="fa fa-envelope mr-2"></i>{Email}</h6><span>{email}</span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                                            <div className="user-designation">
                                                <div className="title"><a target="_blank" href="javascript">{MarkJecno}</a></div>
                                                <div className="desc mt-2">Sponsoransvarlig</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left ttl-xs-mt">
                                                        <h6><i className="fa fa-phone"></i>{ContactUs}</h6><span>{"India +91 123-456-7890"}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left ttl-sm-mb-0">
                                                        <h6><i className="fa fa-location-arrow"></i>{Location}</h6><span>{"B69 Near Schoool Demo Home"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserProfile;