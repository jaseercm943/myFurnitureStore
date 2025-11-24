import React, { useEffect, useState } from "react";
import { getAllUsersAPI } from "../services/allApi";

function UsersList() {
    const [allUsers, setAllUsers] = useState([]);
    console.log(allUsers);

    useEffect(() => {
        GetAllUsers();
    }, []);

    const GetAllUsers = async () => {
        try {
            const result = await getAllUsersAPI();
            setAllUsers(result.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
           
            {allUsers?.length > 0 ? (
                <div className="" style={{width:'1500px',marginLeft:'150px'}}>
                     <h1 className="fw-bold">USERS LIST : <span className="text-primary gallery_font">{allUsers?.length}&nbsp;</span>members</h1>
                     <table className="table border">
                    <thead>
                        <tr className="fw-bold">
                            <th>Sl.no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUsers?.map((users,index) => (
                            <tr className="fw-bold"style={{color:'green'}}>
                                <td>{index+1}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>{users.phonenumber}</td>
                                <td>{users.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
               
            ) : (
                <h1 style={{ color: "red" }}>No Users Registered!</h1>
            )}
        </div>
    );
}

export default UsersList;
