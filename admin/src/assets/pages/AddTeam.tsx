import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  useToast,
  FormHelperText,
  Box
} from '@chakra-ui/react';
import axios from 'axios';
import mentorRoles from '../../../constants/Mentor';
import postDetails from '../api/postDetails';
import '../styles/AddPage.css'


const Team = () => {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [mediumUrl, setMediumUrl] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleImageUpload = async (e: any) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      postDetails(selectedFile, toast, setLoading, setImage);
    }
  };

  const handleAddMember = async () => {
    setLoading(true);

    if (!email || !name || !position || !image) {
      toast({
        title: 'Error',
        description: 'Please fill all the required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      setLoading(false);
      return;
    }

    if (position === 'mentor' && !role) {
      toast({
        title: 'Error',
        description: 'Please select a mentor role.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      setLoading(false);
      return;
    }

    if (position !== 'mentor') {
      setRole('Developer');
    }

    try {
      const response = await axios.post('http://localhost:8080/api/team', {
        email,
        name,
        position,
        role: role,
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        twitter_url: twitterUrl,
        medium_url: mediumUrl,
        image
      });

      if (response.status === 201) {
        toast({
          title: 'Success',
          description: 'Member added successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
        setRole('');
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Internal Server Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }
    setLoading(false);
  };

  return (
    <div className='app-container'>
      <div className='form'>
        <VStack spacing={4}>


          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>


          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>


          <FormControl isRequired>
            <FormLabel>Position</FormLabel>
            <Select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option>Select</option>
              <option value="lead">Lead</option>
              <option value="co-lead">Co-Lead</option>
              <option value="mentor">Mentor</option>
              <option value="core">Core</option>
            </Select>
          </FormControl>


          {position === 'mentor' && (
            <FormControl>
              <FormLabel>Mentor Role</FormLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Mentor Role</option>
                {mentorRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}


          <FormControl>
            <FormLabel>Github URL</FormLabel>
            <Input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </FormControl>


          <FormControl>
            <FormLabel>LinkedIn URL</FormLabel>
            <Input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </FormControl>


          <FormControl>
            <FormLabel>Twitter URL</FormLabel>
            <Input
              type="url"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
            />
          </FormControl>


          <FormControl>
            <FormLabel>Medium URL</FormLabel>
            <Input
              type="url"
              value={mediumUrl}
              onChange={(e) => setMediumUrl(e.target.value)}
            />
          </FormControl>


          <FormControl id='picture' isRequired>
            <FormLabel>Upload Picture</FormLabel>
            <FormHelperText>Image size should be less than 1MB</FormHelperText>
            <Input
              id='profilepic'
              type='file'
              accept='image/*'
              display='none'
              onChange={handleImageUpload}
            />
            <label htmlFor='profilepic'>
              <Box
                as='div'
                cursor='pointer'
                p={2}
                border='2px dashed #CBD5E0'
                borderRadius='md'
                _hover={{
                  borderColor: 'teal.500',
                }}
              >
                {image ? 'Image Uploaded' : 'Click to Upload'}
              </Box>
            </label>
          </FormControl>

          <Button colorScheme='teal' onClick={handleAddMember} isLoading={loading}>
            Add Member
          </Button>
        </VStack>
      </div>
    </div>
  );
};

export default Team;
