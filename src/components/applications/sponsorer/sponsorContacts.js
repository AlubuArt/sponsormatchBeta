import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
} from "react";
import Breadcrumb from "../../common/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  FormGroup,
  Form,
  Button,
} from "reactstrap";
import {
  createSponsor,
  deleteContactFromDatabase,
  editContactInDatabase,
  getContactsFromDatabase,
} from "../../../services/contact.service";
import search from "../../../assets/images/search-not-found.png";
import { useForm } from "react-hook-form";
import SweetAlert from "sweetalert2";
import ReactToPrint from "react-to-print";
import PrintPreview from "./printpreview";
import {
  Sponsordatabase,
  NewContacts,
  AddContacts,
  Views,
  FrontName,
  Email,
  LastName,
  City,
  PostalCode,
  Name,
  FirstName,
  Mobile,
  EmailAddress,
  FollowUp,
  History,
  ContactHistory,
  Edit,
  Delete,
  Print,
  Save,
  Cancel,
  PrintViews,
  ContactCreated,
  Virksomhed,
  CVR,
  DiverseKontakter,
  Adresse,
} from "../../../constant";
import { UserContext } from "../../../auth/context/userContext";

const Newcontact = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [dynamictab, setDynamicTab] = useState("0");
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const [sponsors, setSponsors] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const [diverseKontakter, setDiverseKontakter] = useState([]);
  const [editdata, setEditData] = useReducer(
    (value, newValue) => ({ ...value, ...newValue }),
    {
      virksomhed: "",
      firstName: "",
      lastName: "",
      phone: "",
      adresse: "",
      city: "",
      postnr: "",
      email: "",
      cvrnr: "",
      contactName: "",
      branche: "",
    }
  );
  const [editing, setEditing] = useState(false);
  const [selectedContact, setselectedContact] = useState({});
  const [printmodal, setprintModal] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const printModalToggle = () => setprintModal(!printmodal);
  const componentRef = useRef();
  const { userID } = useContext(UserContext);
  const [selectedList, setSelectedList] = useState("Vores Sponsorer");
  const [newContact, setNewContact] = useReducer(
    (value, newValue) => ({ ...value, ...newValue }),
    {
      virksomhed: "",
      firstName: "",
      lastName: "",
      phone: "",
      adresse: "",
      city: "",
      postnr: "",
      email: "",
      cvrnr: "",
      contactName: "",
      branche: "",
    }
  );

  useEffect(() => {
    const getContacts = async () => {
      const sponsors = await getContactsFromDatabase(userID, "/sponsorer");
      const diverseKontakter = await getContactsFromDatabase(
        userID,
        "/diverseKontakter"
      );
      const followUp = await getContactsFromDatabase(
        userID,
        "/potentielleSponsorer"
      );
      setSponsors(sponsors);
      setDiverseKontakter(diverseKontakter);
      setFollowUp(followUp);
    };
    getContacts();
  }, [userID]);

  const getContacts = async () => {
    const sponsors = await getContactsFromDatabase(userID, "/sponsorer");
    const diverseKontakter = await getContactsFromDatabase(
      userID,
      "/diverseKontakter"
    );
    const followUp = await getContactsFromDatabase(
      userID,
      "/potentielleSponsorer"
    );
    setSponsors(sponsors);
    setDiverseKontakter(diverseKontakter);
    setFollowUp(followUp);
  };

  const AddContact = () => {
    var setToList;
    // eslint-disable-next-line no-unused-vars
    var listName;
    // eslint-disable-next-line no-unused-vars
    var setList;
    // eslint-disable-next-line default-case
    switch (activeTab) {
      case "1":
        setToList = "sponsorer";
        listName = "Vores Sponsorer";
        setList = sponsors[0];
        break;
      case "2":
        setToList = "diverseKontakter";
        listName = "Diverse kontakter";
        setList = diverseKontakter[0];
        break;
      case "3":
        setToList = "potentielleSponsorer";
        listName = "Til opfølgning";
        setList = followUp[0];
        break;
    }

    if (newContact !== "") {
      alert(
        "En ny kontakt:  " +
          newContact.firstName +
          " blev tilføjet listen " +
          setToList
      );
      createSponsor(newContact, setToList, userID, newContact.virksomhed);
      getContacts();
      setselectedContact(newContact);
      setNewContact({
        virksomhed: "",
        firstName: "",
        lastName: "",
        phone: "",
        adresse: "",
        city: "",
        postnr: "",
        email: "",
        cvrnr: "",
        contactName: "",
        branche: "",
      });
      setModal(false);
    } else {
      errors.showMessages();
    }
  };

  const UpdateContact = () => {
    var setToList;
    // eslint-disable-next-line default-case
    switch (activeTab) {
      case "1":
        setToList = "sponsorer";
        break;
      case "2":
        setToList = "diverseKontakter";
        break;
      case "3":
        setToList = "potentielleSponsorer";
        break;
    }
    if (editdata !== "") {
      editContactInDatabase(editdata, setToList, userID, selectedContact.cvrnr);
      setEditing(false);
      getContacts();
    } else {
      errors.showMessages();
    }
  };

  const EditUSers = (usersData) => {
    setEditing(true);
    setEditData(usersData);
  };

  const deleteContact = () => {
    var setToList;
    var setSelected;
    // eslint-disable-next-line default-case
    switch (activeTab) {
      case "1":
        setToList = "sponsorer";
        setSelected = sponsors[0];
        break;
      case "2":
        setToList = "diverseKontakter";
        setSelected = diverseKontakter[0];
        break;
      case "3":
        setToList = "potentielleSponsorer";
        setSelected = followUp[0];
        break;
    }

    SweetAlert.fire({
      title: "Er du sikker?",
      text: "Hvis du sletter denne kontakt, er det ikke muligt at få den tilbage!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Fortryd",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        deleteContactFromDatabase(userID, setToList, selectedContact.cvrnr);
        setselectedContact(setSelected);
        getContacts();
        SweetAlert.fire("Slettet!", "Sponsoren er slettet", "success");
      } else {
        SweetAlert.fire(":Sponsoren er ikke blevet slettet");
      }
    });
  };

  const history = () => {
    document.querySelector(".history").classList.add("show");
  };

  const closehistory = () => {
    document.querySelector(".history").classList.remove("show");
  };

  const ContactDetails = (sponsor) => {
    setselectedContact({
      firstName: sponsor.firstName,
      lastName: sponsor.lastName,
      phone: sponsor.phone,
      email: sponsor.email,
      virksomhed: sponsor.virksomhed,
      cvrnr: sponsor.cvrnr,
      adresse: sponsor.adresse,
      city: sponsor.city,
      postnr: sponsor.postnr,
    });
  };

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
                          <Button
                            color="primary"
                            className="btn-block btn-mail badge-light-primary"
                            onClick={toggle}
                          >
                            <i className="mr-2" data-feather="users"></i>
                            {NewContacts}
                          </Button>
                          <Modal isOpen={modal} toggle={toggle} size="lg">
                            <ModalHeader toggle={toggle}>
                              {AddContacts}
                            </ModalHeader>
                            <ModalBody>
                              <Form className="form-bookmark needs-validation">
                                <FormGroup className="col-md-12">
                                  <Row>
                                    <Col sm="6">
                                      <Label>{FrontName}</Label>
                                      <Input
                                        className="form-control"
                                        name="firstname"
                                        type="text"
                                        value={newContact.firstName}
                                        onChange={(e) =>
                                          setNewContact({
                                            firstName: e.target.value,
                                          })
                                        }
                                        innerRef={register({ required: true })}
                                      />
                                      <span style={{ color: "red" }}>
                                        {errors.name &&
                                          "Venligst indtast et fornavn"}
                                      </span>
                                    </Col>
                                    <Col sm="6">
                                      <Label>{LastName}</Label>
                                      <Input
                                        className="form-control"
                                        name="lastname"
                                        type="text"
                                        value={newContact.lastName}
                                        onChange={(e) =>
                                          setNewContact({
                                            lastName: e.target.value,
                                          })
                                        }
                                        innerRef={register({ required: true })}
                                      />
                                      <span style={{ color: "red" }}></span>
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup className="col-md-12 ">
                                  <Label>{Virksomhed}</Label>
                                  <Input
                                    className="form-control"
                                    name="virksomhed"
                                    type="text"
                                    value={newContact.virksomhed}
                                    onChange={(e) =>
                                      setNewContact({
                                        virksomhed: e.target.value,
                                      })
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span style={{ color: "red" }}>
                                    {errors.virksomhed &&
                                      "Venligst indtast et virksomhedsnavn"}
                                  </span>
                                </FormGroup>

                                <FormGroup className="col-md-12 ">
                                  <Label>{Mobile}</Label>
                                  <Input
                                    className="form-control"
                                    name="phone"
                                    type="number"
                                    value={newContact.phone}
                                    onChange={(e) =>
                                      setNewContact({ phone: e.target.value })
                                    }
                                    innerRef={register({
                                      pattern: /\d+/,
                                      minlength: 0,
                                      maxlength: 9,
                                    })}
                                  />
                                  <span style={{ color: "red" }}>
                                    {errors.phone &&
                                      "Venligst indtast et nummer mellem 8 og 11 tal"}
                                  </span>
                                </FormGroup>
                                <FormGroup className="col-md-12 ">
                                  <Label>{Email}</Label>
                                  <Input
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    value={newContact.email}
                                    onChange={(e) =>
                                      setNewContact({ email: e.target.value })
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span style={{ color: "red" }}>
                                    {errors.email &&
                                      "Venligst indtast en gyldig email adresse"}
                                  </span>
                                </FormGroup>
                                <FormGroup className="col-md-12 ">
                                  <Label>{CVR}</Label>
                                  <Input
                                    className="form-control"
                                    name="cvrnr"
                                    type="number"
                                    value={newContact.cvrnr}
                                    onChange={(e) =>
                                      setNewContact({ cvrnr: e.target.value })
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span style={{ color: "red" }}></span>
                                </FormGroup>
                                <FormGroup className="col-md-12 ">
                                  <Label>{Adresse}</Label>
                                  <Input
                                    className="form-control"
                                    name="adresse"
                                    type="textr"
                                    value={newContact.adresse}
                                    onChange={(e) =>
                                      setNewContact({ adresse: e.target.value })
                                    }
                                  />
                                </FormGroup>
                                <FormGroup className="col-md-12 ">
                                  <Label>{City}</Label>
                                  <Input
                                    className="form-control"
                                    name="city"
                                    type="text"
                                    value={newContact.city}
                                    onChange={(e) =>
                                      setNewContact({ city: e.target.value })
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span style={{ color: "red" }}>
                                    {errors.city &&
                                      "Venligst indtast et gyldigt postnummer på 4 cifre"}
                                  </span>
                                </FormGroup>
                                <FormGroup className="col-md-12 ">
                                  <Label>{PostalCode}</Label>
                                  <Input
                                    className="form-control"
                                    name="postnr"
                                    type="number"
                                    value={newContact.postnr}
                                    onChange={(e) =>
                                      setNewContact({ postnr: e.target.value })
                                    }
                                    innerRef={register({
                                      pattern: /\d+/,
                                      minlength: 4,
                                      maxlength: 4,
                                    })}
                                  />
                                  <span style={{ color: "red" }}>
                                    {errors.postnr &&
                                      "Venligst indtast et gyldigt postnummer på 4 cifre"}
                                  </span>
                                </FormGroup>

                                <Button
                                  color="secondary"
                                  className="mr-1"
                                  onClick={handleSubmit(AddContact)}
                                >
                                  {Save}
                                </Button>
                                <Button color="primary" onClick={toggle}>
                                  {Cancel}
                                </Button>
                              </Form>
                            </ModalBody>
                          </Modal>
                        </NavItem>
                        <NavItem>
                          <span className="main-title"> {Views}</span>
                        </NavItem>
                        <NavItem>
                          <a
                            href="#javascript"
                            className={activeTab === "1" ? "active" : ""}
                            onClick={() => {
                              setActiveTab("1");
                              setselectedContact(sponsors[0]);
                              setSelectedList("Vores sponsorer");
                            }}
                          >
                            <span className="title"> {Sponsordatabase}</span>
                          </a>
                        </NavItem>
                        <NavItem>
                          <a
                            href="#javascript"
                            className={activeTab === "3" ? "active" : ""}
                            onClick={() => {
                              setActiveTab("3");
                              setselectedContact(followUp[0]);
                              setSelectedList("Mulige Sponsorer");
                            }}
                          >
                            <span className="title">{FollowUp}</span>
                          </a>
                        </NavItem>
                        <NavItem>
                          <a
                            href="#javascript"
                            className={activeTab === "2" ? "active" : ""}
                            onClick={() => {
                              setActiveTab("2");
                              setselectedContact(diverseKontakter[0]);
                              setSelectedList("Diverse kontakter");
                            }}
                          >
                            <span className="title"> {DiverseKontakter}</span>
                          </a>
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
                            <h5>{selectedList}</h5>
                          </CardHeader>
                          <CardBody className="p-0">
                            <Row className="list-persons" id="addcon">
                              <Col xl="4 xl-50" md="5">
                                <Nav className="flex-column nav-pills">
                                  {sponsors.length > 0 ? (
                                    sponsors.map((sponsor, index) => {
                                      return (
                                        <NavLink
                                          className={
                                            dynamictab === index ? "active" : ""
                                          }
                                          onClick={() => setDynamicTab(index)}
                                          key={index}
                                        >
                                          <div
                                            className="media"
                                            onClick={() =>
                                              ContactDetails(sponsor)
                                            }
                                          >
                                            <div className="media-body">
                                              <h6>
                                                <span className="first_name_0">
                                                  {sponsor.virksomhed}
                                                </span>
                                              </h6>
                                              <span className="first_name_0">
                                                {sponsor.firstName}{" "}
                                                {sponsor.lastName}
                                              </span>
                                            </div>
                                          </div>
                                        </NavLink>
                                      );
                                    })
                                  ) : (
                                    <Col sm="12">
                                      <div>
                                        <div className="search-not-found text-center">
                                          <div>
                                            <img
                                              src={search}
                                              alt=""
                                              className="second-search"
                                            />
                                            <p className="mb-0">
                                              {"Sorry, Not Found Any Contact"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                  )}
                                </Nav>
                              </Col>
                              <Col xl="8 xl-50" md="7">
                                {editing ? (
                                  <div className="contact-editform pl-0 m-auto">
                                    <Form>
                                      <FormGroup className="col-md-12">
                                        <Row>
                                          <Col sm="6">
                                            <label>{FirstName}</label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="firstname"
                                              value={editdata.firstName}
                                              onChange={(e) =>
                                                setEditData({
                                                  firstName: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.name &&
                                                "Venligst indsæt et fornavn"}
                                            </span>
                                          </Col>

                                          <Col sm="6">
                                            <label>{LastName}</label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="lastname"
                                              value={editdata.lastName}
                                              onChange={(e) =>
                                                setEditData({
                                                  lastName: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.name &&
                                                "Venligst indsæt et efternavn"}
                                            </span>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col sm="8">
                                            <Label>{Virksomhed}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="virksomhed"
                                              value={editdata.virksomhed}
                                              onChange={(e) =>
                                                setEditData({
                                                  virksomhed: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.virksomhed &&
                                                "Venligst indsæt et firmanavn"}
                                            </span>
                                          </Col>
                                          <Col sm="4">
                                            <Label>{CVR}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="cvrnr"
                                              value={editdata.cvrnr}
                                              onChange={(e) =>
                                                setEditData({
                                                  cvrnr: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.cvrnr &&
                                                "Venligst indsæt et gyldigt CVRnr."}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="8">
                                            <Label>{Email}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="email"
                                              value={editdata.email}
                                              onChange={(e) =>
                                                setEditData({
                                                  email: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.email &&
                                                "Venligst indsæt en gyldig email adresse"}
                                            </span>
                                          </Col>
                                          <Col sm="4">
                                            <Label>{Mobile}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="mobile"
                                              value={editdata.phone}
                                              onChange={(e) =>
                                                setEditData({
                                                  phone: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                pattern: /\d+/,
                                                minlength: 0,
                                                maxlength: 11,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.phone &&
                                                "Venligst indsæt et gyldigt telefon nummer"}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="12">
                                            <Label>{Adresse}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="adresse"
                                              value={editdata.adresse}
                                              onChange={(e) =>
                                                setEditData({
                                                  adresse: e.target.value,
                                                })
                                              }
                                            />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="8">
                                            <Label>{City}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="city"
                                              value={editdata.city}
                                              onChange={(e) =>
                                                setEditData({
                                                  city: e.target.value,
                                                })
                                              }
                                            />
                                          </Col>
                                          <Col sm="4">
                                            <Label>{PostalCode}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="postnr"
                                              value={editdata.postnr}
                                              onChange={(e) =>
                                                setEditData({
                                                  postnr: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.postnr &&
                                                "Venligst indsæt et gyldigt postnummer"}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Button
                                          color="secondary"
                                          className="update-contact mr-1"
                                          onClick={UpdateContact}
                                        >
                                          {Save}
                                        </Button>
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            setEditing(false);
                                            setEditData("");
                                          }}
                                        >
                                          {Cancel}
                                        </Button>
                                      </FormGroup>
                                    </Form>
                                  </div>
                                ) : (
                                  <TabContent activeTab={dynamictab}>
                                    <TabPane tabId={dynamictab}>
                                      {selectedContact ? (
                                        <div className="profile-mail">
                                          <div className="media">
                                            <div className="media-body mt-0">
                                              <h5 className="first_name_0">
                                                {selectedContact.virksomhed}
                                              </h5>
                                              <p>
                                                <span className="first_name_0">
                                                  {selectedContact.firstName}
                                                </span>{" "}
                                                <span className="last_name_0">
                                                  {selectedContact.lastName}
                                                </span>
                                              </p>
                                              <ul>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() =>
                                                      EditUSers(selectedContact)
                                                    }
                                                  >
                                                    {Edit}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() =>
                                                      deleteContact(
                                                        selectedContact.id
                                                      )
                                                    }
                                                  >
                                                    {Delete}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() => history()}
                                                  >
                                                    {History}
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="email-general">
                                            <h6 className="mb-3">
                                              Informationer
                                            </h6>
                                            <ul>
                                              <li>
                                                {Name}{" "}
                                                <span className="font-primary first_name_0">
                                                  {selectedContact.firstName}{" "}
                                                  {selectedContact.lastName}
                                                </span>
                                              </li>
                                              <li>
                                                {Virksomhed}{" "}
                                                <span className="font-primary first_name_0">
                                                  {selectedContact.virksomhed}
                                                </span>
                                              </li>
                                              <li>
                                                {Mobile}
                                                <span className="font-primary mobile_num_0">
                                                  {selectedContact.phone}
                                                </span>
                                              </li>
                                              <li>
                                                {EmailAddress}{" "}
                                                <span className="font-primary email_add_0">
                                                  {selectedContact.email}{" "}
                                                </span>
                                              </li>
                                              <li>
                                                {CVR}{" "}
                                                <span className="font-primary email_add_0">
                                                  {selectedContact.cvrnr}{" "}
                                                </span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      ) : (
                                        <Col sm="12">
                                          <div>
                                            <div className="search-not-found text-center">
                                              <div>
                                                <img
                                                  src={search}
                                                  alt=""
                                                  className="second-search"
                                                />
                                                <p className="mb-0">
                                                  {
                                                    "Sorry, Not Found Any Contact"
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                      )}
                                    </TabPane>
                                  </TabContent>
                                )}
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </TabPane>
                      <TabPane tabId="3">
                        <Card className="mb-0">
                          <CardHeader className="d-flex">
                            <h5>{selectedList}</h5>
                          </CardHeader>
                          <CardBody className="p-0">
                            <Row className="list-persons" id="addcon">
                              <Col xl="4 xl-50" md="5">
                                <Nav className="flex-column nav-pills">
                                  {followUp.length > 0 ? (
                                    followUp.map((sponsor, index) => {
                                      return (
                                        <NavLink
                                          className={
                                            dynamictab === index ? "active" : ""
                                          }
                                          onClick={() => setDynamicTab(index)}
                                          key={index}
                                        >
                                          <div
                                            className="media"
                                            onClick={() =>
                                              ContactDetails(sponsor)
                                            }
                                          >
                                            <div className="media-body">
                                              <h6>
                                                <span className="first_name_0">
                                                  {sponsor.virksomhed}
                                                </span>
                                              </h6>
                                              <span className="first_name_0">
                                                {sponsor.firstName}{" "}
                                                {sponsor.lastName}
                                              </span>
                                            </div>
                                          </div>
                                        </NavLink>
                                      );
                                    })
                                  ) : (
                                    <Col sm="12">
                                      <div>
                                        <div className="search-not-found text-center">
                                          <div>
                                            <img
                                              src={search}
                                              alt=""
                                              className="second-search"
                                            />
                                            <p className="mb-0">
                                              {"Sorry, Not Found Any Contact"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                  )}
                                </Nav>
                              </Col>
                              <Col xl="8 xl-50" md="7">
                                {editing ? (
                                  <div className="contact-editform pl-0 m-auto">
                                    <Form>
                                      <FormGroup className="col-md-12">
                                        <Row>
                                          <Col sm="6">
                                            <label>{FirstName}</label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="firstname"
                                              value={editdata.firstName}
                                              onChange={(e) =>
                                                setEditData({
                                                  firstName: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.name &&
                                                "Venligst indsæt et fornavn"}
                                            </span>
                                          </Col>

                                          <Col sm="6">
                                            <label>{LastName}</label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="lastname"
                                              value={editdata.lastName}
                                              onChange={(e) =>
                                                setEditData({
                                                  lastName: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.name &&
                                                "Venligst indsæt et efternavn"}
                                            </span>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col sm="8">
                                            <Label>{Virksomhed}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="virksomhed"
                                              value={editdata.virksomhed}
                                              onChange={(e) =>
                                                setEditData({
                                                  virksomhed: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.virksomhed &&
                                                "Venligst indsæt et firmanavn"}
                                            </span>
                                          </Col>
                                          <Col sm="4">
                                            <Label>{CVR}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="cvrnr"
                                              value={editdata.cvrnr}
                                              onChange={(e) =>
                                                setEditData({
                                                  cvrnr: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.cvrnr &&
                                                "Venligst indsæt et gyldigt CVRnr."}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="8">
                                            <Label>{Email}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="email"
                                              value={editdata.email}
                                              onChange={(e) =>
                                                setEditData({
                                                  email: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.email &&
                                                "Venligst indsæt en gyldig email adresse"}
                                            </span>
                                          </Col>
                                          <Col sm="4">
                                            <Label>{Mobile}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="mobile"
                                              value={editdata.phone}
                                              onChange={(e) =>
                                                setEditData({
                                                  phone: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                pattern: /\d+/,
                                                minlength: 0,
                                                maxlength: 11,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.phone &&
                                                "Venligst indsæt et gyldigt telefon nummer"}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="12">
                                            <Label>{Adresse}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="email"
                                              value={editdata.adresse}
                                              onChange={(e) =>
                                                setEditData({
                                                  adresse: e.target.value,
                                                })
                                              }
                                            />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="8">
                                            <Label>{City}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="city"
                                              value={editdata.city}
                                              onChange={(e) =>
                                                setEditData({
                                                  city: e.target.value,
                                                })
                                              }
                                            />
                                          </Col>
                                          <Col sm="4">
                                            <Label>{PostalCode}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="postnr"
                                              value={editdata.postnr}
                                              onChange={(e) =>
                                                setEditData({
                                                  postnr: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.postnr &&
                                                "Venligst indsæt et gyldigt postnummer"}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Button
                                          color="secondary"
                                          className="update-contact mr-1"
                                          onClick={UpdateContact}
                                        >
                                          {Save}
                                        </Button>
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            setEditing(false);
                                            setEditData("");
                                          }}
                                        >
                                          {Cancel}
                                        </Button>
                                      </FormGroup>
                                    </Form>
                                  </div>
                                ) : (
                                  <TabContent activeTab={dynamictab}>
                                    <TabPane tabId={dynamictab}>
                                      {selectedContact ? (
                                        <div className="profile-mail">
                                          <div className="media">
                                            <div className="media-body mt-0">
                                              <h5 className="first_name_0">
                                                {selectedContact.virksomhed}
                                              </h5>
                                              <p>
                                                <span className="first_name_0">
                                                  {selectedContact.firstName}
                                                </span>{" "}
                                                <span className="last_name_0">
                                                  {selectedContact.lastName}
                                                </span>
                                              </p>

                                              <ul>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() =>
                                                      EditUSers(selectedContact)
                                                    }
                                                  >
                                                    {Edit}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() =>
                                                      deleteContact(
                                                        selectedContact.id
                                                      )
                                                    }
                                                  >
                                                    {Delete}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() => history()}
                                                  >
                                                    {History}
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="email-general">
                                            <h6 className="mb-3">
                                              Informationer
                                            </h6>
                                            <ul>
                                              <li>
                                                {Name}{" "}
                                                <span className="font-primary first_name_0">
                                                  {selectedContact.firstName}{" "}
                                                  {selectedContact.lastName}
                                                </span>
                                              </li>
                                              <li>
                                                {Virksomhed}{" "}
                                                <span className="font-primary first_name_0">
                                                  {selectedContact.virksomhed}
                                                </span>
                                              </li>
                                              <li>
                                                {Mobile}
                                                <span className="font-primary mobile_num_0">
                                                  {selectedContact.phone}
                                                </span>
                                              </li>
                                              <li>
                                                {EmailAddress}{" "}
                                                <span className="font-primary email_add_0">
                                                  {selectedContact.email}{" "}
                                                </span>
                                              </li>
                                              <li>
                                                {CVR}{" "}
                                                <span className="font-primary email_add_0">
                                                  {selectedContact.cvrnr}{" "}
                                                </span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      ) : (
                                        <Col sm="12">
                                          <div>
                                            <div className="search-not-found text-center">
                                              <div>
                                                <img
                                                  src={search}
                                                  alt=""
                                                  className="second-search"
                                                />
                                                <p className="mb-0">
                                                  {
                                                    "Sorry, Not Found Any Contact"
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                      )}
                                    </TabPane>
                                  </TabContent>
                                )}
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </TabPane>
                      <TabPane tabId="2">
                        <Card className="mb-0">
                          <CardHeader className="d-flex">
                            <h5>{selectedList}</h5>
                          </CardHeader>
                          <CardBody className="p-0">
                            <Row className="list-persons" id="addcon">
                              <Col xl="4 xl-50" md="5">
                                <Nav className="flex-column nav-pills">
                                  {diverseKontakter.length > 0 ? (
                                    diverseKontakter.map((sponsor, index) => {
                                      return (
                                        <NavLink
                                          className={
                                            dynamictab === index ? "active" : ""
                                          }
                                          onClick={() => setDynamicTab(index)}
                                          key={index}
                                        >
                                          <div
                                            className="media"
                                            onClick={() =>
                                              ContactDetails(sponsor)
                                            }
                                          >
                                            <div className="media-body">
                                              <h6>
                                                <span className="first_name_0">
                                                  {sponsor.name}
                                                </span>
                                              </h6>
                                              <span className="first_name_0">
                                                {sponsor.virksomhed}
                                              </span>
                                              <p className="email_add_0">
                                                {sponsor.email}
                                              </p>
                                            </div>
                                          </div>
                                        </NavLink>
                                      );
                                    })
                                  ) : (
                                    <Col sm="12">
                                      <div>
                                        <div className="search-not-found text-center">
                                          <div>
                                            <img
                                              src={search}
                                              alt=""
                                              className="second-search"
                                            />
                                            <p className="mb-0">
                                              {"Sorry, Not Found Any Contact"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                  )}
                                </Nav>
                              </Col>
                              <Col xl="8 xl-50" md="7">
                                {editing ? (
                                  <div className="contact-editform pl-0 m-auto">
                                    <Form>
                                      <FormGroup className="col-md-12">
                                        <Row>
                                          <Col sm="6">
                                            <label>{FirstName}</label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="firstname"
                                              value={editdata.firstName}
                                              onChange={(e) =>
                                                setEditData({
                                                  firstName: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.name &&
                                                "Venligst indsæt et fornavn"}
                                            </span>
                                          </Col>

                                          <Col sm="6">
                                            <label>{LastName}</label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="lastname"
                                              value={editdata.lastName}
                                              onChange={(e) =>
                                                setEditData({
                                                  lastName: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.name &&
                                                "Venligst indsæt et efternavn"}
                                            </span>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col sm="8">
                                            <Label>{Virksomhed}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="virksomhed"
                                              value={editdata.virksomhed}
                                              onChange={(e) =>
                                                setEditData({
                                                  virksomhed: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.virksomhed &&
                                                "Venligst indsæt et firmanavn"}
                                            </span>
                                          </Col>
                                          <Col sm="4">
                                            <Label>{CVR}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="cvrnr"
                                              value={editdata.cvrnr}
                                              onChange={(e) =>
                                                setEditData({
                                                  cvrnr: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.cvrnr &&
                                                "Venligst indsæt et gyldigt CVRnr."}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="8">
                                            <Label>{Email}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="email"
                                              value={editdata.email}
                                              onChange={(e) =>
                                                setEditData({
                                                  email: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.email &&
                                                "Venligst indsæt en gyldig email adresse"}
                                            </span>
                                          </Col>
                                          <Col sm="4">
                                            <Label>{Mobile}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="mobile"
                                              value={editdata.phone}
                                              onChange={(e) =>
                                                setEditData({
                                                  phone: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                pattern: /\d+/,
                                                minlength: 0,
                                                maxlength: 11,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.phone &&
                                                "Venligst indsæt et gyldigt telefon nummer"}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="12">
                                            <Label>{Adresse}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="email"
                                              value={editdata.adresse}
                                              onChange={(e) =>
                                                setEditData({
                                                  adresse: e.target.value,
                                                })
                                              }
                                            />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col sm="8">
                                            <Label>{City}</Label>
                                            <Input
                                              className="form-control"
                                              type="text"
                                              name="city"
                                              value={editdata.city}
                                              onChange={(e) =>
                                                setEditData({
                                                  city: e.target.value,
                                                })
                                              }
                                            />
                                          </Col>
                                          <Col sm="4">
                                            <Label>{PostalCode}</Label>
                                            <Input
                                              className="form-control"
                                              type="number"
                                              name="postnr"
                                              value={editdata.postnr}
                                              onChange={(e) =>
                                                setEditData({
                                                  postnr: e.target.value,
                                                })
                                              }
                                              innerRef={register({
                                                required: true,
                                              })}
                                            />
                                            <span style={{ color: "red" }}>
                                              {errors.postnr &&
                                                "Venligst indsæt et gyldigt postnummer"}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Button
                                          color="secondary"
                                          className="update-contact mr-1"
                                          onClick={UpdateContact}
                                        >
                                          {Save}
                                        </Button>
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            setEditing(false);
                                            setEditData("");
                                          }}
                                        >
                                          {Cancel}
                                        </Button>
                                      </FormGroup>
                                    </Form>
                                  </div>
                                ) : (
                                  <TabContent activeTab={dynamictab}>
                                    <TabPane tabId={dynamictab}>
                                      {selectedContact ? (
                                        <div className="profile-mail">
                                          <div className="media">
                                            <div className="media-body mt-0">
                                              <h5 className="first_name_0">
                                                {selectedContact.virksomhed}
                                              </h5>
                                              <p>
                                                <span className="first_name_0">
                                                  {selectedContact.firstName}
                                                </span>{" "}
                                                <span className="last_name_0">
                                                  {selectedContact.lastName}
                                                </span>
                                              </p>

                                              <ul>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() =>
                                                      EditUSers(selectedContact)
                                                    }
                                                  >
                                                    {Edit}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() =>
                                                      deleteContact(
                                                        selectedContact.id
                                                      )
                                                    }
                                                  >
                                                    {Delete}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#javaScript"
                                                    onClick={() => history()}
                                                  >
                                                    {History}
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="email-general">
                                            <h6 className="mb-3">
                                              Informationer
                                            </h6>
                                            <ul>
                                              <li>
                                                {Name}{" "}
                                                <span className="font-primary first_name_0">
                                                  {selectedContact.firstName}{" "}
                                                  {selectedContact.lastName}
                                                </span>
                                              </li>
                                              <li>
                                                {Virksomhed}{" "}
                                                <span className="font-primary first_name_0">
                                                  {selectedContact.virksomhed}
                                                </span>
                                              </li>
                                              <li>
                                                {Mobile}
                                                <span className="font-primary mobile_num_0">
                                                  {selectedContact.phone}
                                                </span>
                                              </li>
                                              <li>
                                                {EmailAddress}{" "}
                                                <span className="font-primary email_add_0">
                                                  {selectedContact.email}{" "}
                                                </span>
                                              </li>
                                              <li>
                                                {CVR}{" "}
                                                <span className="font-primary email_add_0">
                                                  {selectedContact.cvrnr}{" "}
                                                </span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      ) : (
                                        <Col sm="12">
                                          <div>
                                            <div className="search-not-found text-center">
                                              <div>
                                                <img
                                                  src={search}
                                                  alt=""
                                                  className="second-search"
                                                />
                                                <p className="mb-0">
                                                  {
                                                    "Sorry, Not Found Any Contact"
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                      )}
                                    </TabPane>
                                  </TabContent>
                                )}
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </TabPane>

                      <div id="right-history" className="history">
                        <div className="modal-header p-l-20 p-r-20">
                          <h6 className="modal-title w-100">
                            {ContactHistory}
                            <span className="pull-right">
                              <a
                                className="closehistory"
                                href="#javaScript"
                                onClick={closehistory}
                              >
                                <i className="icofont icofont-close"></i>
                              </a>
                            </span>
                          </h6>
                        </div>
                        <div className="history-details">
                          <div className="text-center">
                            <i className="icofont icofont-ui-edit"></i>
                            <p>{"Der er ingen historik for denne sponsor."}</p>
                          </div>
                          <div className="media">
                            <i className="icofont icofont-star mr-3"></i>
                            <div className="media-body mt-0">
                              <h6 className="mt-0">{ContactCreated}</h6>
                              <p className="mb-0">
                                {"Sponsor oprettet via platform"}
                              </p>
                              <span className="f-12">
                                {"Sep 10, 2019 4:00"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal isOpen={printmodal} toggle={printModalToggle}>
                        <ModalHeader toggle={printModalToggle}>
                          {PrintViews}
                        </ModalHeader>
                        <ModalBody className="list-persons">
                          <PrintPreview
                            selectedContact={selectedContact}
                            ref={componentRef}
                          />
                          <ReactToPrint
                            trigger={() => (
                              <Button color="secondary" className="mr-1">
                                {Print}
                              </Button>
                            )}
                            content={() => componentRef.current}
                          />
                          <Button color="primary" onClick={printModalToggle}>
                            {Cancel}
                          </Button>
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
};
export default Newcontact;
