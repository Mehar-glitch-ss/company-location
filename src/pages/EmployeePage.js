import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../redux/slice";
import SearchBar from "../components/SearchBar";
import EmployeeList from "../components/EmployeeList";

const EmployeePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.employeeDetail);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Employee Directory
      </h1>
      <SearchBar onSearch={setSearchTerm} />
      <EmployeeList searchTerm={searchTerm} />
    </div>
  );
};

export default EmployeePage;
