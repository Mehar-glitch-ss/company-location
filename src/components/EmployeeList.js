import React from "react";
import { useSelector } from "react-redux";
import CompanyLocation from "./CompanyLocation";

const EmployeeList = ({ searchTerm }) => {
  // Ensure safe defaults from Redux
  const { people = [], company = [] } = useSelector(
    (state) => state.employeeDetail || {}
  );

  // Safe lowercasing helper function
  const safeLower = (value) =>
    typeof value === "string" ? value.toLowerCase() : "";

  const safeSearch = safeLower(searchTerm);

  // ✅ Fully safe filter
  const filteredPeople = people.filter((person) =>
    safeLower(person?.name).includes(safeSearch)
  );

  if (!searchTerm) {
    return <p className="text-center text-gray-500">Enter a name to search.</p>;
  }

  if (filteredPeople.length === 0) {
    return <p className="text-center text-gray-500">No employee found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {filteredPeople.map((person) => {
        const comp = company.find((c) => c.companyId === person.companyId);
        return (
          <div
            key={person.peopleId}
            className="border p-4 my-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-600">
              {person.name}
            </h2>
            <p className="text-gray-700">
              {person.jobTitle} — {person.department}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Company:</strong> {comp ? comp.companyName : "N/A"}
            </p>
            <CompanyLocation companyId={person.companyId} />
            <p className="text-sm text-gray-500 mt-1 italic">{person.about}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeList;
