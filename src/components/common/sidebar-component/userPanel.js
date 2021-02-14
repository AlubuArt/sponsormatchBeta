import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';

const UserPanel = (props) => {
    
    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-100 rounded-circle lazyloaded blur-up" src={props.logo} alt="#" />
                    <div className="profile-edit">
                        <Link to={`${process.env.PUBLIC_URL}/users`}>
                            <Edit />
                        </Link>
                    </div>
                </div>
                <h6 className="mt-3 f-14">{props.foreningName}</h6>
                
            </div>
        </Fragment>
    );
};

export default UserPanel;