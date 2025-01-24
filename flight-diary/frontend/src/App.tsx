import { SyntheticEvent, useEffect, useState } from 'react';
import { getDiaries, postDiary } from './service/diary';
//decided to only use types from the backend/src/types to keep it as the single source of truth.
import { DiaryEntry } from '../../backend/src/types';
import axios from 'axios';
import { assertDiaryEntry } from './helpers';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('great');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    getDiaries().then((resp) => setDiaries(resp));
  }, []);

  useEffect(() => {
    const notif = setTimeout(() => {
      setErrMsg('');
    }, 5000);
    return () => clearTimeout(notif);
  }, [errMsg]);

  const handleAdd = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const diary = assertDiaryEntry({ date, weather, visibility, comment });
      console.log(diary);
      postDiary(diary)
        .then((resp) => setDiaries(diaries.concat(resp)))
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response) {
            setErrMsg(`axios error: ${error.response.data}`);
          } else {
            setErrMsg('unknown error');
          }
        });
      setComment('');
      setDate('');
      setVisibility('great');
      setWeather('sunny');
    } catch (error: unknown) {
      setErrMsg(String(error));
    }
  };

  return (
    <div>
      <h2 style={{ color: 'red' }}>{errMsg}</h2>
      <h3>Add a new entry</h3>
      <form onSubmit={handleAdd}>
        <input
          type='date'
          name='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <p>Visibility:</p>
        <label>
          great
          <input
            type='radio'
            name='visibility'
            value='great'
            checked={visibility === 'great'}
            onChange={() => setVisibility('great')}
          />
        </label>
        <label>
          good
          <input
            type='radio'
            name='visibility'
            value='good'
            checked={visibility === 'good'}
            onChange={() => setVisibility('good')}
          />
        </label>
        <label>
          ok
          <input
            type='radio'
            name='visibility'
            value='ok'
            checked={visibility === 'ok'}
            onChange={() => setVisibility('ok')}
          />
        </label>
        <label>
          poor
          <input
            type='radio'
            name='visibility'
            value='poor'
            checked={visibility === 'poor'}
            onChange={() => setVisibility('poor')}
          />
        </label>
        <p>Weather:</p>
        <label>
          sunny
          <input
            type='radio'
            name='weather'
            value='sunny'
            checked={weather === 'sunny'}
            onChange={() => setWeather('sunny')}
          />
        </label>
        <label>
          rainy
          <input
            type='radio'
            name='weather'
            value='rainy'
            checked={weather === 'rainy'}
            onChange={() => setWeather('rainy')}
          />
        </label>
        <label>
          cloudy
          <input
            type='radio'
            name='weather'
            value='cloudy'
            checked={weather === 'cloudy'}
            onChange={() => setWeather('cloudy')}
          />
        </label>
        <label>
          windy
          <input
            type='radio'
            name='weather'
            value='windy'
            checked={weather === 'windy'}
            onChange={() => setWeather('windy')}
          />
        </label>
        <br />
        <input
          type='text'
          name='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit'>Add</button>
      </form>

      <h3>Diary entries:</h3>
      {diaries.map((e) => (
        <div key={e.id}>
          <h3>{e.date}</h3>
          <p>visibility: {e.visibility}</p>
          <p>weather: {e.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

