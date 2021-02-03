import React, { Fragment,useState,useEffect, useReducer } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import { MyProfile,Phone,Website,Save,EditProfile,Forening,AboutMe,UpdateProfile,UsersTableTitle,FirstName,LastName,Address,EmailAddress,PostalCode, UsersTableHeader,City,Edit,Update,Delete} from '../../constant'
import { firebase_app, dbRef } from '../../data/config';


const UserEdit = () => {
    
    const [data, setData] = useState([{price: 23}]);
    const [currentUser, setCurrentUser] =  useState(localStorage.getItem('userID'));
    const [userInfo, setUserInfo] = useReducer((value, newValue) => ({...value, ...newValue}), {
        foreningName: ' ',
        fname: '',
        lname: '',
        telephonenr: '',
        adresse: '',
        city: '',
        postnr: '',
        email: '',
        clubDescription: '',
        website: '',
        logo: ''
    })

    //TODO: flyttes til service
    const getUserDataFromDatabase = () => {
        dbRef.ref('/sponsormatchUsers/' + currentUser + '/profil/forening/' ).once('value', snapshot => {
            const value = snapshot.val();
            for (let [key, val] of Object.entries(value)) {
                setUserInfo({[key]: val})
            }
        })
    }
    
    //TODO: flyttes til service
    const updateUserData = () => {
        const dataToupdate = userInfo;
        dbRef.ref('/sponsormatchUsers/' + currentUser+ '/profil/forening/').update(dataToupdate, function(error)  {
            if(error) {
                console.log("update failed")
            } else {
                alert("Profil blev opdateret")  
            }
        })
        
    }

    const handleClick = (e) => {
        updateUserData()
    }

  
     useEffect(() => {
        getUserDataFromDatabase()

    }, [])
    

    return (
        <Fragment>
            <Breadcrumb parent="Klub profil" title="Redigér profil" />
            <div className="container-fluid">
                <div className="edit-profile">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{MyProfile}</h4>
                                    <div className="card-options">
                                        <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="row mb-2">
                                            <div className="col-auto"><img className="img-70 rounded-circle" alt="" src={seven} /></div>
                                            <div className="col">
                                                <h3 className="mb-1">{userInfo.fname}</h3>
                                            </div>
                                        </div>
                                            <div className="form-group">
                                                <label className="form-label">{FirstName}</label>
                                                <input className="form-control" type="text" name="fname" value={userInfo.fname} onChange={((e) => setUserInfo({fname: e.target.value}))} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">{LastName}</label>
                                                <input className="form-control" type="text" name="lname" value={userInfo.lname} onChange={((e) => setUserInfo({lname: e.target.value}))} />
                                            </div>
                                        <div className="form-group">
                                            <label className="form-label">{EmailAddress}</label>
                                            <input className="form-control"  value={userInfo.email} onChange={((e) => setUserInfo({email: e.target.value}))}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{Phone}</label>
                                            <input className="form-control"  value={userInfo.telephonenr} onChange={((e) => setUserInfo({telephonenr: e.target.value}))}/>
                                        </div>
                                        <div className="form-footer">
                                            <button className="btn btn-primary btn-block" type="button" onClick={handleClick}>{Save}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <form className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{EditProfile}</h4>
                                    <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <label className="form-label">{Forening}</label>
                                                <input className="form-control" type="text" name="foreningName" value={userInfo.foreningName} onChange={((e) => setUserInfo({foreningName: e.target.value}))}/>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="form-label">{Website}</label>
                                            <input className="form-control" type="text" value={userInfo.website} onChange={((e) => setUserInfo({website: e.target.value}))} />
                                        </div>
                                        
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">{Address}</label>
                                                <input className="form-control" type="text" name="adresse" value={userInfo.adresse} onChange={((e) => setUserInfo({adresse: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{City}</label>
                                                <input className="form-control" type="text" name="city" value={userInfo.city} onChange={((e) => setUserInfo({city: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{PostalCode}</label>
                                                <input className="form-control" type="number" name="postnr" value={userInfo.postnr} onChange={((e) => setUserInfo({postnr: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-0">
                                                <label className="form-label">{AboutMe}</label>
                                                <textarea className="form-control" rows="5" name="clubDescription" value={userInfo.clubDescription} onChange={((e) => setUserInfo({clubDescription: e.target.value}))}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button className="btn btn-primary" type="button" onClick={handleClick}>{UpdateProfile}</button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserEdit;