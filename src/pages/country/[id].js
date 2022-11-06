import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);

  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  const singleCountry = country[0];
  const [borders, setBorders] = useState([]);
  // const [border, setBorder] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      singleCountry.borders.map((border) => getCountry(border))
    );
    // borders.map((data) => setBorder(data));
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, [borders]);

  const lan = Object.values(singleCountry.languages);
  const cureency = Object.values(singleCountry.currencies)[0].name;
  const nativeName = Object.values(singleCountry.name.nativeName)[0].common;

  return (
    <Layout title={singleCountry.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overviewPanel}>
            <img
              src={singleCountry.flags.png}
              alt={singleCountry.name.common}
            />

            <h1 className={styles.overview_name}>
              {singleCountry.name.common}
            </h1>
            <div className={styles.overview_region}>{singleCountry.region}</div>
          </div>

          <div className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>
                {singleCountry.population}
              </div>
              <div className={styles.overview_label}>Population</div>
            </div>

            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{singleCountry.area}</div>
              <div className={styles.overview_label}>Area</div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {singleCountry.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Subregion</div>
              <div className={styles.details_panel_value}>
                {singleCountry.subregion}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {lan.map((name) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>{cureency}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>{nativeName}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {singleCountry.gini ? Object.values(singleCountry?.gini)[0] : 0}
                %
              </div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>
              <div className={styles.details_panel_borders_container}>
                {borders.map((border, index) => (
                  <Neighbour key={index} border={border} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};

const Neighbour = ({ border }) => {
  return (
    <div className={styles.details_panel_borders_country}>
      {border.map((data, index) => (
        <NeighbourCountry key={index} data={data} />
      ))}
    </div>
  );
};

const NeighbourCountry = ({ data }) => {
  return (
    <>
      <Link href={`/country/${data.cca3}`}>
        <img src={data.flags.png} alt={data.name.common} />
      </Link>

      <div className={styles.details_panel_borders_name}>
        {data.name.common}
      </div>
    </>
  );
};
