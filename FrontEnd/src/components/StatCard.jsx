import React from "react";

export default function StatCard({ icon, title, value, text }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="card stat-card h-100 border-0">
        <div className="card-body d-flex align-items-center">
          <div className="stat-icon"><i className={`bi ${icon}`}></i></div>
          <div>
            <div className="text-secondary small">{title}</div>
            <div className="fs-3 fw-bold">{value}</div>
            {text && <div className="small text-muted">{text}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
