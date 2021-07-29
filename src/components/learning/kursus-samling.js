import React, { Fragment,useEffect,useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios'

const LearningList = (props) => {
    
    const [kursusData, setLearningData] = useState([])

    useEffect(() => {
        axios.get(`${process.env.PUBLIC_URL}/api/learning.json`).then(res => setLearningData(res.data))
    },[])

    const clickApply = (course) => {
        const id = course.Id
        props.history.push(`${process.env.PUBLIC_URL}/kursus/kursus-detaljer`, { id });
    }

    return (
        <Fragment>
            <Breadcrumb title="Kursus samling" parent="Kursus" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-9 xl-60">
                        <div className="row">
                            {kursusData.map((data, i) => {
                                return (
                                    <div className="col-xl-4 xl-50 col-sm-6" key={i}>
                                        <div className="card">
                                            <div className="blog-box blog-grid text-center product-box">
                                                <div className="product-img">
                                                    <img className="img-fluid top-radius-blog" src={require('../../assets/images/kursus_sektion/kursus_1/' + data.img)} alt="" />
                                                    <div className="product-hover">
                                                        <ul>
                                                            <li><i className="icon-link" onClick={() => clickApply(data)}></i></li>
                                                            <li><i className="icon-import"></i></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="blog-details-main">
                                                    <ul className="blog-social">
                                                        <li className="digits">{data.date}</li>
                                                        <li className="digits">by: {data.writer}</li>
                                                        <li className="digits">Gennemført af: {data.gennemførtAntal} </li>
                                                    </ul>
                                                    <hr />
                                                    <h6 className="blog-bottom-details">{data.short_description}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
};

export default LearningList;