import React, { Component} from "react";
import "./Home.css";
import { Link , withRouter } from "react-router-dom";
import ProfilePic1 from '../../assets/profile-images/Ellipse -1.png'
import ProfilePic2 from '../../assets/profile-images/Ellipse -2.png';
import ProfilePic3 from '../../assets/profile-images/Ellipse -3.png';
import ProfilePic8 from '../../assets/profile-images/Ellipse -8.png';
import EmployeeService from "../../service/EmployeeService";
import Edit from "../../assets/icons/edit.svg";
import Delete from "../../assets/icons/delete-black-18dp.svg";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee: [],
        };
    }

    fetchData() {
        EmployeeService.getAllEmployees().then((response) => {
            this.setState({ employee: response.data.data });
        });
    }

    deleteEmployee(employeeId) {
        let id = parseInt(employeeId)
        EmployeeService.deleteEmployee(id);
        window.location.reload();
    }

    updateEmployee = (employeeId) => {
        console.log(employeeId)
        this.props.history.push(`EmployeeForm/${ employeeId}`)
    };

    componentDidMount() {
        this.fetchData();
        console.log(this.props)
    }


    render() {
        return (
            <div>
                <div>
                    <div className="main-content">
                        <div className="header-content employee-header">
                            <div className="emp-detail-text">
                                Employee Details
                                <div className="emp-count">{this.state.employee.length}</div>
                            </div>
                            <Link to="/employee" className="add-button">    
                                <img src="{}" alt="" />+ Add User</Link>
                        </div>
                    </div>
                    <div className="table-main">
                        <table id="table-display" className="table">
                            <thead>
                                <tr>
                                    <th>Profile Image</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Start Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.employee.map((employee, index) => (
                                    <tr key={`${index}`}>
                                        <td>
                                            <img src={employee.profilePic === "../../assets/profile-images/Ellipse -3.png" ? ProfilePic3 :
                                                employee.profilePic === "../../assets/profile-images/Ellipse -1.png" ? ProfilePic1 :
                                                    employee.profilePic === "../../assets/profile-images/Ellipse -2.png" ? ProfilePic2 : ProfilePic8
                                            } alt="ProfilePic" srcSet="" /></td>
                                        <td>{employee.fname}</td>
                                        <td>{employee.gender}</td>
                                        <td>
                                            {employee.department.map(dep =>
                                                <div className="dept-label" id="dept"> {dep} </div>)}
                                        </td>
                                        <td>{employee.salary}</td>
                                        <td>{employee.startDate}</td>
                                        <td>
                            <img src={Delete} alt="delete" onClick={() =>
                                                     this.deleteEmployee(employee.id)}/>


                            <img
                                                name={employee.id}
                                                src={Edit}
                                                alt="Edit"
                                                onClick={() => {
                                                    this.updateEmployee(employee.id)
                                                }
                                                }
                                            />
                            </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Home);
