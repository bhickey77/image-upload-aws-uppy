import axios from 'axios';

const verbose = false; // turns on and off console.logs

export const sendFileToServer = file => {
    const data = new FormData();
    data.append('file', file);
    axios.post('api/post/image', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
    }})
    .then(response => {
        verbose && console.log('successfully uploaded to the S3: ', response);
        window.location.reload();
    })
    .catch(error => {
        verbose && console.log('error uploading file: ', error);
    })
}

export const sendFileAndTextToServer = (file, text) => {
    const data = new FormData();
    data.append('file', file);
    verbose && console.log({text});
    
    for(const [key, value] of Object.entries(text)){
        data.append(key, value);
    }
    axios.post('api/post/imageAndText', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
    }})
    .then(response => {
        verbose && console.log('successfully uploaded to the S3: ', response);
        window.location.reload();
    })
    .catch(error => {
        verbose && console.log('error uploading file: ', error);
    })
}