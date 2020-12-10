import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios'

const LearningDeatil = (props) => {

    const location = props.location
    const id = location.state ? location.state.id : 1
    const [singleData, setSingleData] = useState('');

    useEffect(() => {
        axios.get(`${process.env.PUBLIC_URL}/api/learning.json`).then(res => {
            res.data.filter((data) => {
                if (data.Id === id) {
                    setSingleData(data)
                }
                return 0;
            })
        })
        
    }, [id]);

    console.log(singleData)

    return (
        <Fragment>
            <Breadcrumb title="Kursus beskrivelse" parent="Kursus" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 xl-60">
                        <div className="blog-single">
                            <div className="blog-box blog-details">
                                <img className="img-fluid w-100" src={singleData ? require("../../assets/images/kursus_sektion/kursus_1/" +  singleData.img) : ""} alt="blog-main" />
                                <div className="blog-details">
                                    <ul className="blog-social">
                                        
    <li><i className="icofont icofont-user"></i>{singleData.writer}</li>
                                        <li className="digits"><i className="icofont icofont-thumbs-up"></i>{singleData.gennemførtAntal}<span> Har gennemført</span></li>
                                        <li className="digits"><i className="icofont icofont-ui-chat"></i>{singleData.comments} Kommentarer</li>
                                    </ul>
                                    <h4>
                                        {singleData.des1}
                                        
                                    </h4>
                                    {singleData.des2}
                                </div>
                            </div>
                            <section className="comment-box">
                                <h4>Kommentarer til kurset</h4>
                                <hr />
                                <ul>
                                    <li>
                                        <div className="media align-self-center">
                                            <img className="align-self-center" src={singleData ? require("../../assets/images/" +  singleData.student_img) : ""} alt="Generic placeholder" />
                                            <div className="media-body">
                                                <div className="row">
                                                    <div className="col-md-4 xl-100">
                                                        <h6 className="mt-0">{singleData.student_name}<span> ( {singleData.student_designation} )</span></h6>
                                                    </div>
                                                    <div className="col-md-8 xl-100">
                                                        
                                                    </div>
                                                </div>
                                                <p>{singleData.student_comment}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <ul>
                                            <li>
                                                <div className="media">
                                                    <img className="align-self-center" src={singleData ? require("../../assets/images/" +  singleData.writer_img) : ""} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <h6 className="mt-0">{singleData.writer_name}<span> ( {singleData.student_designation} )</span></h6>
                                                            </div>
                                                        </div>
                                                        <p>{singleData.writer_reply}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </section>
                        </div>
                    </div>
                   
                </div>
            </div>
        </Fragment>
    );
};

export default LearningDeatil;