import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";


const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Loged in");
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setTimeout(() => {
                    navigate("/profile")
                }, 4000)
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "unable to Login a user");
        }
    }

    return (
      <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, rgba(0, 128, 255, 0.7), rgba(0, 255, 128, 0.6))",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h2 className="text-center text-primary mb-4">Login</h2>
        {message && <p className="text-danger text-center">{message}</p>}
     
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email: </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                    </div>
               <div className="mb-3">   
                <label htmlFor="password" className="form-label">Password: </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required />
</div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                    
                    <p className="text-center">
                        Don't have an account? {""} <a href="/register" className="text-decoration-none text-success">Register</a>
                    </p>
            </form>
        </div>
        </div>
    );
};

export default Login;