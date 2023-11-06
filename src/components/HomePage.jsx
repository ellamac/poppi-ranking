import React, { useState, useEffect } from 'react';
import { Form, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import Track from './Track';
import '../styles/tracks.css';
import Tracklist from './Tracklist';
import { countFullScore } from '../helpers/countFullScore';

const HomePage = (props) => {
  const tracks = useRouteLoaderData('root');

  if (!tracks || tracks.length <= 0) return <p>loading...</p>;

  return (
    <>
      <Tracklist
        rankable={false}
        header='Koko biisilista'
        tracks={tracks.sort(
          (a, b) =>
            countFullScore(b.rankings, b.score) -
            countFullScore(a.rankings, a.score)
        )}
      />
    </>
  );
};

export default HomePage;
/**
 * 1 -> 5 6-1
 * 2 -> 4 6-2
 * 3 -> 3 6-3
 * 4 -> 2 6-4
 * 5 -> 1 6-5
 */
