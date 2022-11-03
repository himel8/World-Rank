import { KeyboardArrowDownRounded } from "@material-ui/icons";
import React from "react";
import styles from "./CountryTable.module.css";

const orderBy = (countries, direction, latter) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? 1 : -1
    );
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? -1 : 1
    );
  }
  if (latter === "A") {
    return [...countries].sort((a, b) =>
      a.name.common > b.name.common ? 1 : -1
    );
  }
  if (latter === "Z") {
    return [...countries].sort((a, b) =>
      a.name.common > b.name.common ? -1 : 1
    );
  }
  return countries;
};

const CountryTable = ({ countries }) => {
  const orderedCountries = orderBy(countries, "desc", "A");

  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_name}>
          <div>Name</div>

          <div className={styles.heading_arrow}>
            <KeyboardArrowDownRounded color="inherit" />
          </div>
        </button>

        <button className={styles.heading_population}>
          <div>Population</div>
          <div className={styles.heading_arrow}>
            <KeyboardArrowDownRounded color="inherit" />
          </div>
        </button>
      </div>

      {orderedCountries.map((country, index) => (
        <div key={index} className={styles.row}>
          {/* {console.log(country)} */}
          <div className={styles.name}>{country.name.common}</div>

          <div className={styles.population}>{country.population}</div>
        </div>
      ))}
    </div>
  );
};

export default CountryTable;
