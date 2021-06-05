import clsx from 'clsx';
import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../App';
import { useShareVideoMutation } from '../../graphql/graphql';
import addNotification from '../../utils/addNotification';
import './Share.css';

export const Share = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [shareVideo] = useShareVideoMutation();

  const share = useCallback(
    (data) => {
      if (!user) {
        addNotification({
          title: 'Forbidden',
          message: 'You must login first.',
          type: 'danger'
        });
      }

      try {
        const url = new URL(data.url);
        const youtubeID = url.searchParams.get('v');
        if (!youtubeID) {
          addNotification({
            title: 'Invalid URL',
            message:
              'URL must follow the format provided: https://www.youtube.com/watch?v={youtube_id}',
            type: 'danger',
            dismiss: {
              duration: 5000
            }
          });
        }

        shareVideo({ variables: { id: youtubeID! } }).then(
          ({ data, errors }) => {
            if (data?.shareVideo.__typename === 'Video') {
              addNotification({
                title: 'Successfully',
                message: 'You just share a video',
                type: 'success'
              });
              return;
            }
            if (data?.shareVideo?.__typename === 'VideoError') {
              addNotification({
                title: 'Oops!',
                message: 'Youtube link does not exists',
                type: 'danger'
              });
              return;
            }
            addNotification({
              title: 'Oops!',
              message: 'Internal server error',
              type: 'danger'
            });
          }
        );
      } catch {
        addNotification({
          title: 'Oops!',
          message: 'URL is not valid',
          type: 'danger'
        });
      }
    },
    [shareVideo, user]
  );

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={handleSubmit(share)}
        className="w-full xl:w-1/2 mx-auto mt-20">
        <div className="mt-2 form__grid">
          <label htmlFor="url">Youtube URL: </label>
          <input
            id="url"
            type="text"
            {...register('url', { required: true })}
            className={clsx(
              'btn',
              errors.url ? 'border-red-500' : 'border-gray-300'
            )}></input>
          <label></label>
          <button className="btn focus:outline-none">Share</button>
        </div>
      </form>
    </div>
  );
};
