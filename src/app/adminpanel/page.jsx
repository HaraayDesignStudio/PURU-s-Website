"use client";
import Link from "next/link";
import styles from "./style.module.css";
import { useState, useEffect } from "react";

const page = () => {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [cand, setCand] = useState(true);
  const [candidateData, setCandidateData] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "https://purus-server.onrender.com/api/contacts"
      );
      if (response.status === 200) {
        const data = await response.json();
        setData(data.reverse());
      } else {
        console.error("Failed to fetch data from the API.");
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const response = await fetch(
        "https://purus-server.onrender.com/api/candidates"
      );
      if (response.status === 200) {
        const data = await response.json();
        setCandidateData(data.reverse());
      } else {
        console.error("Failed to fetch data from the API.");
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchCandidates();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      if (username === "purus") {
        if (password === "123456") {
          setLogin(true);
        } else {
          alert("You don't have the access to the data");
        }
      } else {
        alert("You don't have the access to the data");
      }
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        {login === false ? (
          <Link href="/adminpanel">Login to access the Data</Link>
        ) : (
          <>
            <p className={styles.headings}>You're logged in</p>
          </>
        )}
      </div>
      <div className={styles.main}>
        {login === false ? (
          <form onSubmit={handleSubmit} className={styles.mainform}>
            <div className={styles.form}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.form}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
          </form>
        ) : cand ? (
          <div className={styles.content}>
            <p className={styles.change} onClick={() => setCand(!cand)}>
              See who all applied for job
            </p>
            <p className={styles.datap}>Data from ContactUs</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone no</th>
                  <th>Message</th>
                  <th>Company</th>
                  <th>CreatedAt</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, index) => (
                  <tr key={index}>
                    <td>{`${d.firstName} ${d.lastName}`}</td>
                    <td>{d.email}</td>
                    <td>{d.number}</td>
                    <td>{d.message}</td>
                    <td>{d.company}</td>
                    <td>{new Date(d.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.content}>
            <p className={styles.change} onClick={() => setCand(!cand)}>
              See who tried to contact you
            </p>
            <p className={styles.datap}>Data from Job Seekers</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone no</th>
                  <th>Message</th>
                  <th>Portfolio</th>
                  <th>CV</th>
                  <th>CreatedAt</th>
                </tr>
              </thead>
              <tbody>
                {candidateData.map((d, index) => (
                  <tr key={index}>
                    <td>{`${d.firstName} ${d.lastName}`}</td>
                    <td>{d.email}</td>
                    <td>{d.number}</td>
                    <td>{d.message}</td>
                    <td>
                      <Link className={styles.link} href={d.portfolio}>
                        Portfolio
                      </Link>{" "}
                    </td>
                    <td>
                      <Link className={styles.link} href={d.cv}>
                        CV
                      </Link>
                    </td>
                    <td>{new Date(d.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
