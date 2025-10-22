import React from "react";
import { useSelector } from "react-redux";

const CompanyLocation = ({ companyId }) => {
  const companyList = useSelector((state) => state.employeeDetail.company);

  // Find company info by companyId
  const company = companyList.find((c) => c.companyId === companyId);

  if (!company) return <p className="text-gray-500">Location not available</p>;

  return (
    <p className="text-sm text-gray-700">
      📍 {company.city}, {company.state}, {company.country}
    </p>
  );
};

export default CompanyLocation;
