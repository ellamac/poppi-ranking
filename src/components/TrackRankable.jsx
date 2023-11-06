import React, { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';
import '../styles/tracks.css';
import Track from './Track';
import { positionToPoints } from '../helpers/countFullScore';
const TrackRankable = (props) => {
  const [score, setScore] = useState(props.track.score || 1);

  return (
    <>
      <input
        hidden
        readOnly
        type='number'
        name={`position-${props.track.id}`}
        value={props.position}
      />
      <Track
        track={props.track}
        order={props.position}
        score={positionToPoints(props.position) + parseInt(score)}
      >
        {!props.track.score && (
          <section className='ranking'>
            <section className='scores'>
              <input
                type='number'
                name={`score-${props.track.id}`}
                min={1}
                max={5}
                defaultValue={1}
                onChange={(event) => setScore(event.target.value)}
              />
            </section>
          </section>
        )}
      </Track>
    </>
  );
};

export default TrackRankable;
