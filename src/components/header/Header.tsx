import { Box, Typography, Button, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Divider, Stack, Container } from "@mui/material";
import { useShowsContext } from "../../context/ShowsContext";
import Logo from "../../assets/android-chrome-192x192.png";
import HeaderMenuIcon from "./HeaderMenuIcon";
 
const drawerWidth = 240;
type Props = {
    window?: ()=>Window;
}
 
export const Header = (props: Props) =>{
    const { mobileMenuOpen, setMobileMenuOpen } = useShowsContext()
    const { window } = props
    const handleDrawerToggle = ()=>{
        setMobileMenuOpen(!mobileMenuOpen)
    };
    
    const container = window !== undefined ? ()=> window().document.body: undefined;
 
    const drawer = (
        <Container
            onClick={handleDrawerToggle}
            sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: "#E7F1F9"
                }}>
                    <Box
                        sx={{
                            display: {xs: 'flex',},
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems:"center",
                            paddingY: 5,
                            backgroundColor: '#040736'
                            }}>
                        <img
                            src={Logo}
                            width={64}
                            alt="Podcast"
                            loading="lazy"
                            />
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{color: "#ffffff"}}
                      >
                        Streamer Podcast
                      </Typography>
                </Box>
                <Box
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"space-around",
                    height:"390px",
                    alignItems:"flex-start",
                    paddingLeft: 2,
                    
                }}
                >
                    <Stack
                        sx={{alignItems: "flex-start", gap:"2px"}}
                    >
                        <a href="#">Manage Subscriptions</a>
                        <Divider sx={{width:"100%"}}/>
                        <a href="#">Redeem Gift Card or Code</a>
                        <Divider sx={{width:"100%"}}/>
                        <a href="#">Send Gift Card</a>
                        <Divider sx={{width:"100%"}}/>
                        <a href="#">Add Funds</a>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        display: 'block',
                        justifyItems:'flex-end'
                    }}
                >
                    <Button
                        variant="text"
                        sx={{backgroundColor: "#A1CBFF", width: "100%", color: "#040736"}}
                        >
                            <span>
                                Login <span>&rarr;</span>
                            </span>
                    </Button>
                </Box>
        </Container>
    )
 
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline />
            <AppBar sx={{backgroundColor: "#E7F1F9",}} component="nav">
                <Toolbar>
                    <Box sx={{
                        paddingTop: "1rem",
                        width: "100%",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color:"#040736"
                    }}>
                        <img
                        src={Logo}
                        width={80}
                        alt="Podcast"
                        loading="lazy"
                        />
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{color: "#040736", fontSize: 25}}
                      >
                        Streamer Podcast
                      </Typography>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{display: {sm: 'none'}}}
                        >
                        <HeaderMenuIcon setMobileMenuOpen={setMobileMenuOpen} />
                      </IconButton>
                    </Box>
                    <Box
                    sx={{
                        display: 'block',
                        justifyItems:'flex-end'
                    }}
                >
                    <Button
                        variant="text"
                        sx={{display: {xs:"none", sm:"block"}, backgroundColor: "#A1CBFF", margin: 1, width: "100%", color: "#040736"}}
                        >
                            <span>
                                Login <span>&rarr;</span>
                            </span>
                    </Button>

                </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileMenuOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{keepMounted: true}}
                    sx={{display: { xs: "block", sm:"none"},
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
                }}
                    >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    )
 
}