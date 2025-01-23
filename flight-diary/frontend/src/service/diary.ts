import axios from 'axios';
import { NewDiaryEntry } from '../../../backend/src/types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = async () => {
  const resp = await axios.get(baseUrl);
  return resp.data;
};

export const postDiary = async (diary: NewDiaryEntry) => {
  const resp = await axios.post(baseUrl, diary);
  return resp.data;
};
