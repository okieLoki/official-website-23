import axios from 'axios';

const postDetails = (pic: any, toast: any, setLoading: any, setImage: any) => {
    setLoading(true);
    if (pic === undefined) {
        toast({
            title: 'Please select an image',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
        });
        setLoading(false);
        return;
    }
    if (pic.type !== 'image/jpeg' && pic.type !== 'image/png') {
        toast({
            title: 'Please select a JPEG or PNG image',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top'
        });
        setLoading(false);
        return;
    }
    if (pic.size > 1024 * 1024) {
        toast({
            title: 'Image size should be below 1 MB',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
        });
        setLoading(false);
        return;
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
        const data = new FormData();
        data.append('file', pic);
        data.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
        data.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);
        data.append('folder', import.meta.env.VITE_FOLDER);

        axios
            .post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, data)
            .then((response) => {
                console.log(response.data.url)
                setImage(response.data.url);
                setLoading(false);
            })
            .catch((err) => {
                console.warn(err);
                toast({
                    title: 'An error occurred while uploading the picture',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                });
                setLoading(false);
            });
    }
};

export default postDetails;