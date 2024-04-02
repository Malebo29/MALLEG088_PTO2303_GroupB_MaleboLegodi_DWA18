import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useShowsContext } from "../../context/ShowsContext";
import { CarouselPreview } from "./CarouselPreview";
import { getShows } from "../../api";

const Carousel = () => {
  const { shows, setShows } = useShowsContext();
  const [currentPage, setCurrentPage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cardsPerPage = isMobile ? 1 : 4; // Display 1 card on mobile, 4 cards on larger screens

  const handleNextPage = () => {
    if (currentPage >= Math.ceil(shows.length / cardsPerPage) - 1) {
      setCurrentPage(0);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextPage();
    }, 3000); // Change page every 3 seconds
    return () => clearTimeout(timer); // Clean up on component unmount
  }, [currentPage]);

  useEffect(() => {
    const fetchShows = async () => {
    const data = await getShows('https://podcast-api.netlify.app/shows');
    setShows(data);
    };
    
    fetchShows();
}, []);

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        border: "1px solid ##A1CBFF",
        borderRadius: "15px",
        backgroundColor: "#A1CBFF26", // 15% opacity
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: "8%",
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            mb: 1,
            mt: 1,
            fontSize: 15,
            textAlign: "center",
            fontStyle: "italic",
            color: "black",
          }}
        >
          You may be interested in...
        </Typography>

        {shows.map((_, index) => (
          <Box
            key={`card-${index}`}
            sx={{
              width: "100%",
              height: "100%",
              display: currentPage === index ? "flex" : "none",
            }}
          >
            {/* <Slide direction={"right"} in={currentPage == index}>
              <Stack
                spacing={10}
                direction={"row"}
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ width: "100%", height: "100%" }}
              > */}
                {shows
                  .slice(
                    index * cardsPerPage,
                    index * cardsPerPage + cardsPerPage
                  )
                  .map((show) => (
                    <Box key={show.id} sx={{ width: '100%' }}>
                      <CarouselPreview {...show} />
                    </Box>
                  ))}
              {/* </Stack>
            </Slide> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
