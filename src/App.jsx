import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Countrys from "./Components/Countrys";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataerror, setDataerror] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw Error("Sorry, data in not found");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
        setDataerror(false);
      })
      .catch((error) => {
        setDataerror(error.message);
        setLoading(false);
      });
  }, []);

  const deleteBtn = (name) => {
    const countr = countries.filter((c) => {
      return c.name.common != name;
    });
    setCountries(countr);
  };
  const search = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const searchCountry = countries.filter((c) => {
      const countryValue = c.name.common.toLowerCase();
      return countryValue.startsWith(searchValue);
    });
    setCountries(searchCountry);
  };
  return (
    <>
      <div>
        <h1 style={{ marginBottom: "30px" }}>Country App</h1>
        {loading && <p>Please, wait data is loading</p>}
        {dataerror && <p>{dataerror}</p>}
        {countries && (
          <input
            type="text"
            placeholder="Search country"
            className="search"
            onChange={search}
          />
        )}
        <section className="section">
          {countries &&
            countries.map((country) => {
              return (
                <Countrys {...country} id={uuidv4()} deleteBtn={deleteBtn} />
              );
            })}
        </section>
      </div>
    </>
  );
}

export default App;
