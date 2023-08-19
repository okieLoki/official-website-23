import { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    VStack,
    useToast,
    Box,
    FormHelperText
} from '@chakra-ui/react';
import axios from 'axios';
import postDetails from '../api/postDetails';
import '../styles/AddPage.css'
import Navbar from '../components/Navbar';

const AddProject = () => {
    const toast = useToast();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [projectLead, setProjectLead] = useState('');
    const [githubLink, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [membersStr, setMembersStr] = useState('')
    const [members, setMembers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (e: any) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            postDetails(selectedFile, toast, setLoading, setImage);
        }
    };

    const handleAddEvent = async () => {
        try {
            if (!name || !image || !projectLead || !githubLink || !description) {
                toast({
                    title: 'Error',
                    description: 'Please fill all the required fields.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                return;
            }


            setMembers(membersStr.split('\n'))
            setMembers(members.filter((member) => member !== ''))


            const response = await axios.post('http://localhost:8080/api/project', {
                name,
                image,
                project_lead: projectLead,
                github_link: githubLink,
                description,
                members,
            }, {
                withCredentials: true,
            });

            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'Project added successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            } else {
                toast({
                    title: 'Error',
                    description: response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
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
                position: 'top',
            });
        }
    };

    return (
        <>
            <Navbar />

            <div className="app-container">
                <div className="form">
                    <VStack spacing={4}>


                        <FormControl isRequired>
                            <FormLabel>Project Title</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id='picture' isRequired>
                            <FormLabel>Upload Picture</FormLabel>
                            <FormHelperText>Image size should be less than 1MB</FormHelperText>
                            <Input
                                id='pic_upload'
                                type='file'
                                accept='image/*'
                                display='none'
                                onChange={handleImageUpload}
                            />
                            <label htmlFor='pic_upload'>
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

                        <FormControl isRequired>
                            <FormLabel>Project Lead</FormLabel>
                            <Input
                                type="text"
                                value={projectLead}
                                onChange={(e) => setProjectLead(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Github Link</FormLabel>
                            <Input
                                type="text"
                                value={githubLink}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Members</FormLabel>
                            <Textarea
                                value={membersStr}
                                onChange={(e) => setMembersStr(e.target.value)}
                            />
                        </FormControl>

                        <Button colorScheme="teal" onClick={handleAddEvent} isLoading={loading}>
                            Add Project
                        </Button>
                    </VStack>
                </div>
            </div>
        </>
    );
};

export default AddProject;
