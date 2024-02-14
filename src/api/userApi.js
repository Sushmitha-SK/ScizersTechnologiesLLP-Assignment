import axios from "axios";

//Get All Users
export async function getAllUsers(page = 1, pageSize = 10) {
    const URL = `https://swapi.dev/api/people/?page=${page}&page_size=${pageSize}`;
    try {
        const response = await axios.get(URL);

        if (response.status === 200) {
            return {
                users: response.data.results,
                totalCount: response.data.count
            };
        }
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

//Get Random Picture
export async function getRandomPicture() {
    const URL = 'https://picsum.photos/200/300'
    try {
        const response = await axios.get(URL);

        if (response.status === 200) {
            return response.request.responseURL;
        }

    } catch (error) {
        console.log('Error', error);
    }
}

