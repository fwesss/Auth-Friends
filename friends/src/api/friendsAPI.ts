import axios, { AxiosPromise, AxiosResponse } from 'axios';
import Friend from '../features/friends/types';

export const requestAuthentication = (
  username: string,
  password: string
): AxiosPromise =>
  axios.post('http://localhost:5000/api/login', {
    username,
    password,
  });

export const getFriendsData: () => Promise<{
  rest: Pick<
    AxiosResponse,
    'status' | 'statusText' | 'headers' | 'config' | 'request'
  >;
  data: Friend[];
}> = async () => {
  const { data, ...rest } = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/friends',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  return { data, rest };
};

export const postFriendData: (
  friend: Friend
) => Promise<{
  rest: Pick<
    AxiosResponse,
    'status' | 'statusText' | 'headers' | 'config' | 'request'
  >;
  data: Friend[];
}> = async (friend) => {
  const { data, ...rest } = await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/friends',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    data: friend,
  });
  return { data, rest };
};

export const putFriendData: ({
  id,
  ...friend
}: Friend) => Promise<{
  rest: Pick<
    AxiosResponse,
    'status' | 'statusText' | 'headers' | 'config' | 'request'
  >;
  data: Friend[];
}> = async ({ id, ...friend }: Friend) => {
  const { data, ...rest } = await axios({
    method: 'PUT',
    url: `http://localhost:5000/api/friends/${id}`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    data: friend,
  });
  return { data, rest };
};

export const deleteFriendData: (
  id: number
) => Promise<{
  rest: Pick<
    AxiosResponse,
    'status' | 'statusText' | 'headers' | 'config' | 'request'
  >;
  data: Friend[];
}> = async (id: number) => {
  const { data, ...rest } = await axios({
    method: 'DELETE',
    url: `http://localhost:5000/api/friends/${id}`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  return { data, rest };
};
