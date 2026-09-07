import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { getProducts, getCategories } from "../services/productService";

export default function Dashboard() {
  const [products,setProducts]=useState([]); const [categories,setCategories]=useState([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{Promise.all([getProducts(),getCategories()]).then(([p,c])=>{setProducts(Array.isArray(p)?p:[]);setCategories(Array.isArray(c)?c:[]);}).finally(()=>setLoading(false));},[]);
  const low=products.filter(p=>Number(p.quantity)<=5);
  const value=products.reduce((s,p)=>s+(Number(p.price)||0)*(Number(p.quantity)||0),0);
  return <Layout>
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div><h2 className="fw-bold mb-1">Inventory Dashboard</h2><p className="text-muted mb-0">Monitor products, stock and inventory value.</p></div>
      <Link className="btn btn-primary" to="/products/new"><i className="bi bi-plus-lg me-1"></i>Add Product</Link>
    </div>
    {loading?<div className="text-center py-5"><div className="spinner-border"></div></div>:<>
    <div className="row g-3 mb-4">
      <StatCard icon="bi-boxes" title="Total Products" value={products.length}/>
      <StatCard icon="bi-tags" title="Categories" value={categories.length}/>
      <StatCard icon="bi-exclamation-triangle" title="Low Stock" value={low.length} text="Quantity ≤ 5"/>
      <StatCard icon="bi-currency-rupee" title="Inventory Value" value={`₹${value.toFixed(2)}`}/>
    </div>
    <div className="card border-0 shadow-sm"><div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-3"><h5 className="fw-bold mb-0">Low Stock Products</h5><Link to="/products?low=true" className="btn btn-sm btn-outline-primary">View All</Link></div>
      {low.length===0?<div className="empty-state">No low-stock products 🎉</div>:<div className="table-responsive"><table className="table align-middle"><thead><tr><th>Product</th><th>SKU</th><th>Quantity</th><th>Status</th></tr></thead><tbody>{low.slice(0,5).map(p=><tr key={p.id}><td>{p.name}</td><td><span className="sku-badge">{p.sku}</span></td><td>{p.quantity}</td><td><span className="badge text-bg-warning">Low Stock</span></td></tr>)}</tbody></table></div>}
    </div></div></>}
  </Layout>;
}
