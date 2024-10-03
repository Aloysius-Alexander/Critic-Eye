import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/userService';
import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';

function UserProfilePage() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(); // Fetch the profile from backend
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading as="h2" size="xl" textAlign="center" mb="6">My Profile</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>First Name</FormLabel>
          <Input name="firstName" value={profile.firstName} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Last Name</FormLabel>
          <Input name="lastName" value={profile.lastName} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input name="email" value={profile.email} onChange={handleChange} disabled />
        </FormControl>
        <Button type="submit" colorScheme="teal">Update Profile</Button>
      </form>
    </Box>
  );
}

export default UserProfilePage;
