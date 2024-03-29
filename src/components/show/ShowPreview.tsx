import { Show } from "../../utils/type";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActionArea,
} from "@mui/material";
import { useShowsContext } from "../../context/ShowsContext";
import { useNavigate } from "react-router-dom";

const genreMap = {
  "1": "Personal Growth",
  "2": "True Crime and Investigative Journalism",
  "3": "History",
  "4": "Comedy",
  "5": "Entertainment",
  "6": "Business",
  "7": "Fiction",
  "8": "News",
  "9": "Kids and Family",
};

const ShowPreview = (show: Show) => {
  const navigate = useNavigate();
  const { setSelectedGenre } = useShowsContext();

  const handleClick = () => {
    navigate(`/show/${show.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        border: "1px solid #E7F1F9",
        borderRadius: "10px",
        backgroundColor: "#E7F1F9",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          sx={{ height: 250, objectPosition: "top" }}
          image={show.image}
          title={show.title}
          loading='eager'
          alt="Show image"
        />

        <CardContent
          sx={{
            backgroundColor: "#A1CBFF26",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: 15, fontWeight: "bold", color: "#050A35", mb: 2 }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {show.title}
          </Typography>

          <Stack sx={{ mb: 2 }} direction="row" spacing={1}>
            <Chip
              color="primary"
              label={`Seasons: ${show.seasons}`}
              size="small"
              sx={{ backgroundColor: "#2DD699", color: "#040736" }}
            />
          </Stack>

          <Typography
            sx={{ fontSize: 12, color: "#050A35", textAlign: "center" }}
            variant="body2"
            color="text.secondary"
          >
            {show.description.slice(0, 90) + "..."}
          </Typography>

          <Typography
            sx={{ mt: 2, fontWeight: "bold", fontSize: 12, color: "#050A35" }}
          >
            Updated:&nbsp;
            {new Date(show.updated).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </CardContent>
      </CardActionArea>

      <fieldset
        style={{
          width: "80%",
          display: "flex",
          margin: "10px",
          color: "#040736",
          border: "2px solid #040736",
          borderRadius: "5px",
        }}
      >
        <legend>
          <b>Genres&nbsp;</b>
        </legend>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {show.genres.map((genre: number) => (
            <Chip
              label={Object.values(genreMap)[genre - 1]}
              size="small"
              sx={{
                fontSize: 10,
                backgroundColor: "#A1CBFF56",
                color: "#040736",
              }}
              onClick={() => setSelectedGenre(genre)}
            />
          ))}
        </Stack>
      </fieldset>
    </Card>
  );
};

export default ShowPreview;
