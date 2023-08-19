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
import Navbar from '../components/Navbar';
import '../styles/AddPage.css'

const AddEvent = () => {
    const toast = useToast();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [end_date, setEndDate] = useState('');
    const [end_time, setEndTime] = useState('');
    const [link, setLink] = useState('');
    const [topicsStr, setTopicsStr] = useState('')
    const [topics, setTopics] = useState<string[]>([]);
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (e: any) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            postDetails(selectedFile, toast, setLoading, setImage);
        }
    };

    const handleAddEvent = async () => {
        try {
            if (!title || !image || !venue || !date || !time || !info || !link) {
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

            if (topicsStr.trim() !== '') {
                setTopics(topicsStr.split(' '));
            }

            const response = await axios.post('http://localhost:8080/api/event', {
                title,
                image,
                venue,
                date,
                time,
                end_date,
                end_time,
                link,
                topics,
                info,
            }, 
            {
                withCredentials: true,
            });

            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'Event added successfully.',
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
        <Navbar/>
            <div className="app-container">
                <div className="form">
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Event Title</FormLabel>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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

                        <FormControl isRequired>
                            <FormLabel>Venue</FormLabel>
                            <Input
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Date</FormLabel>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Time</FormLabel>
                            <Input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>End Date</FormLabel>
                            <Input
                                type="date"
                                value={end_date}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>End Time</FormLabel>
                            <Input
                                type="time"
                                value={end_time}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Link</FormLabel>
                            <Input
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Topics</FormLabel>
                            <Textarea
                                value={topicsStr}
                                onChange={(e) => setTopicsStr(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Event Info</FormLabel>
                            <Textarea
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                            />
                        </FormControl>

                        <Button colorScheme="teal" onClick={handleAddEvent} isLoading={loading}>
                            Add Event
                        </Button>
                    </VStack>
                </div>
            </div>
        </>
    );
};

export default AddEvent;
