import axios from 'axios';

const findById = id => {
    return new Promise((resolve, reject) => {
        // console.log('Looking up book:', id);
        try {
            axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
                .then(res => {
                    // console.log('res:', res);
                    return resolve(res.data);
                });
        } catch (err) {
            console.error(err);
            return reject(err);
        }
    })


}

export default { findById }