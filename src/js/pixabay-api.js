import axios from 'axios'

export async function getImages(searchValue, page) {
    const url = 'https://pixabay.com/api/';
  
    const params = {
      key: '42469788-7d7013196b534fb1bad6f4ac3',
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    };
    const res = await axios.get(url, { params });
    return res.data;
  }