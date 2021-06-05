import { useCallback, useEffect, useState } from 'react';

import { VideoCard } from '../../components/VideoCard/VideoCard';
import { useVideosLazyQuery, Video } from '../../graphql/graphql';

export const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [hasMore, setHashMore] = useState(true);
  const [getVideos, { loading, error }] = useVideosLazyQuery({
    onCompleted: (data) => {
      if (data.videos.length) {
        setVideos([...videos, ...data.videos]);
      }
      if (!data.videos.length) {
        setHashMore(false);
      }
    }
  });

  const loadMore = useCallback(() => {
    getVideos({
      variables: {
        offset: videos.length
      }
    });
  }, [getVideos, videos.length]);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  if (error) {
    return <div className="container mx-auto">Oops! Please try again...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      {videos.map((video) => (
        <div key={video.id} className="xl:w-3/4 w-full mx-auto mb-8">
          <VideoCard video={video}></VideoCard>
        </div>
      ))}
      {hasMore && (
        <div className="w-full text-center">
          {loading ? (
            <button className="btn">Loading...</button>
          ) : (
            <button className="btn" onClick={loadMore}>
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
};
