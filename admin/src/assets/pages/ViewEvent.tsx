import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Image,
    useDisclosure,
    Box,
    Input
} from '@chakra-ui/react';
import { FaEye, FaTrash } from 'react-icons/fa';
import '../styles/ViewPage.css'
import Navbar from '../components/Navbar';

interface Event {
    _id: string;
    title: string;
    image: string;
    venue: string;
    date: string;
    time: string;
    end_date: string | null;
    end_time: string;
    topics: string[];
    info: string;
}

const ViewEvent = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [searchCriteria, setSearchCriteria] = useState('title');
    const [searchQuery, setSearchQuery] = useState('');

    const formatDate = (date: string): string => {
        const inputDate = new Date(date);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return inputDate.toLocaleDateString('en-GB', options);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/event',{
            withCredentials: true
        })
            .then(response => {
                setEvents(response.data.events);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8080/api/event/${id}`, {
            withCredentials: true
        })
            .then(() => {
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        onOpen();
    };

    return (
        <>
            <Navbar />
            <div className='table-page'>
                <Box className='table-container' overflowX='auto'>

                    <div className="filter">
                        <Input
                            width={'50%'}
                            alignSelf={'center'}
                            type="text"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='search-input'
                        />

                        <div className="search-criteria">
                            <span>Search by:</span>
                            <Button
                                size="sm"
                                variant={searchCriteria === 'title' ? 'solid' : 'outline'}
                                onClick={() => setSearchCriteria('title')}
                            >
                                Title
                            </Button>
                            <Button
                                size="sm"
                                variant={searchCriteria === 'venue' ? 'solid' : 'outline'}
                                onClick={() => setSearchCriteria('venue')}
                            >
                                Venue
                            </Button>
                            <Button
                                size="sm"
                                variant={searchCriteria === 'info' ? 'solid' : 'outline'}
                                onClick={() => setSearchCriteria('info')}
                            >
                                Info
                            </Button>
                        </div>

                        <div>
                            <a href="/event/add">
                                <Button
                                    colorScheme="teal"
                                    size="sm"
                                    onClick={() => console.log('Floating Button Clicked')}
                                >
                                    Add Event
                                </Button>
                            </a>
                        </div>

                    </div>

                    <hr />


                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th>Title</Th>
                                <Th>Venue</Th>
                                <Th>Date</Th>
                                <Th>Time</Th>
                                <Th>End Date</Th>
                                <Th>End Time</Th>
                                <Th>Topics</Th>
                                <Th>Info</Th>
                                <Th>Image</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {events
                                .filter((event) => {
                                    const searchValue = searchQuery.toLowerCase();

                                    if (searchCriteria === 'title') {
                                        return event.title.toLowerCase().includes(searchValue);
                                    } else if (searchCriteria === 'venue') {
                                        return event.venue.toLowerCase().includes(searchValue);
                                    } else if (searchCriteria === 'info') {
                                        return event.info.toLowerCase().includes(searchValue);
                                    }

                                    return false;
                                })
                                .map(event => (
                                    <Tr key={event._id}>
                                        <Td>{event.title}</Td>
                                        <Td>{event.venue}</Td>
                                        <Td>{formatDate(event.date)}</Td>
                                        <Td>{event.time}</Td>
                                        <Td>{formatDate(event.date)}</Td>
                                        <Td>{event.end_time}</Td>
                                        <Td>{event.topics.join(', ')}</Td>
                                        <Td>{event.info}</Td>
                                        <Td>
                                            <a onClick={() => handleImageClick(event.image)}>
                                                <FaEye size={24} />
                                            </a>
                                        </Td>
                                        <Td>
                                            <Button colorScheme='red' size='sm' onClick={() => handleDelete(event._id)}>
                                                <FaTrash size={24} />
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton />
                            <ModalBody>
                                <Image src={selectedImage} alt='Event Image' />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Box>
            </div>
        </>
    );
};

export default ViewEvent;
