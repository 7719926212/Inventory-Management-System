import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({name:"", email:"", password:"", role:"USER"});
  const [error, setError] = useState(""); const [success, setSuccess] = useState(""); const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{
    e.preventDefault(); setError(""); setSuccess("");
    if(!form.name||!form.email||!form.password) return setError("All required fields must be filled.");
    try{setLoading(true); await register(form); setSuccess("Registration successful. Redirecting to login..."); setTimeout(()=>navigate("/login"),900);}
    catch(err){setError(err.response?.data?.message||"Registration failed.");} finally{setLoading(false);}
  };
  return <div className="auth-page"><div className="auth-card card border-0 shadow-lg">
    <div className="text-center mb-4"><div className="brand-icon"><i className="bi bi-person-plus"></i></div><h2 className="fw-bold mt-3">Create Account</h2><p className="text-muted">Start managing your inventory</p></div>
    {error&&<div className="alert alert-danger">{error}</div>}{success&&<div className="alert alert-success">{success}</div>}
    <form onSubmit={submit}>
      <label className="form-label">Name</label><input name="name" className="form-control form-control-lg mb-3" value={form.name} onChange={change}/>
      <label className="form-label">Email</label><input name="email" type="email" className="form-control form-control-lg mb-3" value={form.email} onChange={change}/>
      <label className="form-label">Password</label><input name="password" type="password" className="form-control form-control-lg mb-4" value={form.password} onChange={change}/>
      <button className="btn btn-primary btn-lg w-100" disabled={loading}>{loading?"Creating...":"Register"}</button>
    </form><p className="text-center mt-4 mb-0">Already registered? <Link to="/login">Login</Link></p>
  </div></div>;
}
