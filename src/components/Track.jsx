import React, { useState, useEffect } from 'react';
import { Form, Link, NavLink } from 'react-router-dom';
import '../styles/tracks.css';
import { countFullScore, positionToPoints } from '../helpers/countFullScore';
const Track = ({ children, track, order }) => {
  return (
    <section className='track-container'>
      <p className='position'>{order || ''}.</p>
      <section className='track'>
        <img
          className='cover'
          src={track.cover || 'https://picsum.photos/600/400'}
          alt={`${track.artist}: ${track.name} kansikuva`}
          width='600'
          height='400'
        />
        <section className='info'>
          <section className='titles'>
            <h2 className='title'>{track.name || 'biisin nimi'}</h2>
            <p className='artist'>
              {track.artist.split(',').map((a, i, arr) => (
                <span key={`${track.name}-artists-${i}`}>
                  <Link
                    to={`/poppi-ranking/artist/${a.trim().replace(' ', '-')}`}
                  >
                    {a}
                  </Link>
                  {i >= 0 && i < arr.length - 1 && ', '}
                </span>
              ))}
            </p>
          </section>
          <section className='details'>
            <section className='detail'>
              <p className='header'>julkaisupäivä</p>
              <p>{track.date}</p>
            </section>
            <section className='detail'>
              <p className='header'>pisteet</p>
              <p>{track.score || '?'}</p>
            </section>
            <section className='detail'>
              <p className='header'>sijoitukset</p>
              <p>
                {track.rankings?.map((r) => r.position + '.').join(', ') || '?'}
              </p>
            </section>
          </section>
        </section>
        <section className='score'>
          {track.score ? (
            <>
              <p className='header'>kokonaispisteet</p>
              <p>{countFullScore(track.rankings, track.score)}</p>
            </>
          ) : (
            children
          )}
          <input
            hidden
            readOnly
            type='number'
            name={`position-${track.id}`}
            value={order}
          />
        </section>
        {/*  <section className='children'>
          {track.score ? (
            <>
              <p className='score'>
                pisteet: <span>{track.score} / 5</span>
              </p>
              <p>
                sijoitukset:{' '}
                <span>
                  {track.rankings?.map((r) => r.position).join('., ')}.
                </span>
              </p>
              <p>
                kokonaispisteet:{' '}
                <span>{countFullScore(track.rankings, track.score)}</span>
              </p>
            </>
          ) : (
            children
          )}
        </section> */}
      </section>
    </section>
  );
};

export default Track;
