import { uploadClient, client } from 'util/axiosClient';

export const uploadFile = (file) => {
    return dispatch => {
        console.log('uploading file: ', file);
        let formData = new FormData();
        formData.append("file", file);
        return uploadClient.post('/uploadImage', formData);
    }
}

export const removeFile = (name) => {
    return dispatch => {
        console.log('removing file: ', name);
        return client.delete('/removeImage/' + name, {});
    }
}