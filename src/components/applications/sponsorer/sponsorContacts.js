
import React, { Fragment, useState, useEffect, useRef, useReducer } from 'react';
import Breadcrumb from '../../common/breadcrumb'
import {firebase_app} from '../../../data/config';
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, Form, Button } from 'reactstrap'
import defaultuser from '../../../assets/images/user/user.png';
import { createSponsor, deletedUser, editUser } from '../../../services/contact.service'
import search from '../../../assets/images/search-not-found.png';
import { useForm } from 'react-hook-form';
import SweetAlert from 'sweetalert2'
import ReactToPrint from "react-to-print";
import PrintPreview from './printpreview'
import {Sponsordatabase,NewContacts,AddContacts,Views,FrontName, LastName, City, PostalCode, Name, Mobile,EmailAddress,FollowUp,History,ContactHistory,Edit,Delete,Print,Save,Cancel,PrintViews, ContactCreated, Virksomhed, Email, CVR, DiverseKontakter, Adresse} from '../../../constant'


const Newcontact = () => {

  const [addurl,setAddurl] = useState(defaultuser)
  const [editurl,setEditurl] = useState()
  const [activeTab, setActiveTab] = useState('1');
  const [dynamictab, setDynamicTab] = useState('0')
  const {register, handleSubmit, errors } = useForm(); // initialise the hook
  const [sponsors, setSponsors] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const [diverseKontakter, setDiverseKontakter] = useState([]);
  const [editdata, setEditData] = useState({});
  const [editing, setEditing] = useState(false)
  const [selectedContact, setselectedContact] = useState({})
  const db = firebase_app.firestore();
  const [printmodal, setprintModal] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const printModalToggle = () => setprintModal(!printmodal);
  const componentRef = useRef();
  const [currentUser] =  useState(localStorage.getItem('userID'));
  const [newContact, setNewContact] = useReducer((value, newValue) => ({...value, ...newValue}), {
    virksomhed: ' ',
    fname: '',
    lname: '',
    phone: '',
    adresse: '',
    city: '',
    postnr: '',
    email: '',
    cvrnr: '',
    contactName: '',
    branche: '',
    
})

  //todo when a new entry is made into the database, set the selectedContact to the new entry.
  
  useEffect(() => {
    db.collection('sponsorDatabase/' + currentUser + '/newSponsor' ).onSnapshot((snapshot) => {
      const getSponsors = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setSponsors(getSponsors)
      setselectedContact(getSponsors[0])
    })
    db.collection('sponsorDatabase/' + currentUser + '/followUp' ).onSnapshot((snapshot) => {
      const getFollowUp = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setFollowUp(getFollowUp)
      setselectedContact(getFollowUp[0])
    })
    db.collection('sponsorDatabase/' + currentUser + '/diverse' ).onSnapshot((snapshot) => {
      const getDiverseKontakter = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setDiverseKontakter(getDiverseKontakter)
      setselectedContact(getDiverseKontakter[0])
    }) 
  }, [db, currentUser]);


  const AddContact = () => {

    var setToList;
    // eslint-disable-next-line default-case
    switch (activeTab) {
      case '1': 
       setToList = 'newSponsor';
       break;
      case '2': 
       setToList = 'diverse';
       break;
      case '3': 
       setToList = 'followUp';
       break;
    }
      
    if (newContact !== '') {
      alert('En ny kontakt:  ' + newContact.fname + ' blev tilføjet ' + setToList )
      createSponsor(newContact, setToList, currentUser);
      setNewContact({
        virksomhed: '',
        fname: '',
        lname: '',
        phone: '',
        adresse: '',
        city: '',
        postnr: '',
        email: '',
        cvrnr: '',
        contactName: '',
        branche: '',
      })
      setModal(false)
      
      

    } else {
      errors.showMessages();
    }
  };


  const UpdateContact = data => {
    if (data !== '') {
      editUser(data, editurl, editdata.id);
      setEditing(false)
    } else {
      errors.showMessages();
    }
  };

  const EditUSers = (usersData) => {
    setEditing(true)
    setEditData(usersData)
    setEditurl(usersData.avatar)
  }

  const HandleAddUrl = (event) => {
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
      setAddurl(reader.result)
    }
  }

  const HandleEditUrl = (event) => {
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
      setEditurl(reader.result)
    }
  }

  const deleteUser = () => {

    var setToList;
    // eslint-disable-next-line default-case
    switch (activeTab) {
      case '1': 
       setToList = 'newSponsor';
       break;
      case '2': 
       setToList = 'diverse';
       break;
      case '3': 
       setToList = 'followUp';
       break;
    }

    SweetAlert.fire({
      title: 'Er du sikker?',
      text: "Hvis du sletter denne kontakt, er det ikke muligt at få den tilbage!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Fortryd',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        
        deletedUser(currentUser, setToList, selectedContact.id );
        SweetAlert.fire(
          'Slettet!',
          'Sponsoren er slettet',
          'success'
        )
      }
      else {
        SweetAlert.fire(
          ':Sponsoren er ikke blevet slettet'
        )
      }
    })
  }

  const history = () => {
    document.querySelector(".history").classList.add("show")
  }

  const closehistory = () => {
    document.querySelector(".history").classList.remove("show")
  }

  const ContactDetails = (sponsor) => {
      setselectedContact({ firstName: sponsor.firstName, lastName: sponsor.lastName, phone:sponsor.phone, email: sponsor.email, virksomhed: sponsor.virksomhed, cvrnr: sponsor.cvrnr })
  }
  
  return (
    <Fragment>
      <Breadcrumb parent="Sponsorer" title="Vores Sponsorer" />
      <Container fluid={true}>
        <div className="email-wrap bookmark-wrap">
          <Row>
            {/* left-aside-content  start */}
            <Col xl="3" className="box-col-6">
              <div className="email-left-aside">
                <Card>
                  <CardBody>
                    <div className="email-app-sidebar left-bookmark">
                      <Nav className="main-menu contact-options" role="tablist">
                        <NavItem>
                          <Button color="primary" className="btn-block btn-mail badge-light-primary" onClick={toggle}>
                            <i className="mr-2" data-feather="users"></i>
                                {NewContacts}
                              </Button>
                          <Modal isOpen={modal} toggle={toggle} size="lg">
                            <ModalHeader toggle={toggle}>{AddContacts}</ModalHeader>
                            <ModalBody>
                              <Form className="form-bookmark needs-validation" >
                                <div className="form-row">
                                  <div className="contact-profile">
                                    <img className="rounded-circle img-100" src={addurl} alt="" />
                                    <div className="icon-wrapper">
                                      <i className="icofont icofont-pencil-alt-5">
                                        <input className="upload" type="file" onChange={(e) => HandleAddUrl(e)} />
                                      </i>
                                    </div>
                                  </div>
                                  <FormGroup className="col-md-12">
                                    
                                    <Row>
                                      <Col sm="6">
                                      <Label>{FrontName}</Label>
                                        <Input className="form-control" name="firstname" type="text" value={newContact.fname}
                                         onChange={((e) => setNewContact({fname: e.target.value}))} innerRef={register({ required: true })} />
                                        <span style={{ color: "red" }}>{errors.name && 'Venligst indtast et fornavn'}</span>
                                      </Col>
                                      <Col sm="6">
                                      <Label>{LastName}</Label>
                                        <Input className="form-control" name="lastname" type="text" value={newContact.lname}
                                         onChange={((e) => setNewContact({lname: e.target.value}))} innerRef={register({ required: true })} />
                                        <span style={{ color: "red" }}></span>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup className="col-md-12 ">
                                    <Label>{Virksomhed}</Label>
                                    <Input className="form-control" name="virksomhed" type="text" value={newContact.virksomhed}
                                     onChange={((e) => setNewContact({virksomhed: e.target.value}))} innerRef={register({ required: true })} />
                                    <span style={{ color: "red" }}>{errors.virksomhed&& '<Venligst indtast et virksomhedsnavn'}</span>
                                  </FormGroup>
                                  
                                  <FormGroup className="col-md-12 ">
                                    <Label>{Mobile}</Label>
                                    <Input className="form-control" name="phone" type="number" value={newContact.phone}
                                     onChange={((e) => setNewContact({phone: e.target.value}))} innerRef={register({ pattern: /\d+/, minlength: 0, maxlength: 9 })} />
                                    <span style={{ color: "red" }}>{errors.phone && 'Venligst indtast et nummer mellem 8 og 11 tal'}</span>
                                  </FormGroup>
                                  <FormGroup className="col-md-12 ">
                                    <Label>{Email}</Label>
                                    <Input className="form-control" name="email" type="email" value={newContact.email}
                                     onChange={((e) => setNewContact({email: e.target.value}))} innerRef={register({ required: true })} />
                                    <span style={{ color: "red" }}>{errors.email && 'Venligst indtast en gyldig email adresse'}</span>
                                  </FormGroup>
                                  <FormGroup className="col-md-12 ">
                                    <Label>{CVR}</Label>
                                    <Input className="form-control" name="cvrnr" type="number" value={newContact.cvrnr}
                                     onChange={((e) => setNewContact({cvrnr: e.target.value}))} innerRef={register({ required: true })} />
                                    <span style={{ color: "red" }}></span>
                                  </FormGroup>
                                  <FormGroup className="col-md-12 ">
                                    <Label>{Adresse}</Label>
                                    <Input className="form-control" name="adresse" type="textr" value={newContact.adresse}
                                     onChange={((e) => setNewContact({adresse: e.target.value}))} />
                                  </FormGroup>
                                  <FormGroup className="col-md-12 ">
                                    <Label>{City}</Label>
                                    <Input className="form-control" name="city" type="text" value={newContact.city}
                                     onChange={((e) => setNewContact({city: e.target.value}))} innerRef={register({ required: true })} />
                                    <span style={{ color: "red" }}>{errors.city && 'Venligst indtast et gyldigt postnummer på 4 cifre'}</span>
                                  </FormGroup>
                                  <FormGroup className="col-md-12 ">
                                    <Label>{PostalCode}</Label>
                                    <Input className="form-control" name="postnr" type="number" value={newContact.postnr}
                                     onChange={((e) => setNewContact({postnr: e.target.value}))} innerRef={register({ pattern: /\d+/, minlength: 4, maxlength: 4 })} />
                                    <span style={{ color: "red" }}>{errors.postnr && 'Venligst indtast et gyldigt postnummer på 4 cifre'}</span>
                                  </FormGroup>
                                  
                                </div>
                                <Button color="secondary" className="mr-1" onClick={handleSubmit(AddContact)}>{Save}</Button>
                                <Button color="primary" onClick={toggle}>{Cancel}</Button>
                              </Form>
                            </ModalBody>
                          </Modal>
                        </NavItem>
                        <NavItem><span className="main-title"> {Views}</span></NavItem>
                        <NavItem><a href="#javascript" className={activeTab === '1' ? 'active' : ''}
                            onClick={() => {setActiveTab('1'); setselectedContact(sponsors[0])}}>
                            <span className="title"> {Sponsordatabase}</span></a>
                        </NavItem>
                        <NavItem>
                            <a href="#javascript" className={activeTab === '3' ? 'active' : ''}
                            onClick={() => {setActiveTab('3'); setselectedContact(followUp[0])} }>
                            <span className="title">{FollowUp}</span></a>
                        </NavItem>
                        <NavItem><a href="#javascript" className={activeTab === '2' ? 'active' : ''} 
                            onClick={() => {setActiveTab('2'); setselectedContact(diverseKontakter[0])}}>
                            <span className="title"> {DiverseKontakter}</span></a>
                        </NavItem>
                      </Nav>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            {/* left-aside-content  end */}

            {/* right-aside-content  start */}
            <Col xl="9" md="12" className="box-col-12">
              <div className="email-right-aside bookmark-tabcontent contacts-tabs">
                <Card className="email-body radius-left">
                  <div className="pl-0">
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <Card className="mb-0">
                          <CardHeader className="d-flex">
                            <h5>{Sponsordatabase}</h5>
                          </CardHeader>
                          <CardBody className="p-0">
                            <Row className="list-persons" id="addcon">
                              <Col xl="4 xl-50" md="5">
                                <Nav className="flex-column nav-pills">
                                
                                { sponsors.length > 0 ?
                                    sponsors.map((sponsor, index) => {
                                      return (
                                          <NavLink className={dynamictab === index ? "active" : ""} onClick={() => setDynamicTab(index)} key={index}>
                                          <div className="media"  onClick={() => ContactDetails(sponsor)}>
                                            
                                            <div className="media-body">
                                              <h6>
                                                <span className="first_name_0">{sponsor.virksomhed}</span>
                                                
                                              </h6>
                                              <span className="first_name_0">{sponsor.firstName} {sponsor.lastName}</span>
                                              
                                            </div>
                                          </div>
                                          </NavLink>
                                      
                                      )
                                    })
                                  :
                                  <Col sm="12">
                                          <div>
                                              <div className="search-not-found text-center">
                                                  <div>
                                                      <img src={search} alt="" className="second-search" />
                                                      <p className="mb-0">{"Sorry, Not Found Any Contact"}</p>
                                                  </div>
                                              </div>
                                          </div>
                                  </Col>
                                  }
                                  
                                </Nav>
                              </Col>
                              <Col xl="8 xl-50" md="7">
                                {editing ?

                                  <div className="contact-editform pl-0 m-auto">
                                    <Form onSubmit={handleSubmit(UpdateContact)}>
                                      <div className="form-row">
                                        <div className="contact-profile">
                                          <img className="rounded-circle img-100" src={editurl} alt="" />
                                          <div className="icon-wrapper">
                                            <i className="icofont icofont-pencil-alt-5">
                                              <input className="upload" type="file" onChange={(e) => HandleEditUrl(e)} />
                                            </i>
                                          </div>
                                        </div>
                                        <FormGroup className="col-md-12">
                                          <label>{Name}</label>
                                          <Row>
                                            <Col sm="6">
                                              <Input className="form-control" type="text" name="name" defaultValue={editdata.name} innerRef={register({ required: true })} />
                                              <span style={{ color: "red" }}>{errors.name && 'First name is required'}</span>
                                            </Col>
                                            
                                          </Row>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                          <Label>{Virksomhed}</Label>
                                          <Input className="form-control" type="text" name="virksomhed" defaultValue={editdata.virksomhed} innerRef={register({ required: true, pattern: /\d+/, min: 18, max: 70 })} />
                                          <span style={{ color: "red" }}>{errors.age && 'Please enter age between 18 to 70 year.'}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                          <Label>{Mobile}</Label>
                                          <Input className="form-control" type="text" name="mobile" defaultValue={editdata.phone} innerRef={register({ pattern: /\d+/, minlength: 0, maxlength: 9 })} />
                                          <span style={{ color: "red" }}>{errors.phone && 'Please enter number max 9 digit'}</span>
                                        </FormGroup>
                                      </div>
                                      <Button color="secondary" className="update-contact mr-1">{Save}</Button>
                                      <Button color="primary" onClick={() => setEditing(false)}>{Cancel}</Button>
                                    </Form>
                                  </div>
                                  :
                                  <TabContent activeTab={dynamictab}>
                                    <TabPane tabId={dynamictab}>
                                    {selectedContact ?
                                      <div className="profile-mail">
                                        <div className="media">
                                          <div className="media-body mt-0">
                                            <h5 className="first_name_0">{selectedContact.virksomhed}</h5>
                                            <p><span className="first_name_0">{selectedContact.firstName}</span> <span className="last_name_0">{selectedContact.lastName}</span></p>
                                            <ul>
                                              <li><a href="#javaScript" onClick={() => EditUSers(selectedContact)}>{Edit}</a></li>
                                              <li><a href="#javaScript" onClick={() => deleteUser(selectedContact.id)}>{Delete}</a></li>
                                              <li><a href="#javaScript" onClick={() => history()}>{History}</a></li>
                                             
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="email-general">
                                          <h6 className="mb-3">Informationer</h6>
                                          <ul>
                                            <li>{Name} <span className="font-primary first_name_0">{selectedContact.firstName} {selectedContact.lastName}</span></li>
                                            <li>{Virksomhed} <span className="font-primary first_name_0">{selectedContact.virksomhed}</span></li>
                                            <li>{Mobile}<span className="font-primary mobile_num_0">{selectedContact.phone}</span></li>
                                            <li>{EmailAddress} <span className="font-primary email_add_0">{selectedContact.email} </span></li>
                                            <li>{CVR} <span className="font-primary email_add_0">{selectedContact.cvrnr} </span></li>
                                          </ul>
                                        </div>
                                      </div>
                                      :
                                      <Col sm="12">
                                          <div>
                                              <div className="search-not-found text-center">
                                                  <div>
                                                      <img src={search} alt="" className="second-search" />
                                                      <p className="mb-0">{"Sorry, Not Found Any Contact"}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </Col>
                                      }
                                    </TabPane>
                                  </TabContent>
                                }
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </TabPane>
                      <TabPane tabId="3">
                        <Card className="mb-0">
                          <CardHeader className="d-flex">
                            <h5>{Sponsordatabase}</h5>
                          </CardHeader>
                          <CardBody className="p-0">
                            <Row className="list-persons" id="addcon">
                              <Col xl="4 xl-50" md="5">
                                <Nav className="flex-column nav-pills">
                                
                                { followUp.length > 0 ?
                                    followUp.map((sponsor, index) => {
                                      return (
                                          <NavLink className={dynamictab === index ? "active" : ""} onClick={() => setDynamicTab(index)} key={index}>
                                          <div className="media"  onClick={() => ContactDetails(sponsor)}>
                                            
                                            <div className="media-body">
                                              <h6>
                                                <span className="first_name_0">{sponsor.virksomhed}</span>
                                                
                                              </h6>
                                              <span className="first_name_0">{sponsor.firstName} {sponsor.lastName}</span>
                                              
                                            </div>
                                          </div>
                                          </NavLink>
                                      
                                      )
                                    })
                                  :
                                  <Col sm="12">
                                          <div>
                                              <div className="search-not-found text-center">
                                                  <div>
                                                      <img src={search} alt="" className="second-search" />
                                                      <p className="mb-0">{"Sorry, Not Found Any Contact"}</p>
                                                  </div>
                                              </div>
                                          </div>
                                  </Col>
                                  }
                                  
                                </Nav>
                              </Col>
                              <Col xl="8 xl-50" md="7">
                                {editing ?

                                  <div className="contact-editform pl-0 m-auto">
                                    <Form onSubmit={handleSubmit(UpdateContact)}>
                                      <div className="form-row">
                                        <div className="contact-profile">
                                          <img className="rounded-circle img-100" src={editurl} alt="" />
                                          <div className="icon-wrapper">
                                            <i className="icofont icofont-pencil-alt-5">
                                              <input className="upload" type="file" onChange={(e) => HandleEditUrl(e)} />
                                            </i>
                                          </div>
                                        </div>
                                        <FormGroup className="col-md-12">
                                          <label>{Name}</label>
                                          <Row>
                                            <Col sm="6">
                                              <Input className="form-control" type="text" name="name" defaultValue={editdata.name} innerRef={register({ required: true })} />
                                              <span style={{ color: "red" }}>{errors.name && 'First name is required'}</span>
                                            </Col>
                                            
                                          </Row>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                          <Label>{Virksomhed}</Label>
                                          <Input className="form-control" type="text" name="virksomhed" defaultValue={editdata.virksomhed} innerRef={register({ required: true, pattern: /\d+/, min: 18, max: 70 })} />
                                          <span style={{ color: "red" }}>{errors.virksomhed && 'Please enter age between 18 to 70 year.'}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                          <Label>{Mobile}</Label>
                                          <Input className="form-control" type="text" name="mobile" defaultValue={editdata.phone} innerRef={register({ pattern: /\d+/, minlength: 0, maxlength: 9 })} />
                                          <span style={{ color: "red" }}>{errors.phone && 'Please enter number max 9 digit'}</span>
                                        </FormGroup>
                                      </div>
                                      <Button color="secondary" className="update-contact mr-1">{Save}</Button>
                                      <Button color="primary" onClick={() => setEditing(false)}>{Cancel}</Button>
                                    </Form>
                                  </div>
                                  :
                                  <TabContent activeTab={dynamictab}>
                                    <TabPane tabId={dynamictab}>
                                    {selectedContact ?
                                      <div className="profile-mail">
                                        <div className="media">
                                          <div className="media-body mt-0">
                                          <h5 className="first_name_0">{selectedContact.virksomhed}</h5>
                                            <p><span className="first_name_0">{selectedContact.firstName}</span> <span className="last_name_0">{selectedContact.lastName}</span></p>
                                            
                                            <ul>
                                              <li><a href="#javaScript" onClick={() => EditUSers(selectedContact)}>{Edit}</a></li>
                                              <li><a href="#javaScript" onClick={() => deleteUser(selectedContact.id)}>{Delete}</a></li>
                                              <li><a href="#javaScript" onClick={() => history()}>{History}</a></li>
                                             
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="email-general">
                                          <h6 className="mb-3">Informationer</h6>
                                          <ul>
                                            <li>{Name} <span className="font-primary first_name_0">{selectedContact.firstName} {selectedContact.lastName}</span></li>
                                            <li>{Virksomhed} <span className="font-primary first_name_0">{selectedContact.virksomhed}</span></li>
                                            <li>{Mobile}<span className="font-primary mobile_num_0">{selectedContact.phone}</span></li>
                                            <li>{EmailAddress} <span className="font-primary email_add_0">{selectedContact.email} </span></li>
                                            <li>{CVR} <span className="font-primary email_add_0">{selectedContact.cvrnr} </span></li>
                                          </ul>
                                        </div>
                                      </div>
                                      :
                                      <Col sm="12">
                                          <div>
                                              <div className="search-not-found text-center">
                                                  <div>
                                                      <img src={search} alt="" className="second-search" />
                                                      <p className="mb-0">{"Sorry, Not Found Any Contact"}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </Col>
                                      }
                                    </TabPane>
                                  </TabContent>
                                }
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </TabPane>
                      <TabPane tabId="2">
                        <Card className="mb-0">
                          <CardHeader className="d-flex">
                            <h5>{Sponsordatabase}</h5>
                          </CardHeader>
                          <CardBody className="p-0">
                            <Row className="list-persons" id="addcon">
                              <Col xl="4 xl-50" md="5">
                                <Nav className="flex-column nav-pills">
                                
                                { diverseKontakter.length > 0 ?
                                    diverseKontakter.map((sponsor, index) => {
                                      return (
                                          <NavLink className={dynamictab === index ? "active" : ""} onClick={() => setDynamicTab(index)} key={index}>
                                          <div className="media"  onClick={() => ContactDetails(sponsor)}>
                                            
                                            <div className="media-body">
                                              <h6>
                                                <span className="first_name_0">{sponsor.name}</span>
                                                
                                              </h6>
                                              <span className="first_name_0">{sponsor.virksomhed}</span>
                                              <p className="email_add_0">{sponsor.email}</p>
                                            </div>
                                          </div>
                                          </NavLink>
                                      
                                      )
                                    })
                                  :
                                  <Col sm="12">
                                          <div>
                                              <div className="search-not-found text-center">
                                                  <div>
                                                      <img src={search} alt="" className="second-search" />
                                                      <p className="mb-0">{"Sorry, Not Found Any Contact"}</p>
                                                  </div>
                                              </div>
                                          </div>
                                  </Col>
                                  }
                                  
                                </Nav>
                              </Col>
                              <Col xl="8 xl-50" md="7">
                                {editing ?

                                  <div className="contact-editform pl-0 m-auto">
                                    <Form onSubmit={handleSubmit(UpdateContact)}>
                                      <div className="form-row">
                                        <div className="contact-profile">
                                          <img className="rounded-circle img-100" src={editurl} alt="" />
                                          <div className="icon-wrapper">
                                            <i className="icofont icofont-pencil-alt-5">
                                              <input className="upload" type="file" onChange={(e) => HandleEditUrl(e)} />
                                            </i>
                                          </div>
                                        </div>
                                        <FormGroup className="col-md-12">
                                          <label>{Name}</label>
                                          <Row>
                                            <Col sm="6">
                                              <Input className="form-control" type="text" name="name" defaultValue={editdata.firstName} innerRef={register({ required: true })} />
                                              <span style={{ color: "red" }}>{errors.name && 'First name is required'}</span>
                                            </Col>
                                            
                                          </Row>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                          <Label>{Virksomhed}</Label>
                                          <Input className="form-control" type="text" name="virksomhed" defaultValue={editdata.virksomhed} innerRef={register({ required: true, pattern: /\d+/, min: 18, max: 70 })} />
                                          <span style={{ color: "red" }}>{errors.virksomhed && 'Please enter age between 18 to 70 year.'}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                          <Label>{Mobile}</Label>
                                          <Input className="form-control" type="text" name="mobile" defaultValue={editdata.phone} innerRef={register({ pattern: /\d+/, minlength: 0, maxlength: 9 })} />
                                          <span style={{ color: "red" }}>{errors.phone && 'Please enter number max 9 digit'}</span>
                                        </FormGroup>
                                      </div>
                                      <Button color="secondary" className="update-contact mr-1">{Save}</Button>
                                      <Button color="primary" onClick={() => setEditing(false)}>{Cancel}</Button>
                                    </Form>
                                  </div>
                                  :
                                  <TabContent activeTab={dynamictab}>
                                    <TabPane tabId={dynamictab}>
                                    {selectedContact ?
                                      <div className="profile-mail">
                                        <div className="media">
                                          <div className="media-body mt-0">
                                          <h5 className="first_name_0">{selectedContact.virksomhed}</h5>
                                            <p><span className="first_name_0">{selectedContact.firstName}</span> <span className="last_name_0">{selectedContact.lastName}</span></p>
                                            
                                            <ul>
                                              <li><a href="#javaScript" onClick={() => EditUSers(selectedContact)}>{Edit}</a></li>
                                              <li><a href="#javaScript" onClick={() => deleteUser(selectedContact.id)}>{Delete}</a></li>
                                              <li><a href="#javaScript" onClick={() => history()}>{History}</a></li>
                                             
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="email-general">
                                          <h6 className="mb-3">Informationer</h6>
                                          <ul>
                                            <li>{Name} <span className="font-primary first_name_0">{selectedContact.firstName} {selectedContact.lastName}</span></li>
                                            <li>{Virksomhed} <span className="font-primary first_name_0">{selectedContact.virksomhed}</span></li>
                                            <li>{Mobile}<span className="font-primary mobile_num_0">{selectedContact.phone}</span></li>
                                            <li>{EmailAddress} <span className="font-primary email_add_0">{selectedContact.email} </span></li>
                                            <li>{CVR} <span className="font-primary email_add_0">{selectedContact.cvrnr} </span></li>
                                          </ul>
                                        </div>
                                      </div>
                                      :
                                      <Col sm="12">
                                          <div>
                                              <div className="search-not-found text-center">
                                                  <div>
                                                      <img src={search} alt="" className="second-search" />
                                                      <p className="mb-0">{"Sorry, Not Found Any Contact"}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </Col>
                                      }
                                    </TabPane>
                                  </TabContent>
                                }
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </TabPane>
                     
                        

                      

                      <div id="right-history" className="history">
                        <div className="modal-header p-l-20 p-r-20">
                          <h6 className="modal-title w-100">{ContactHistory}
                                <span className="pull-right">
                              <a className="closehistory" href="#javaScript" onClick={closehistory}>
                                <i className="icofont icofont-close"></i>
                              </a>
                            </span>
                          </h6>
                        </div>
                        <div className="history-details">
                          <div className="text-center"><i className="icofont icofont-ui-edit"></i>
                            <p>{"Der er ingen historik for denne sponsor."}</p>
                          </div>
                          <div className="media"><i className="icofont icofont-star mr-3"></i>
                            <div className="media-body mt-0">
                              <h6 className="mt-0">{ContactCreated}</h6>
                              <p className="mb-0">{"Sponsor oprettet via platform"}</p><span className="f-12">{"Sep 10, 2019 4:00"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal isOpen={printmodal} toggle={printModalToggle} >
                        <ModalHeader toggle={printModalToggle}>{PrintViews}</ModalHeader>
                        <ModalBody className="list-persons">
                          <PrintPreview selectedContact={selectedContact} ref={componentRef}/>
                          <ReactToPrint
                              trigger={() => (
                                <Button color="secondary" className="mr-1">
                                  {Print}
                                </Button>
                              )}
                              content={() => componentRef.current}
                            />
                          <Button color="primary" onClick={printModalToggle}>{Cancel}</Button>
                        </ModalBody>
                      </Modal>
                    </TabContent>
                  </div>
                </Card>
              </div>
            </Col>
            {/* right-aside-content  end */}

          </Row>
        </div>
      </Container>
    </Fragment>
  );
}
export default Newcontact;