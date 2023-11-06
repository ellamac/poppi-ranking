import React, { useState, useEffect } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';

const Tracklists = (props) => {
  const tracks = useLoaderData();
  if (!tracks || tracks.length <= 0) return <p>lataa...</p>;
  return (
    <section>
      <h2>Valitse viikko:</h2>
      <ul>
        {[...new Set(tracks.map((tr) => tr.date))]
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date) => (
            <li>
              <NavLink to={`/vote/${date}`}>Äänestä {date} julkaistuja</NavLink>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Tracklists;
