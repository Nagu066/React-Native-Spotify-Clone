import { ToastAndroid } from 'react-native';

const getPLayLists = async () => {
    try {
        const raw = "";
        const requestOptions = {
            method: "GET",
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://saavn.dev/api/playlists?id=82914609&link=https://www.jiosaavn.com/featured/its-indie-english/AMoxtXyKHoU_", requestOptions);
        if (!response.ok) {
            ToastAndroid.show('Failed to fetch playlists.', ToastAndroid.SHORT);
        }
    
      const result = await response.json();
      return result;
    }
    catch {
        ToastAndroid.show('Failed to fetch playlists.', ToastAndroid.SHORT);
        return null;
    }
};

export default {
    getPLayLists
}