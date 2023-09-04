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
    Link,
    Box,
    Input
} from '@chakra-ui/react';
import { FaEye, FaTrash, FaLinkedin, FaGithub, FaTwitter, FaMedium } from 'react-icons/fa';
import '../styles/ViewPage.css'
import Navbar from '../components/Navbar';

interface TeamMember {
    _id: string;
    name: string;
    position: string;
    role: string;
    email: string;
    linkedin_url: string;
    github_url: string;
    twitter_url: string;
    medium_url: string;
    image: string;
}

interface TeamData {
    [position: string]: TeamMember[];
}

const TeamTable = () => {
    const [teamData, setTeamData] = useState<TeamData>({ lead: [], 'co-lead': [], mentor: [], core: [] });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/team', {
            withCredentials: true
        })
            .then(response => {
                setTeamData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8080/api/team/${id}`, {
            withCredentials: true
        })
            .then(() => {
                const updatedTeamData = { ...teamData };
                for (const position in updatedTeamData) {
                    updatedTeamData[position] = updatedTeamData[position].filter(member => member._id !== id);
                }
                setTeamData(updatedTeamData);
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

                        <div className='internal-div'>
                            <div className="search-criteria">
    
                                <Button
                                    size="sm"
                                    variant={searchCriteria === 'name' ? 'solid' : 'outline'}
                                    onClick={() => setSearchCriteria('name')}
                                >
                                    Name
                                </Button>
                                <Button
                                    size="sm"
                                    variant={searchCriteria === 'position' ? 'solid' : 'outline'}
                                    onClick={() => setSearchCriteria('position')}
                                >
                                    Position
                                </Button>
                                <Button
                                    size="sm"
                                    variant={searchCriteria === 'role' ? 'solid' : 'outline'}
                                    onClick={() => setSearchCriteria('role')}
                                >
                                    Role
                                </Button>
                            </div>

                            <div>
                                <a href="/team/add">
                                    <Button
                                        colorScheme="teal"
                                        size="sm"
                                        onClick={() => console.log('Floating Button Clicked')}
                                    >
                                        Add Member
                                    </Button>
                                </a>
                            </div>

                        </div>

                    </div>
                    <hr />


                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Position</Th>
                                <Th>Role</Th>
                                <Th>Email</Th>
                                <Th>LinkedIn</Th>
                                <Th>Github</Th>
                                <Th>Twitter</Th>
                                <Th>Medium</Th>
                                <Th>Image</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.keys(teamData).map(position => (
                                teamData[position]
                                    .filter((member) => {
                                        const searchValue = searchQuery.toLowerCase();

                                        if (searchCriteria === 'name') {
                                            return member.name.toLowerCase().includes(searchValue);
                                        } else if (searchCriteria === 'position') {
                                            return member.position.toLowerCase().includes(searchValue);
                                        } else if (searchCriteria === 'role') {
                                            return member.role.toLowerCase().includes(searchValue);
                                        }

                                        return false;
                                    })
                                    .map(member => (
                                        <Tr key={member._id}>
                                            <Td>{member.name}</Td>
                                            <Td>{member.position.toUpperCase()}</Td>
                                            <Td>{member.role.toUpperCase()}</Td>
                                            <Td>{member.email}</Td>
                                            <Td>
                                                {member.linkedin_url && (
                                                    <Link href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                                                        <FaLinkedin size={24} />
                                                    </Link>
                                                )}
                                            </Td>
                                            <Td>
                                                {member.github_url && (
                                                    <Link href={member.github_url} target="_blank" rel="noopener noreferrer">
                                                        <FaGithub size={24} />
                                                    </Link>
                                                )}
                                            </Td>
                                            <Td>
                                                {member.twitter_url && (
                                                    <Link href={member.twitter_url} target="_blank" rel="noopener noreferrer">
                                                        <FaTwitter size={24} />
                                                    </Link>
                                                )}
                                            </Td>
                                            <Td>
                                                {member.medium_url && (
                                                    <Link href={member.medium_url} target="_blank" rel="noopener noreferrer">
                                                        <FaMedium size={24} />
                                                    </Link>
                                                )}
                                            </Td>
                                            <Td>
                                                <a onClick={() => handleImageClick(member.image)}>
                                                    <FaEye size={24} />
                                                </a>
                                            </Td>
                                            <Td>
                                                <Button colorScheme='red' size='sm' onClick={() => handleDelete(member._id)}>
                                                    <FaTrash size={24} />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))
                            ))}
                        </Tbody>

                    </Table>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton />
                            <ModalBody>
                                <Image src={selectedImage} alt='Member Image' />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Box>
            </div>
        </>
    );
};

export default TeamTable;
