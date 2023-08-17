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
import '../styles/ViewPage.css'

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
        axios.get('http://localhost:8080/api/project')
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
        axios.delete(`http://localhost:8080/api/project/${id}`)
            .then(() => {
                setProjectData(prevProjects => prevProjects.filter(project => project._id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
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

                    <div>
                        <a href="/project/add">
                            <Button
                                colorScheme="teal"
                                size="sm"
                                onClick={() => console.log('Floating Button Clicked')}
                            >
                                Add Project
                            </Button>
                        </a>
                    </div>

                </div>



                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Project Lead</Th>
                            <Th>Description</Th>
                            <Th>GitHub</Th>
                            <Th>Image</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {projectData
                            .filter((proj) => {
                                const searchValue = searchQuery.toLowerCase();

                                if (searchCriteria === 'name') {
                                    return proj.name.toLowerCase().includes(searchValue);
                                } else if (searchCriteria === 'project_lead') {
                                    return proj.project_lead.toLowerCase().includes(searchValue);
                                } else if (searchCriteria === 'description') {
                                    return proj.description.toLowerCase().includes(searchValue);
                                }

                                return false;
                            })
                            .map(project => (
                                <Tr key={project._id}>
                                    <Td>{project.name}</Td>
                                    <Td>{project.project_lead}</Td>
                                    <Td>{project.description}</Td>
                                    <Td>
                                        <Link href={project.github_link} target="_blank" rel="noopener noreferrer">
                                            <FaGithub size={24} />
                                        </Link>
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
        </div>
    );
};

export default ViewProject;
