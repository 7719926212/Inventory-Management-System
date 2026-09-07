import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError("");
    if (!email || !password) return setError("Email and password are required.");
    try { setLoading(true); await login(email, password); navigate("/dashboard"); }
    catch (err) { setError(err.response?.data?.message || "Invalid email or password."); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card border-0 shadow-lg">
        <div className="text-center mb-4">
          <div className="brand-icon"><i className="bi bi-box-seam"></i></div>
          <h2 className="fw-bold mt-3">Welcome to IMS</h2>
          <p className="text-muted mb-0">Inventory Management System</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <label className="form-label">Email</label>
          <input className="form-control form-control-lg mb-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          <label className="form-label">Password</label>
          <input className="form-control form-control-lg mb-4" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <button className="btn btn-primary btn-lg w-100" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        </form>
        <p className="text-center mt-4 mb-0">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
