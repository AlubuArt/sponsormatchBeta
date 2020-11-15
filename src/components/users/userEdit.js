import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import { MyProfile,Bio,MarkJecno,Designer,Password,Website,Save,EditProfile,Forening,Username,UsersCountryMenu,AboutMe,UpdateProfile,UsersTableTitle,FirstName,LastName,Address,EmailAddress,PostalCode,Country, UsersTableHeader,City,Edit,Update,Delete} from '../../constant'
import { firebase_app, dbRef } from '../../data/config';


const UserEdit = () => {
    
    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] =  useState('');
    const [state, setState] = useState({
        foreningName: ' ',
        userName: '',
        fname: '',
        lname: '',
        telephonenr: '',
        adresse: '',
        city: '',
        postnr: '',
        email: '',
        clubDescription: ''

     })
    firebase_app.auth().onAuthStateChanged(setCurrentUser);
    
    useEffect(() => {
        const getUserData = () => {
        dbRef.ref('/sponsormatchUsers/' +  currentUser.uid + '/profil/forening/foreningName' ).once('value',  snapshot =>  {
            const val =  snapshot.val();
            setState({foreningName: val})    
        })
        
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/adresse' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({adresse: val})
        })
        
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/city' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({city: val})
        })
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/postnr' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({postnr: val})
        })
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/fname' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({fname: val})
        }) 
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/lname' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({lname: val})
        })
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/email' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({email: val})
        }) 
         dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/userName' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({userName: val})
        }) 
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/telefonnr' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({telephonenr: val})
        }) 
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/clubDescription' ).once('value', snapshot => {
            const val = snapshot.val();
            setState({clubDescription: val})
        })
        }
        getUserData()
        
    }, [currentUser])

    const handleInput = (event) => {
        setState (
            {...state, [event.target.name]: event.target.value}
        )
    }

    const updateUserData = () => {
        const dataToupdate = state;
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/').update(dataToupdate, function(error)  {
            if(error) {
                console.log("update failed")
            } else {
                alert("Profil blev opdateret")  
            }
        })
        
    }

    const handleClick = (e) => {
        e.preventDefault();
        updateUserData()
    }

  
    
    

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
                                                <h3 className="mb-1">{MarkJecno}</h3>
                                                <p className="mb-4">{Designer}</p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <h6 className="form-label">{Bio}</h6>
                                            <textarea className="form-control" rows="5" defaultValue="On the other hand, we denounce with righteous indignation" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{EmailAddress}</label>
                                            <input className="form-control" placeholder="your-email@domain.com" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{Password}</label>
                                            <input className="form-control" type="password" defaultValue="password" readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{Website}</label>
                                            <input className="form-control" placeholder="http://Uplor .com" />
                                        </div>
                                        <div className="form-footer">
                                            <button className="btn btn-primary btn-block" onClick={handleClick}>{Save}</button>
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
                                                <input className="form-control" type="text" name="foreningName" value={state.foreningName} onChange={handleInput}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{Username}</label>
                                                <input className="form-control" type="text" name="userName" value={state.userName} onChange={handleInput}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{EmailAddress}</label>
                                                <input className="form-control" type="email" name="email" value={state.email} onChange={handleInput}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{FirstName}</label>
                                                <input className="form-control" type="text" name="fname" value={state.fname} onChange={handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LastName}</label>
                                                <input className="form-control" type="text" name="lname" value={state.lname} onChange={handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">{Address}</label>
                                                <input className="form-control" type="text" name="adresse" value={state.adresse} onChange={handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{City}</label>
                                                <input className="form-control" type="text" name="city" value={state.city} onChange={handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{PostalCode}</label>
                                                <input className="form-control" type="number" name="postnr" value={state.postnr} onChange={handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-0">
                                                <label className="form-label">{AboutMe}</label>
                                                <textarea className="form-control" rows="5" name="clubDescription" value={state.clubDescription} onChange={handleInput}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button className="btn btn-primary" type="button" onClick={handleClick}>{UpdateProfile}</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{UsersTableTitle}</h4>
                                    <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table card-table table-vcenter text-nowrap">
                                        <thead>
                                            <tr>
                                                {UsersTableHeader.map((items,i) => 
                                                    <th key={i}>{items}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((items,i) => 
                                                <tr key={i}>
                                                <td><a className="text-inherit" href="#javascript">{items.projectName} </a></td>
                                                <td>{items.date}</td>
                                                <td><span className="status-icon bg-success"></span>{items.status}</td>
                                                <td>{items.price}</td>
                                                <td className="text-right">
                                                    <button className="btn btn-primary btn-sm" href="javascript">
                                                        <i className="fa fa-pencil"></i> {Edit}
                                                    </button>
                                                    <button className="btn btn-transparent btn-sm" href="javascript">
                                                        <i className="fa fa-link"></i> {Update}
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" href="javascript">
                                                        <i className="fa fa-trash"></i> {Delete}
                                                    </button>
                                                </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserEdit;