import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  redirect,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import Papa from 'papaparse';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Artist from './components/Artist';
import Tracklist from './components/Tracklist';

import { weeklyTracks } from './data/filtering';
import Tracklists from './components/Tracklists';

const App = (props) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    console.log('----TRACKS-----', tracks);
  }, [tracks]);

  /* Gets data from Google sheets */
  useEffect(() => {
    const local = localStorage.getItem('tracks');
    let initialValue = JSON.parse(local) || [];

    new Promise((resolve, reject) =>
      Papa.parse(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vStmJJuyQCC9_BpNs4Mvw-B6nVjbJ5Dc_8ptjKmKd4fZSHpfHPQUidZqHDkauzb7D6d79iHDogyywHK/pub?output=csv',
        {
          download: true,
          header: true,
          complete: resolve,
          error: reject,
        }
      )
    )
      .then((result) => {
        setTracks(
          result.data.map((d) => initialValue.find((i) => i.id === d.id) || d)
        );
      })
      .catch((err) => console.log('Something went wrong:', err));
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route
        id='root'
        path='/'
        element={<Layout />}
        loader={() => tracks || null}
      >
        <Route
          id='home'
          index={true}
          element={<HomePage />}
          loader={() => tracks || null}
        />
        <Route
          id='artist'
          element={<Artist />}
          path={'artist/:name'}
          loader={({ params }) => {
            const songs =
              tracks?.filter((tr) =>
                tr.artist
                  .split(',')
                  .map((a) => a.trim().toUpperCase().replace(' ', '-'))
                  .includes(params.name.toUpperCase())
              ) || null;
            return songs && songs.length > 0
              ? { name: params.name, songs }
              : null;
          }}
        />
        <Route
          id='tracklists'
          element={<Tracklists />}
          path='vote'
          loader={() => tracks || null}
        />
        <Route
          id='vote'
          element={<Tracklist rankable />}
          path='vote/:date'
          loader={({ params }) => weeklyTracks(tracks, params.date) || null}
          action={async ({ request, params }) => {
            switch (request.method) {
              case 'PUT': {
                let formData = await request.formData();
                const updates = Object.fromEntries(formData);
                console.log('ids 1', updates);
                const ids = Object.keys(updates).map((k) => k.split('-')[1]);
                console.log('ids 2', ids);
                setTracks((prev) => {
                  const newTracks = prev.map((tr) => {
                    const pos = updates[`position-${tr.id}`];
                    console.log('ids 3', pos);
                    const rankings = tr.rankings
                      ? [
                          ...tr.rankings,
                          {
                            date: params.date,
                            position: updates[`position-${tr.id}`],
                          },
                        ]
                      : [
                          {
                            date: params.date,
                            position: updates[`position-${tr.id}`],
                          },
                        ];
                    const wasUpdated = ids.includes(tr.id);
                    console.log('ids 4', wasUpdated);
                    return wasUpdated
                      ? {
                          ...tr,
                          score: tr.score || updates[`score-${tr.id}`],
                          rankings,
                        }
                      : tr;
                  });
                  localStorage.setItem('tracks', JSON.stringify(newTracks));
                  return newTracks;
                });
                return redirect('/');
              }
              default: {
                throw new Response('', { status: 405 });
              }
            }
          }}
        />
      </Route>,
    ])
  );

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
};

export default App;
