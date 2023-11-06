import React, { useState, useEffect } from 'react';
import DragSortContainer from './DragSortContainer';
import Track from './Track';
import { Form, NavLink, useLoaderData, useParams } from 'react-router-dom';
import TrackRankable from './TrackRankable';
import { wasRanked } from '../data/filtering';

const Tracklist = (props) => {
  const [tracks, setTracks] = useState([]);
  const [rankable, setRankable] = useState(props.rankable || false);
  const header = props.header || null;

  const params = useParams();
  const loaderTracks = useLoaderData();

  useEffect(() => {
    if (props.rankable) setRankable(!tracks.every((tr) => tr.score));
  }, [props.rankable, tracks]);

  useEffect(() => {
    if (!props.tracks || props.tracks.length) setTracks(loaderTracks);
  }, [props.tracks, loaderTracks]);

  if (!tracks || tracks.length <= 0) return <p>loading...</p>;

  return rankable ? (
    <>
      <h1>Äänestä {params.date} julkaistuja biisejä</h1>
      <p>Järjestä biisit paremmuusjärjestykseen ja pisteytä uudet julkaisut.</p>
      <Form method='PUT'>
        <button type='submit'>tallenna</button>
        <DragSortContainer>
          {tracks.map((tr, i) => (
            <Track key={`track-${i}`} order={i + 1} track={tr}>
              <label className='header'>pisteet </label>
              <input
                type='number'
                name={`score-${tr.id}`}
                min={1}
                max={5}
                defaultValue={1}
              />
            </Track>
          ))}
        </DragSortContainer>
      </Form>
    </>
  ) : (
    <>
      <h1>{header || 'olet jo äänestänyt näitä'}</h1>
      <section className='tracks'>
        {tracks.map((tr, i) => (
          <Track key={`track-${i}`} order={i + 1} track={tr}>
            <NavLink to={`/vote/${tr.date}`}>?</NavLink>
          </Track>
        ))}
      </section>
    </>
  );
};

export default Tracklist;
