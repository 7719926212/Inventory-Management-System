import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { createProduct, getCategories, getProduct, updateProduct } from "../services/productService";

const initial={name:"",sku:"",price:"",quantity:"",categoryId:""};

export default function ProductForm(){
  const {id}=useParams(); const edit=Boolean(id); const nav=useNavigate();
  const [form,setForm]=useState(initial); const [categories,setCategories]=useState([]); const [error,setError]=useState(""); const [loading,setLoading]=useState(edit); const [saving,setSaving]=useState(false);
  useEffect(()=>{getCategories().then(c=>setCategories(Array.isArray(c)?c:[])); if(edit)getProduct(id).then(p=>setForm({name:p.name||"",sku:p.sku||"",price:p.price??"",quantity:p.quantity??"",categoryId:p.category?.id??p.categoryId??""})).catch(e=>setError(e.response?.data?.message||"Product not found.")).finally(()=>setLoading(false));},[id,edit]);
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{
    e.preventDefault();setError("");
    if(!form.name||!form.sku||form.price===""||form.quantity===""||!form.categoryId)return setError("Please fill all required fields.");
    if(Number(form.price)<0||Number(form.quantity)<0)return setError("Price and quantity cannot be negative.");
    const payload={name:form.name.trim(),sku:form.sku.trim().toUpperCase(),price:Number(form.price),quantity:Number(form.quantity),categoryId:Number(form.categoryId)};
    try{setSaving(true);if(edit)await updateProduct(id,payload);else await createProduct(payload);nav("/products");}catch(e){setError(e.response?.data?.message||"Unable to save product.");}finally{setSaving(false);}
  };
  return <Layout><div className="row justify-content-center"><div className="col-12 col-xl-8">
    <div className="d-flex justify-content-between align-items-center mb-4"><div><h2 className="fw-bold mb-1">{edit?"Edit Product":"Add Product"}</h2><p className="text-muted mb-0">Maintain accurate inventory information.</p></div><Link to="/products" className="btn btn-light border">Back</Link></div>
    <div className="card border-0 shadow-sm"><div className="card-body p-4">
      {error&&<div className="alert alert-danger">{error}</div>}{loading?<div className="text-center py-5"><div className="spinner-border"></div></div>:<form onSubmit={submit}>
      <div className="row g-3"><div className="col-md-6"><label className="form-label">Product Name *</label><input name="name" className="form-control" value={form.name} onChange={change} placeholder="Wooden Chair"/></div>
      <div className="col-md-6"><label className="form-label">SKU *</label><input name="sku" className="form-control text-uppercase" value={form.sku} onChange={change} placeholder="WOOD-001"/><div className="form-text">Use a unique SKU such as WOOD-001.</div></div>
      <div className="col-md-6"><label className="form-label">Price *</label><input name="price" type="number" min="0" step="0.01" className="form-control" value={form.price} onChange={change}/></div>
      <div className="col-md-6"><label className="form-label">Quantity *</label><input name="quantity" type="number" min="0" className="form-control" value={form.quantity} onChange={change}/></div>
      <div className="col-12"><label className="form-label">Category *</label><select name="categoryId" className="form-select" value={form.categoryId} onChange={change}><option value="">Select category</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      </div><div className="d-flex justify-content-end gap-2 mt-4"><Link to="/products" className="btn btn-light border">Cancel</Link><button className="btn btn-primary" disabled={saving}>{saving?(edit?"Updating...":"Creating..."):(edit?"Update Product":"Create Product")}</button></div>
      </form>}</div></div>
  </div></div></Layout>;
}
