"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAdvocates = (page = 1) => {
    console.log(`Fetching advocates for page ${page}...`);
    fetch(`/api/advocates?page=${page}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setTotalPages(jsonResponse.totalPages);
      });
  };

  useEffect(() => {
    fetchAdvocates(currentPage);
  }, [currentPage]);

  const onChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    const filteredAdvocates = advocates.filter((advocate) => {
      const specialties = advocate.specialties.join(" ").toLowerCase();

      return (
        (advocate.firstName + " " + advocate.lastName).toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm) ||
        specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });
    setFilteredAdvocates(filteredAdvocates);
  };

  const onReset = () => {
    setSearchInput("");
    setFilteredAdvocates(advocates);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main style={{ margin: "24px" }}>
      <div className="header">Solace Advocates</div>
      <br />
      <div className="search">
        <input
          id="searchInput"
          style={{ border: "1px solid black" }}
          onChange={onChange}
          value={searchInput}
        />
        <button onClick={onReset}>Reset Search</button>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, idx) => (
            <tr key={idx}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s, index) => (
                  <div key={index}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
      searchInput === "" ?
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div> : null
      }
    </main>
  );
}
