import { from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';

const get = (url) => {
  return fromFetch(url).pipe(mergeMap((res) => res.json()));
};

const post = (url, body) => {
  return from(
    fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  ).pipe(mergeMap((res) => res.json()));
};

export const httpService = { get, post };
