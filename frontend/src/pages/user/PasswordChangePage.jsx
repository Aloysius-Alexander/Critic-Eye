import { useState } from 'react';
import { changePassword } from '../../services/userService';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

function PasswordChangePage() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }

    try {
      await changePassword(passwords);
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Current Password</FormLabel>
          <Input name="currentPassword" type="password" value={passwords.currentPassword} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>New Password</FormLabel>
          <Input name="newPassword" type="password" value={passwords.newPassword} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Confirm New Password</FormLabel>
          <Input name="confirmPassword" type="password" value={passwords.confirmPassword} onChange={handleChange} required />
        </FormControl>
        <Button type="submit" colorScheme="teal">Change Password</Button>
      </form>
    </Box>
  );
}

export default PasswordChangePage;
