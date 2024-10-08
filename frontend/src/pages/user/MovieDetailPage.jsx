import MovieDetail from '../../components/user/MovieDetail';
import UserLayout from '../../layouts/UserLayout';

const MovieDetailPage = ({ movieId }) => {
  return (
    <UserLayout>
      <MovieDetail movieId={movieId} />
    </UserLayout>
  );
};

export default MovieDetailPage;
