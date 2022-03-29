import axios from "axios";
import React from "react";
import styles from "./quotes.module.css";
import { useState } from "react";
import options from "./values.json";

export default function Quotes() {
  const [category, setcategory] = useState("");
  const [quotes, setquotes] = useState();
  const [loading, setloading] = useState(false);

  function getQuote() {
    setloading(true);
    axios
      .get(`https://quotes.rest/qod/?category=${category}`)
      .then((res) => {
        setquotes(res.data.contents.quotes);
        setloading(false);

        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response.status);
        setloading(false);
      });
  }

  var backgroundstyle;

  quotes &&
    quotes.map((back) => {
      return (backgroundstyle = {
        backgroundImage: `url(${back.background})`,
      });
    });

  if (loading) {
    return (
      <div className={styles.main}>
        <div className={styles.card}>
          <h2>quote of the day</h2>
          <section className={styles.section}>
            <div className={styles.ldsdualring}></div>
          </section>
        </div>
        <div className={styles.actions}>
          <div className={styles.select}>
            <select
              onClick={(e) => {
                setcategory(e.target.value.toLowerCase());
              }}
            >
              <option>--select category--</option>
            </select>
            <div className={styles.select_arrow}></div>
          </div>
          <button className={styles.btn}>get quote</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main} style={backgroundstyle}>
      <div className={styles.card}>
        <h2>quote of the day</h2>
        {quotes ? (
          quotes.map((quote) => (
            <section key={quote.length} className={styles.section}>
              <p className={styles.Quote}>{quote.quote}</p>
              <span className={styles.author}>--{quote.author}</span>
            </section>
          ))
        ) : (
          <section className={styles.section}>
            <p className={styles.Quote}>
              select the category and push the button
            </p>
          </section>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.select}>
          <select
            onClick={(e) => {
              setcategory(e.target.value.toLowerCase());
            }}
          >
            <option>--select category--</option>
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className={styles.select_arrow}></div>
        </div>
        <button className={styles.btn} onClick={getQuote}>
          get quote
        </button>
      </div>
    </div>
  );
}
