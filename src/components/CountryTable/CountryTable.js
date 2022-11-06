import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./CountryTable.module.css";

const orderBy = (countries, value, direction, latter) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
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

const SortArrow = ({ direction, latter }) => {
  if (direction === "desc" || latter === "A") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [latter, setlatter] = useState("A");
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction, latter);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const switchLatter = () => {
    if (latter === "A") {
      setlatter("Z");
    } else {
      setlatter("A");
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => {
            switchLatter(latter);
          }}
        >
          <div>Name</div>

          {/* <SortArrow latter={latter} /> */}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          <SortArrow direction={direction} />
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          <SortArrow direction={direction} />
        </button>
      </div>

      {orderedCountries.map((country, index) => (
        <Link key={index} href={`/country/${country.cca3}`}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flags.png} alt={country.name.common} />
            </div>
            <div className={styles.name}>{country.name.common}</div>

            <div className={styles.population}>{country.population}</div>

            <div className={styles.area}>{country.area || 0}</div>

            <div className={styles.gini}>
              {country.gini ? Object.values(country?.gini)[0] : 0} %
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountryTable;
