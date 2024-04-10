export const getShows = async (url: string) => {

    try {
        const data  = await fetch(url).then(res=> res.json()) 
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
        
};

export const getShow = async (showId: string) => {
  try {
    const url = `https://podcast-api.netlify.app/id/${showId}`;
    const data = await fetch(url).then(res => res.json());

    // console.log('Get show:', data)

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};