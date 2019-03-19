import { uploadClient } from 'util/axiosClient';

export const uploadFile = (file) => {
    return dispatch => {
        console.log('uploading file: ', file);
        let formData = new FormData();
        formData.append("file", file);
        return uploadClient.post('/uploadImage', formData);
    }
}