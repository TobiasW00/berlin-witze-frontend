import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {HTTP_URL} from './api/config';

/*
export const tagsState = atom({
    key: 'tags', 
    default: [], 
  });
*/

  export const tagsQuery = selector({
    key: 'tags',
    get: async ({get}) => {
      const response = await fetch(`${HTTP_URL}/api/tags`);
      return response.json().then(f=>f.content);
      }});