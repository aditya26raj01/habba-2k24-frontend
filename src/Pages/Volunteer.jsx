import { useState } from "react";
import { colleges } from "../resources/colleges";
import { renderDepartments } from "../resources/departments";
import { preferences } from "../resources/preferences";
import { years } from "../resources/year";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

const Volunteer = () => {
    const [captchaRef, setCaptchaRef] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ college: null, captcha: null, pref1: null, pref2: null });
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.captcha === null){
            toast.error("Please Complete the Captcha!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/register-volunteer",
                formData
            );
            setLoading(false);
            captchaRef.reset();
            setFormData({...formData, captcha : null});
            toast.success(response.data.message);
        } catch (error) {
            setLoading(false);
            captchaRef.reset();
            setFormData({...formData, captcha : null});
            toast.error(error.response ? error.response.data.message : "Some Error Occured, Try Again After Some Time!");
        }
    }
    return (
        <div className="volunteer-wrapper">
            <div className="volunteer">
                <div className="left">
                    <div className="logo">
                        <img src="./Assets/image/HabbaLogo.png" alt="" width="100px" height="100px" />
                        <div className="year">2024</div>
                    </div>
                    <h2>Welcome!</h2>
                    <div>
                        Please enter the following details <br />to register for <br />Acharya Habba-2024
                    </div>
                </div>
                <div className="right">
                    <h2>Habba 2024 Volunteer Registration</h2>
                    <form className="right-inner" onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                name="email"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Name"
                                name="name"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            />
                            <input
                                required
                                type="text"
                                placeholder="AUID"
                                name="auid"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            />
                            <select
                                required
                                placeholder="College"
                                name="college"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            >
                                <option selected defaultValue="">Choose Your Institute</option>
                                {colleges.map((college, index) => {
                                    return <option key={index} value={college.value}>{college.college}</option>
                                })}
                            </select>
                            <select
                                required
                                placeholder="Department"
                                id="department"
                                name="department"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            >
                                <option selected defaultValue="">Choose Your Department</option>
                                {formData.college && renderDepartments(formData.college).map((department, index) => {
                                    return <option key={index} value={department.value}>{department.department}</option>
                                })}
                            </select>
                            <select
                                required
                                placeholder="Preference 1"
                                name="pref1"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            >
                                <option selected disabled defaultValue="">Team preferences 1</option>
                                {preferences.map((preference, index) => {
                                    return <option key={index}
                                        disabled={formData.pref2 === preference.value}
                                        value={preference.value}>{preference.preference}</option>
                                })}
                            </select>
                            <select
                                required
                                placeholder="Preference 2"
                                name="pref2"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            >
                                <option selected disabled defaultValue="">Team preferences 2</option>
                                {preferences.map((preference, index) => {
                                    return <option key={index}
                                        disabled={formData.pref1 === preference.value}
                                        value={preference.value}>{preference.preference}</option>
                                })}
                            </select>
                            <select
                                required
                                placeholder="Year of Study"
                                name="year"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            >
                                <option selected defaultValue="">Year Of Study</option>
                                {years.map((year, index) => {
                                    return <option key={index} value={year.value}>{year.year}</option>
                                })}
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <input
                                required
                                type="text"
                                placeholder="Date of Birth"
                                name="dob"
                                autoComplete="off"
                                id="dob"
                                onClick={() => {
                                    document.getElementById("dob").type = "date";
                                }}
                                onChange={(e) => handleInput(e)}
                            />
                            <input
                                required
                                type="number"
                                placeholder="WhatsApp Number"
                                name="whatsapp"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            />
                            <input
                                required
                                type="number"
                                placeholder="Contact Number"
                                name="call"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Past Experience in Habba"
                                name="exp"
                                autoComplete="off"
                                onChange={(e) => handleInput(e)}
                            />
                            <textarea
                                required
                                rows="6"
                                type="text"
                                placeholder="Why Do you Want to join Habba?"
                                name="reason"
                                onChange={(e) => handleInput(e)}
                            />
                            <div onChange={(e) => handleInput(e)} className="gender">
                                <input type="radio" value="male" name="gender" id="male" />
                                <label htmlFor="male">Male</label>&nbsp;&nbsp;
                                <input type="radio" value="female" name="gender" id="female" />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div className="captcha">
                            <ReCAPTCHA
                                ref={(r) => setCaptchaRef(r)}
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                onVerify={() => {
                                    console.log("hi");
                                }}
                                onChange={(value) => {
                                    setFormData({ ...formData, captcha: value });
                                }}
                            />
                        </div>
                        {formData.captcha && (!loading ? <button type="submit">Register</button> :
                            <div className="spinner">
                                <CircularProgress />
                            </div>)
                        }
                    </form>
                    <div className="help">For any Queries Contact Us on : <a href="mailto:acharyahabba@acharya.ac.in">acharyahabba@acharya.ac.in</a></div>
                </div>
            </div>
        </div>
    )
}

export default Volunteer;