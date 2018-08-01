import axios from 'axios';

export const sendFileToServer = file => {
    const data = new FormData();
    data.append('file', file);
    axios.post('api/image', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
    }})
    .then(response => {
        console.log('successfully uploaded to the S3: ', response);
    })
    .catch(error => {
        console.log('error uploading file: ', error);
    })
}

export const sendFileAndTextToServer = (file, text) => {
    const data = new FormData();
    data.append('file', file);
    for(const [key, value] of text.entries()){
        data.append(key, value);
    }
    axios.post('api/imageAndText', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
    }})
    .then(response => {
        console.log('successfully uploaded to the S3: ', response);
    })
    .catch(error => {
        console.log('error uploading file: ', error);
    })
}