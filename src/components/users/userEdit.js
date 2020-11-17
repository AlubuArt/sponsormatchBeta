import React, { Fragment,useState,useEffect, useReducer } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import { MyProfile,Bio,MarkJecno,Designer,Password,Website,Save,EditProfile,Forening,Username,UsersCountryMenu,AboutMe,UpdateProfile,UsersTableTitle,FirstName,LastName,Address,EmailAddress,PostalCode,Country, UsersTableHeader,City,Edit,Update,Delete} from '../../constant'
import { firebase_app, dbRef } from '../../data/config';


const UserEdit = () => {
    
    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] =  useState('');
    const [value, setValue] = useReducer((value, newValue) => ({...value, ...newValue}), {
        foreningName: ' ',
        userName: '',
        fname: '',
        lname: '',
        telephonenr: '',
        adresse: '',
        city: '',
        postnr: '',
        email: '',
        clubDescription: '',
        password: ''

    })
    
    firebase_app.auth().onAuthStateChanged(setCurrentUser);

    useEffect(() => {
    
       dbRef.ref('/sponsormatchUsers/' +  currentUser.uid + '/profil/forening/foreningName' ).once('value',  async snapshot =>  {
            const val =  snapshot.val();
            setValue({foreningName: val})    
        })
        
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/adresse' ).once('value',async snapshot => {
            const val = snapshot.val();
            setValue({adresse: val})
        })
        
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/city' ).once('value', async  snapshot => {
            const val = snapshot.val();
            setValue({city: val})
        })
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/postnr' ).once('value', async snapshot => {
            const val = snapshot.val();
            setValue({postnr: val})
        })
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/fname' ).once('value', async snapshot => {
            const val = snapshot.val();
            setValue({fname: val})
            
        }) 
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/lname' ).once('value', async snapshot => {
            const val = snapshot.val();
            setValue({lname: val})
        })
        
         dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/email' ).once('value', async snapshot => {
            const val = snapshot.val();
            setValue({email: val})
        })
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/telefonnr' ).once('value', async snapshot => {
            const val = snapshot.val();
            setValue({telephonenr: val})
        }) 
        
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/clubDescription' ).once('value', async snapshot => {
            const val = snapshot.val();
            setValue({clubDescription: val})
        })

    }, [currentUser])

    const updateUserData = () => {
        const dataToupdate = value;
        dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/').update(dataToupdate, function(error)  {
            if(error) {
                console.log("update failed")
            } else {
                alert("Profil blev opdateret")  
            }
        })
        
    }

    

    const handleClick = (e) => {
        
        console.log(value)
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
                                                <h3 className="mb-1">{value.fname}</h3>
                                                
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{EmailAddress}</label>
                                            <input className="form-control"  value={value.email} onChange={((e) => setValue({email: e.target.value}))}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{Password}</label>
                                            <input className="form-control" type="password" defaultValue="password" onChange={((e) => setValue({password: e.target.value}))} readOnly />
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
                                                <input className="form-control" type="text" name="foreningName" value={value.foreningName} onChange={((e) => setValue({foreningName: e.target.value}))}/>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="form-label">{Website}</label>
                                            <input className="form-control" placeholder="http://Uplor .com" />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{FirstName}</label>
                                                <input className="form-control" type="text" name="fname" value={value.fname} onChange={((e) => setValue({fname: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LastName}</label>
                                                <input className="form-control" type="text" name="lname" value={value.lname} onChange={((e) => setValue({lname: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">{Address}</label>
                                                <input className="form-control" type="text" name="adresse" value={value.adresse} onChange={((e) => setValue({adresse: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">{City}</label>
                                                <input className="form-control" type="text" name="city" value={value.city} onChange={((e) => setValue({city: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{PostalCode}</label>
                                                <input className="form-control" type="number" name="postnr" value={value.postnr} onChange={((e) => setValue({postnr: e.target.value}))} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-0">
                                                <label className="form-label">{AboutMe}</label>
                                                <textarea className="form-control" rows="5" name="clubDescription" value={value.clubDescription} onChange={((e) => setValue({clubDescription: e.target.value}))}></textarea>
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