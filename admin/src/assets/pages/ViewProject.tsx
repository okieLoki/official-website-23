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
import { FaEye, FaTrash, FaGithub } from 'react-icons/fa';
import '../styles/ViewPage.css';
import Navbar from '../components/Navbar';

interface Project {
    _id: string;
    name: string;
    image: string;
    project_lead: string;
    github_link: string;
    description: string;
    members: string[];
}

const ViewProject = () => {
    const [projectData, setProjectData] = useState<Project[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/project', {
            withCredentials: true
        })
            .then(response => {
                setProjectData(response.data.projects);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        onOpen();
    };

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8080/api/project/${id}`, {
            withCredentials: true
        })
            .then(() => {
                setProjectData(prevProjects => prevProjects.filter(project => project._id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Navbar />
            <div className='table-page'>
                <Box className='table-container'>

                    <div className="filter">
                        <div className="internal-div">
                            <Button
                                size="sm"
                                variant={searchCriteria === 'name' ? 'solid' : 'outline'}
                                onClick={() => setSearchCriteria('name')}
                            >
                                Name
                            </Button>
                            <Button
                                size="sm"
                                variant={searchCriteria === 'project_lead' ? 'solid' : 'outline'}
                                onClick={() => setSearchCriteria('project_lead')}
                            >
                                Lead
                            </Button>
                            <Button
                                size="sm"
                                variant={searchCriteria === 'description' ? 'solid' : 'outline'}
                                onClick={() => setSearchCriteria('description')}
                            >
                                Description
                            </Button>
                        </div>
                        <Input
                            width={['100%', '50%']}
                            alignSelf="center"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <a href="/project/add">
                            <Button
                                colorScheme="teal"
                                size="sm"
                                onClick={() => console.log('Floating Button Clicked')}
                                className='add-project-button'
                            >
                                Add Project
                            </Button>
                        </a>
                    </div>

                    <Box className="table-wrapper" overflowX='auto'>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Project Lead</Th>
                                    <Th>Description</Th>
                                    <Th>Members</Th>
                                    <Th>GitHub</Th>
                                    <Th>Image</Th>
                                    <Th>Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {projectData.map(project => (
                                    <Tr key={project._id}>
                                        <Td>{project.name}</Td>
                                        <Td>{project.project_lead}</Td>
                                        <Td>{project.description}</Td>
                                        <Td>{
                                            project.members?.map((member, id) => {
                                                return <div key={id}>
                                                    {member}
                                                </div>
                                            })
                                        }</Td>
                                        <Td>
                                            <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                                                <FaGithub size={24} />
                                            </a>
                                        </Td>
                                        <Td>
                                            <a onClick={() => handleImageClick(project.image)}>
                                                <FaEye size={24} />
                                            </a>
                                        </Td>
                                        <Td>
                                            <Button colorScheme='red' size='sm' onClick={() => handleDelete(project._id)}>
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
                                    <Image src={selectedImage} alt='Project Image' />
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Box>

                <a href="/project/add" className="floating-add-button">
                    <Button
                        colorScheme="teal"
                        size="lg"
                        position="fixed"
                        bottom="20px"
                        left="20px"
                    >
                        +
                    </Button>
                </a>
            </div>
        </>
    );
};

export default ViewProject;
