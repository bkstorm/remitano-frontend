import { Video } from '../../graphql/graphql';
import './VideoCard.css';

export interface VideoCardProps {
  video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="flex gap-8 w-full">
      <iframe
        width="560"
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
      <div className="w-full hidden lg:block">
        <h3 className="text-red-500 font-bold">{video.title}</h3>
        <div className="text-gray-500">
          Shared by:{' '}
          <span className="font-medium text-black">{video.user.account}</span>
        </div>
        <span className="text-gray-500">Description:</span>
        <p className="video__description font-medium">{video.description}</p>
      </div>
    </div>
  );
};
