import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { createCategory, getCategories } from "../services/productService";

export default function Categories(){
  const [categories,setCategories]=useState([]); const [name,setName]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(true);
  const load=()=>getCategories().then(c=>setCategories(Array.isArray(c)?c:[])).catch(e=>setError(e.response?.data?.message||"Unable to load categories.")).finally(()=>setLoading(false));
  useEffect(load,[]);
  const add=async e=>{e.preventDefault();setError("");if(!name.trim())return setError("Category name is required.");try{const c=await createCategory({name:name.trim()});setCategories([...categories,c]);setName("");}catch(e){setError(e.response?.data?.message||"Unable to create category.");}};
  return <Layout><div className="d-flex justify-content-between align-items-center mb-4"><div><h2 className="fw-bold mb-1">Categories</h2><p className="text-muted mb-0">Create and select product categories.</p></div></div>
  <div className="row g-4"><div className="col-12 col-lg-5"><div className="card border-0 shadow-sm"><div className="card-body"><h5 className="fw-bold">Add Category</h5>{error&&<div className="alert alert-danger">{error}</div>}<form onSubmit={add} className="d-flex gap-2 mt-3"><input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Electronics"/><button className="btn btn-primary">Add</button></form></div></div></div>
  <div className="col-12 col-lg-7"><div className="card border-0 shadow-sm"><div className="card-body"><h5 className="fw-bold mb-3">Available Categories</h5>{loading?<div className="spinner-border"></div>:categories.length===0?<div className="empty-state">No categories yet.</div>:<div className="row g-2">{categories.map(c=><div className="col-12 col-sm-6" key={c.id}><div className="category-chip"><i className="bi bi-tag me-2"></i>{c.name}</div></div>)}</div>}</div></div></div></div></Layout>;
}
