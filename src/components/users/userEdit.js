import React, { Fragment,useState,useEffect, useReducer } from 'react';
import { Sponsoransvarlig, Phone, Website, EditProfile,Forening, UpdateProfile,FirstName,LastName,Address,EmailAddress,PostalCode,City, OmForeningen} from '../../constant'
import { uploadUserProfilePicture, getUserFromDatabase, updateUserDataInDatabase } from '../../services/editUser.service'


const UserEdit = () => {
    
    const [currentUser] =  useState(localStorage.getItem('userID'));
    const [profilePicture, setProfilePicture] = useState();
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
        logo: '',
        userProfilePicture: ''
    })

    const getUserData = async () => {
        try {
            const userData = await getUserFromDatabase(currentUser);
            for (let [key, val] of Object.entries(userData)) {
                setUserInfo({[key]: val})
            }   
        }
        catch {}
    }
    
    const updateUserData = () => {
        try {
            const dataToupdate = userInfo;
            updateUserDataInDatabase(currentUser, dataToupdate)  
        }
        catch {}
    }

    const handleClick = (e) => {
        updateUserData()
    }

    const getSelectedFileToUpload = () => {
        const selectedFile = document.getElementById('input').files[0];
        setProfilePicture(selectedFile)
    }

    const changeProfilePicture = (e) => {
        e.preventDefault();
        uploadUserProfilePicture(currentUser, profilePicture)
        const timer = setTimeout(() => {
          getUserData()  
        }, 1000);
        return  () => clearTimeout(timer);
    }


     useEffect(() => {
        //getUserDataFromDatabase()
        getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <Fragment>
            
                <div className="edit-profile">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{Sponsoransvarlig}</h4>
                                    <div className="card-options">
                                        <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <form>
                                <div className="card-body">
                                    <div className="row mb-2">´
                                            <div className="col-auto user-image ">
                                                <div className="profile-picture ">
                                                    <img className="pro" alt="" src={userInfo.userProfilePicture} data-intro="This is Profile image" />
                                                </div>
                                                <div className="icon-wrapper">
                                                    <i className="icofont icofont-pencil-alt-5" data-intro="Change Profile image here" >
                                                    <input id="input" className="pencil" type="file" onChange={getSelectedFileToUpload}/><button onClick={changeProfilePicture}>Upload billede</button>
                                                    </i>
                                                </div>
                                            </div>   
                                    </div>
                                        
                                            <div className="form-group">
                                                <label className="form-label">{FirstName}</label>
                                                <input className="form-control" type="text" name="fname" placeholder={userInfo.fname} onChange={((e) => setUserInfo({fname: e.target.value}))} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">{LastName}</label>
                                                <input className="form-control" type="text" name="lname" placeholder={userInfo.lname} onChange={((e) => setUserInfo({lname: e.target.value}))} />
                                            </div>
                                        <div className="form-group">
                                            <label className="form-label">{EmailAddress}</label>
                                            <input className="form-control"  placeholder={userInfo.email} onChange={((e) => setUserInfo({email: e.target.value}))}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{Phone}</label>
                                            <input className="form-control"  placeholder={userInfo.telephonenr} onChange={((e) => setUserInfo({telephonenr: e.target.value}))}/>
                                        </div>
                                        <div className="form-footer">
                                            <button className="btn btn-primary btn-block" type="button" onClick={handleClick}>Opdatér kontakt oplysninger</button>
                                        </div>
                                   
                                    </div> 
                                </form>
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
                                                <input className="form-control" type="text" name="foreningName" placeholder={userInfo.foreningName} onChange={((e) => setUserInfo({foreningName: e.target.value}))}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{Website}</label>
                                            <input className="form-control" type="text" placeholder={userInfo.website} onChange={((e) => setUserInfo({website: e.target.value}))} />
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">{Address}</label>
                                                <input className="form-control" type="text" name="adresse" placeholder={userInfo.adresse} onChange={((e) => setUserInfo({adresse: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{City}</label>
                                                <input className="form-control" type="text" name="city" placeholder={userInfo.city} onChange={((e) => setUserInfo({city: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{PostalCode}</label>
                                                <input className="form-control" type="number" name="postnr" placeholder={userInfo.postnr} onChange={((e) => setUserInfo({postnr: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-0">
                                                <label className="form-label">{OmForeningen}</label>
                                                <textarea className="form-control" rows="5" name="clubDescription" placeholder={userInfo.clubDescription} onChange={((e) => setUserInfo({clubDescription: e.target.value}))}></textarea>
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
        </Fragment>
    );
};

export default UserEdit;