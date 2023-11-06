import React, { useState, useEffect } from 'react';
import Track from './Track';
import { useLoaderData } from 'react-router-dom';

const Artist = (params) => {
  const artist = useLoaderData();

  if (!artist) return <p>Loading...</p>;
  return (
    <section>
      <h1>{artist.name || 'artistin nimi'}</h1>
      <h2>Songs</h2>
      <section className='tracks'>
        {artist.songs?.map((s, i) => (
          <section key={`track-${i}`} className='track'>
            <Track track={s} />
          </section>
        ))}
      </section>
    </section>
  );
};

export default Artist;
