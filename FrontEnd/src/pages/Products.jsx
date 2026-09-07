import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { deleteProduct, getCategories, getProducts } from "../services/productService";

export default function Products() {
  const [products,setProducts]=useState([]); const [categories,setCategories]=useState([]);
  const [search,setSearch]=useState(""); const [category,setCategory]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(true);
  const [params]=useSearchParams();
  useEffect(()=>{Promise.all([getProducts(),getCategories()]).then(([p,c])=>{setProducts(Array.isArray(p)?p:[]);setCategories(Array.isArray(c)?c:[]);}).catch(e=>setError(e.response?.data?.message||"Unable to load products.")).finally(()=>setLoading(false));},[]);
  const filtered=useMemo(()=>products.filter(p=>{
    const q=search.toLowerCase().trim();
    const matchesSearch=!q||String(p.name||"").toLowerCase().includes(q)||String(p.sku||"").toLowerCase().includes(q);
    const cid=typeof p.category==="object"?p.category?.id:p.categoryId;
    const matchesCat=!category||String(cid)===String(category);
    const low=!params.get("low")||Number(p.quantity)<=5;
    return matchesSearch&&matchesCat&&low;
  }),[products,search,category,params]);
  const remove=async id=>{
    if(!window.confirm("Delete this product? This action cannot be undone."))return;
    try{await deleteProduct(id);setProducts(products.filter(p=>p.id!==id));}catch(e){alert(e.response?.data?.message||"Delete failed.");}
  };
  const catName=p=>p.category?.name||p.categoryName||categories.find(c=>String(c.id)===String(p.categoryId))?.name||"-";
  return <Layout>
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div><h2 className="fw-bold mb-1">Products</h2><p className="text-muted mb-0">Search, filter, edit and delete inventory products.</p></div>
      <Link to="/products/new" className="btn btn-primary"><i className="bi bi-plus-lg me-1"></i>Add Product</Link>
    </div>
    {error&&<div className="alert alert-danger">{error}</div>}
    <div className="card border-0 shadow-sm mb-3"><div className="card-body"><div className="row g-2">
      <div className="col-12 col-lg-7"><div className="input-group"><span className="input-group-text"><i className="bi bi-search"></i></span><input className="form-control" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by product name or SKU e.g. WOOD-001"/></div></div>
      <div className="col-12 col-lg-3"><select className="form-select" value={category} onChange={e=>setCategory(e.target.value)}><option value="">All Categories</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      <div className="col-12 col-lg-2"><button className="btn btn-light border w-100" onClick={()=>{setSearch("");setCategory("");}}>Clear</button></div>
    </div></div></div>
    <div className="card border-0 shadow-sm"><div className="card-body p-0">
      {loading?<div className="text-center py-5"><div className="spinner-border"></div></div>:filtered.length===0?<div className="empty-state py-5"><i className="bi bi-box-seam fs-1 d-block mb-2"></i>No products found.</div>:
      <div className="table-responsive"><table className="table table-hover align-middle mb-0"><thead><tr><th className="ps-3">Product</th><th>SKU</th><th>Category</th><th>Price</th><th>Qty</th><th>Status</th><th className="text-end pe-3">Actions</th></tr></thead>
      <tbody>{filtered.map(p=><tr key={p.id}><td className="ps-3 fw-semibold">{p.name}</td><td><span className="sku-badge">{p.sku}</span></td><td>{catName(p)}</td><td>₹{Number(p.price||0).toFixed(2)}</td><td>{p.quantity}</td><td>{Number(p.quantity)<=5?<span className="badge text-bg-warning">Low Stock</span>:<span className="badge text-bg-success">In Stock</span>}</td><td className="text-end pe-3"><Link to={`/products/edit/${p.id}`} className="btn btn-sm btn-outline-primary me-2" title="Edit"><i className="bi bi-pencil"></i></Link><button className="btn btn-sm btn-outline-danger" onClick={()=>remove(p.id)} title="Delete"><i className="bi bi-trash"></i></button></td></tr>)}</tbody></table></div>}
    </div></div>
  </Layout>;
}
