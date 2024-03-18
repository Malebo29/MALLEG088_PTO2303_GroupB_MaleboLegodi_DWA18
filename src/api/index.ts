// import axios  from "axios";
export const getShows = async (url: string) => {

    try {
        const data  = await fetch(url).then(res=> res.json()) 
        //  } = await axios.get(url);
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
        
}