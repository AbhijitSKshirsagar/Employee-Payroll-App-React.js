import React, { useState, useEffect } from 'react'
import './EmployeeForm.css'
import profile3 from '../../assets/profile-images/Ellipse -3.png'
import profile1 from '../../assets/profile-images/Ellipse -1.png'
import profile7 from '../../assets/profile-images/Ellipse -7.png'
import profile8 from '../../assets/profile-images/Ellipse -8.png'
import { Link, useParams } from "react-router-dom"
import Service from '../../service/EmployeeService'

function EmployeeForm() {
    const allDepartment = ["HR", "Sales", "Finance", "Engineer", "Others"]
    const params = useParams();
    useEffect(() => {
        console.log(params.id)
        getDataById(params.id)
    }, [params.id]);

    const [formValue, setForm] = useState({
        fName: "",
        profilePic: "",
        gender: "",
        department: [],
        salary: "",
        startDate: "",
        note: "",
        isUpdate: false,
    });

    const getDataById = (id) => {
        console.log(id);
        Service.getById(id).then((data) => {
            console.log(data);
            let obj = data.data.data
            console.log(obj)
            setData(obj)
        });
    };


    const setData = (obj) => {
        let array = obj.startDate;
        console.log(array);
        console.log(obj)
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            fname: obj.fname,
            department: obj.department,
            isUpdate: true,
            day: array[8] + array[9],
            month: array[5] + array[6],
            year: array[0] + array[1] + array[2] + array[3],
            note: obj.note,
        });
    };


    const onCheckChange = (fName) => {
        let index = formValue.department.indexOf(fName);

        let checkArray = [...formValue.department];

        if (index > -1) checkArray.splice(index, 1);
        else checkArray.push(fName);

        setForm({ ...formValue, department: checkArray });

    };
    const checkDepartment = (name) => {
        return formValue.department && formValue.department.includes(name);
    }
    const onReset = () => {
        setForm({
            fName: "",
            profilePic: "",
            gender: "",
            department: [],
            salary: "",
            startDate: "",
            note: ""
        });
    };
    const onSubmit = (event) => {
        event.preventDefault();

        let employeeObject = {
            fName: formValue.fName,
            department: formValue.department,
            gender: formValue.gender,
            salary: formValue.salary,
            profilePic: formValue.profilePic,
            startDate: `${formValue.year}-${formValue.month}-${formValue.day}`,
            note: formValue.note
        };

        if (formValue.isUpdate) {
            Service.updateEmployee(params.id, employeeObject)
                .then((data) => {
                    var value = window.confirm(data);
                    if (value === true) {
                        alert("update successfull!");
                    } else {
                        window.location.reload();
                    }
                });
        } else {
            Service.addEmployee(employeeObject).then((response) => {
                console.log(response);
                alert("Data Added Successfully ", response);
            })
        }
    }
    // localStorage.setItem('EmployeeList', JSON.stringify(employeeObject));
    // console.log(employeeObject);
    // alert(`Employee ${formValue.name} has been added`)


    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }

    return (

        <div>

            <div className="form-content">
                <form className="form" action="#" onReset="resetForm()"
                    onSubmit={onSubmit}>
                    <div className="form-head">
                        Employee Payroll form
                    </div>
                    <div className="row-content">
                        <label htmlFor="fName" className="label text">Name</label>
                        <input type="text" className="input" id="fName" name="fName" value={formValue.fName}
                            placeholder="Your name.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="fName"></error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profilePic"
                                    checked={formValue.profilePic === '../../assets/profile-images/Ellipse -3.png'}
                                    value="../../assets/profile-images/Ellipse -3.png" onChange={onNameChange} />
                                <img className="profile" id="image1"
                                    src={profile3} />
                            </label>
                            <label>
                                <input type="radio" id="profile2"
                                    name="profilePic"
                                    checked={formValue.profilePic === '../../assets/profile-images/Ellipse -1.png'}
                                    value="../../assets/profile-images/Ellipse -1.png" onChange={onNameChange} />
                                <img className="profile" id="image2"
                                    src={profile1} />
                            </label>
                            <label>
                                <input type="radio" id="profil3"
                                    name="profilePic"
                                    checked={formValue.profilePic === '../../assets/profile-images/Ellipse -7.png'}
                                    value="../../assets/profile-images/Ellipse -7.png" onChange={onNameChange} />
                                <img className="profile" id="image3"
                                    src={profile7} />
                            </label>
                            <label>
                                <input type="radio" id="profile4"
                                    name="profilePic"
                                    checked={formValue.profilePic === '../../assets/profile-images/Ellipse -8.png'}
                                    value="../../assets/profile-images/Ellipse -8.png" onChange={onNameChange} />
                                <img className="profile" id="image4"
                                    src={profile8} />
                            </label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label htmlFor="gender" className="label text">Gender</label>
                        <div>
                            <input type="radio" id="male" name="gender"
                                checked={formValue.gender === 'male'}
                                value="male" onChange={onNameChange} />
                            <label htmlFor="male" className="text">Male</label>
                            <input type="radio" id="female" name="gender"
                                checked={formValue.gender === 'female'}
                                value="female" onChange={onNameChange} />
                            <label htmlFor="female" className="text">Female</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">
                            Department
                        </label>
                        <div className="label-dep">
                            {allDepartment.map((item) => (
                                <span key={item}>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        checked={checkDepartment(item)}
                                        onChange={() => onCheckChange(item)}
                                        value={item}
                                    />
                                    <label className="text" htmlFor={item}>
                                        {item}
                                    </label>
                                </span>
                            ))}
                        </div>
                    </div>
                    <br></br>
                    <div className="row-content">
                        <label htmlFor="salary" className="label text">Choose your salary:
                        </label>
                        <input type="range" className="input" name="salary" id="salary"
                            min="300000" max="500000" step="100" value={formValue.salary} defaultValue="0" onChange={onNameChange} />
                        <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select id="day" name="day" value={formValue.day}
                                onChange={onNameChange}>
                                <option value="">Day</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select name="month" id="month" value={formValue.month}
                                onChange={onNameChange}>
                                <option value="" >Month</option>
                                <option value="01">January</option>
                                <option value="02">Febuary</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select name="year" id="year" value={formValue.year} onChange={onNameChange}>
                                <option value="" >Year</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-content">
                        <label htmlFor="notes" className="label text">Notes</label>
                        <textarea id="note" className="input" name="note"
                            value={formValue.note} placeholder="" onChange={onNameChange}></textarea>
                    </div>
                    <div className="buttonParent">
                        <Link to="/home" className="resetButton
                        button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" className="button resetButton" id="resetButton" onClick={onReset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EmployeeForm;