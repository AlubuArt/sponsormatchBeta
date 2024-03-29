import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  Sponsoransvarlig,
  Phone,
  Website,
  EditProfile,
  Forening,
  Email,
  Mobile,
  Location,
  UpdateProfile,
  FirstName,
  LastName,
  Address,
  EmailAddress,
  PostalCode,
  City,
  OmForeningen,
} from "../../constant";
import {
  uploadFileToStorage,
  getUserFromDatabase,
  updateUserDataInDatabase,
} from "../../services/editUser.service";
import Breadcrumb from "../common/breadcrumb";
import { UserContext } from "../../auth/context/userContext";

const UserProfile = () => {
  const { userID } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState();
  const [userInfo, setUserInfo] = useState({
    foreningName: "",
    fname: "",
    lname: "",
    telephonenr: "",
    adresse: "",
    city: "",
    postnr: "",
    email: "",
    clubDescription: "",
    website: "",
    logo: "",
    userProfilePicture: "",
  });

  const getUserData = async () => {
    try {
      const userData = await getUserFromDatabase(userID);
      for (let [key, val] of Object.entries(userData)) {
        setUserInfo((userInfo) => ({
          ...userInfo,
          [key]: val,
        }));
      }
    } catch {}
  };

  const inputGroupHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserData = async () => {
    try {
      const dataToupdate = userInfo;
      await updateUserDataInDatabase(userID, dataToupdate);
      getUserData();
    } catch {}
  };

  const handleClick = (e) => {
    updateUserData();
  };

  const getProfilePictureFileToUpload = () => {
    const selectedFile = document.getElementById("input").files[0];
    setProfilePicture(selectedFile);
  };

  const getClubLogoFileSelectedFileToUpload = async () => {
    const selectedFile = await document.getElementById("logo-input").files[0];
    await uploadFileToStorage(userID, selectedFile, "logo");
    const timer = setTimeout(() => {
      getUserData();
    }, 2000); /*  */
    return () => clearTimeout(timer);
  };

  const updateProfilePicture = async (e) => {
    e.preventDefault();
    await uploadFileToStorage(userID, profilePicture, "userProfilePicture");

    //would like to remove this timer
    const timer = setTimeout(() => {
      getUserData();
    }, 2000); /*  */
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getUserFromDatabase(userID);
        for (let [key, val] of Object.entries(userData)) {
          setUserInfo((userInfo) => ({
            ...userInfo,
            [key]: val,
          }));
        }
      } catch {}
    };
    getUserData();
  }, [userID]);

  return (
    <Fragment>
      <Breadcrumb title="Forenings profil" />
      <div className="container-fluid">
        <div className="user-profile">
          <div className="row">
            {/* <!-- user profile first-style start--> */}
            <div className="col-sm-12">
              <div className="card hovercard text-center">
                <div className="cardheader"></div>
                <div className="user-image ">
                  <div className="logo ">
                    <img
                      className="pro"
                      alt=""
                      src={userInfo.logo}
                      data-intro="This is Profile image"
                    />
                  </div>
                  <div className="icon-wrapper">
                    <i
                      className="icofont icofont-pencil-alt-5"
                      data-intro="Change Profile image here"
                    >
                      <input
                        id="logo-input"
                        className="pencil"
                        type="file"
                        onChange={getClubLogoFileSelectedFileToUpload}
                      />
                    </i>
                  </div>
                </div>
                <div className="info">
                  <div
                    className="row detail"
                    data-intro="This is the your details"
                  >
                    <div className="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="ttl-info text-left">
                            <h6>
                              <i className="fa fa-envelope mr-2"></i>
                              {Email}
                            </h6>
                            <span>{userInfo.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                      <div className="user-designation">
                        <div className="title">
                          <a target="_blank" href="javascript">
                            {userInfo.foreningName}
                          </a>
                        </div>
                        <div className="desc mt-2">{Sponsoransvarlig}</div>
                        <div className="sponsoransvarlig-navn">
                          {userInfo.fname} {userInfo.lname}
                        </div>
                        <div className="forening-beskrivelse">
                          <br></br>
                          <p>{userInfo.clubDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="ttl-info text-left ttl-xs-mt">
                            <h6>
                              <i className="fa fa-phone"></i>
                              {Mobile}
                            </h6>
                            <span>{userInfo.telephonenr}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="ttl-info text-left ttl-sm-mb-0">
                            <h6>
                              <i className="fa fa-location-arrow"></i>
                              {Location}
                            </h6>
                            <span>
                              {userInfo.city}, {userInfo.postnr}{" "}
                              {userInfo.adresse}
                            </span>
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
      <div className="edit-profile">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">{Sponsoransvarlig}</h4>
                <div className="card-options">
                  <a
                    className="card-options-collapse"
                    href="javascript"
                    data-toggle="card-collapse"
                  >
                    <i className="fe fe-chevron-up"></i>
                  </a>
                  <a
                    className="card-options-remove"
                    href="javascript"
                    data-toggle="card-remove"
                  >
                    <i className="fe fe-x"></i>
                  </a>
                </div>
              </div>
              <form>
                <div className="card-body">
                  <div className="row mb-2">
                    ´
                    <div className="col-auto user-image ">
                      <div className="profile-picture ">
                        <img
                          className="pro"
                          alt=""
                          src={userInfo.userProfilePicture}
                          data-intro="This is Profile image"
                        />
                      </div>
                      <div className="icon-wrapper">
                        <i
                          className="icofont icofont-pencil-alt-5"
                          data-intro="Change Profile image here"
                        >
                          <input
                            id="input"
                            className="pencil"
                            type="file"
                            onChange={getProfilePictureFileToUpload}
                          />
                          <button onClick={updateProfilePicture}>
                            Upload billede
                          </button>
                        </i>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{FirstName}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="fname"
                      value={userInfo.fname}
                      onChange={inputGroupHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{LastName}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lname"
                      value={userInfo.lname}
                      onChange={inputGroupHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{EmailAddress}</label>
                    <input
                      className="form-control"
                      name="email"
                      value={userInfo.email}
                      onChange={inputGroupHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{Phone}</label>
                    <input
                      className="form-control"
                      name="telephonenr"
                      value={userInfo.telephonenr}
                      onChange={inputGroupHandler}
                    />
                  </div>
                  <div className="form-footer">
                    <button
                      className="btn btn-primary btn-block"
                      type="button"
                      onClick={handleClick}
                    >
                      Opdatér kontakt oplysninger
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-8">
            <form className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">{EditProfile}</h4>
                <div className="card-options">
                  <a
                    className="card-options-collapse"
                    href="javascript"
                    data-toggle="card-collapse"
                  >
                    <i className="fe fe-chevron-up"></i>
                  </a>
                  <a
                    className="card-options-remove"
                    href="javascript"
                    data-toggle="card-remove"
                  >
                    <i className="fe fe-x"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="form-label">{Forening}</label>
                      <input
                        className="form-control"
                        type="text"
                        name="foreningName"
                        value={userInfo.foreningName}
                        onChange={inputGroupHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{Website}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="website"
                      value={userInfo.website}
                      onChange={inputGroupHandler}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">{Address}</label>
                      <input
                        className="form-control"
                        type="text"
                        name="adresse"
                        value={userInfo.adresse}
                        onChange={inputGroupHandler}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                      <label className="form-label">{City}</label>
                      <input
                        className="form-control"
                        type="text"
                        name="city"
                        value={userInfo.city}
                        onChange={inputGroupHandler}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <label className="form-label">{PostalCode}</label>
                      <input
                        className="form-control"
                        type="number"
                        name="postnr"
                        value={userInfo.postnr}
                        onChange={inputGroupHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <label className="form-label">{OmForeningen}</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        name="clubDescription"
                        value={userInfo.clubDescription}
                        onChange={inputGroupHandler}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-right">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleClick}
                >
                  {UpdateProfile}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
