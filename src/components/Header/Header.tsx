import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../App';
import { useLoginMutation } from '../../graphql/graphql';
import addNotification from '../../utils/addNotification';
import './Header.css';

export const Header = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [login] = useLoginMutation();
  const { user, saveUser, logout } = useContext(AuthContext);

  const onSubmit = useCallback(
    (data) => {
      login({
        variables: { account: data.account, password: data.password }
      })
        .then(({ data, errors }) => {
          console.log(data, errors);
          if (data?.login?.__typename === 'AuthPayload') {
            saveUser(data.login.user, data.login.token);
            return;
          }
          if (data?.login?.__typename === 'LoginError') {
            addNotification({
              title: 'Oops!',
              message: 'Wrong password',
              type: 'danger'
            });
          }
          if (data?.login?.__typename === 'Error') {
            addNotification({
              title: 'Oops!',
              message: 'Internal server error',
              type: 'danger'
            });
          }
        })
        .catch(() => {});
    },
    [login, saveUser]
  );

  return (
    <div className="container mx-auto flex justify-between m-4 border-b-2 border-solid pb-4">
      <div className="flex justify-between">
        <div className="flex items-baseline space-x-2 prose prose-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <h1>Funny Movies</h1>
        </div>
      </div>
      <div className="flex items-baseline justify-end space-x-2 prose prose-sm">
        {user ? (
          <div className="flex justify-end items-baseline prose prose-sm space-x-2">
            <span>Welcome {user.account}</span>
            <Link to="/share">
              <button className="btn">Share movie</button>
            </Link>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="account"
              type="text"
              className={clsx('btn', 'md:mr-2', {
                'border-red-500': errors.account
              })}
              {...register('account', {
                required: true
              })}></input>
            <input
              placeholder="password"
              type="password"
              className={clsx('btn', 'md:mr-2', {
                'border-red-500': errors.password
              })}
              {...register('password', {
                required: true
              })}></input>
            <button type="submit" className="btn">
              Login / Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};