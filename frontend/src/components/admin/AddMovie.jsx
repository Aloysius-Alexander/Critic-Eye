import { Box, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [poster, setPoster] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('director', director);
    formData.append('releaseYear', releaseYear);
    formData.append('genre', genre);
    formData.append('summary', summary);
    formData.append('posterUrl', poster);

    try {
      const response = await axios.post('/api/v1/admin/add-movie', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4" />
        <Input placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} className="mb-4" />
        <Input placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} className="mb-4" />
        <Input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="mb-4" />
        <Input placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="mb-4" />
        <Input type="file" onChange={(e) => setPoster(e.target.files[0])} className="mb-4" />
        <Button type="submit" colorScheme="teal" className="w-full">
          Add Movie
        </Button>
      </form>
    </Box>
  );
};

export default AddMovie;
