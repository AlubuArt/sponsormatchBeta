import React, { Fragment, useState, useEffect, useReducer } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {  dbRef } from '../../../data/config';
import {
  UsersTableTitle,
  UsersTableHeader,
  
  Edit,
  Delete,
  SeSponsorat
} from "../../../constant";

const Sponsorater = () => {

  const [currentUser] = useState(localStorage.getItem('userID'))
  const [sponsors, setSponsors] = useReducer((value, newValue) => ({...value, ...newValue}), {

  })

useEffect(() => {
  try {
 
      dbRef.ref('/sponsormatchUsers/' + currentUser+ '/sponsorer' ).once('value', snapshot => {
        const value = snapshot.val();
        setSponsors(value)
      })
  } catch (error) {
    alert(error)
  }

}, [currentUser])


  
  return (
    <Fragment>
      <Breadcrumb title="Vores Sponsorater" parent="Sponsorer" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">{UsersTableTitle}</h4>
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
              <div className="table-responsive">
                <table className="table card-table table-vcenter text-nowrap">
                  <thead>
                    <tr>
                      {UsersTableHeader.map((items, i) => (
                        <th key={i}>{items}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {Object.values(sponsors).map((sponsorer, i) => (
                        <tr key={i}>
                          { 
                            
                            Object.values(sponsorer).map((items, i) => (
                            <td key={i}>{Object.values(items)}</td>
                            ))
                          }
                          <td className="text-right">
                            <button
                              className="btn btn-primary btn-sm"
                              href="javascript"
                            >
                              <i className="fa fa-pencil"></i> {Edit}
                            </button>
                            <button
                              className="btn btn-transparent btn-sm"
                              href="javascript"
                            >
                              <i className="fa fa-link"></i> {SeSponsorat}
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              href="javascript"
                            >
                              <i className="fa fa-trash"></i> {Delete}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                    {/* når der skal bruges data fra databasen, skal dataen laves om til en liste. lav en liste. Brug Object.values()og list.push() til at lave listen */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sponsorater;
