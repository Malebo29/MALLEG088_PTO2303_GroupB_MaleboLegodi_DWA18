import { Box, Typography, Button, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Divider, Stack, Container } from "@mui/material";
import { useShowsContext } from "../../context/ShowsContext";
import Logo from "../../assets/android-chrome-192x192.png";
// import Logo from "../../assets/android-chrome-192x192.png";
import HeaderMenuIcon from "./HeaderMenuIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../auth/supabase.service";
 
const drawerWidth = 240;
type Props = {
    window?: ()=>Window;
}
 
export const Header = (props: Props) =>{
    const { pathname } = useLocation()
    const { mobileMenuOpen, setMobileMenuOpen } = useShowsContext()
    const { window } = props
    const handleDrawerToggle = ()=>{
        setMobileMenuOpen(!mobileMenuOpen)
    };
    

    const container = window !== undefined ? ()=> window().document.body: undefined;
    if( pathname == '/signin' || pathname == '/register' || pathname === '/forgot-password' || pathname === '/user-profile'  || pathname === '/settings'){
        return null
    }

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

                        {sessionStorage.getItem('token') != null ?
                            <a href="/profile">My Profile</a> :
                            <a href="/signin">Sign In</a>
                        }
                        <Divider sx={{width:"100%"}}/>
                        <a href="#">Manage Fovourites</a>
                       
                        <Divider sx={{width:"100%"}}/>
                        <a href="#">Preferences</a>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        display: 'block',
                        justifyItems:'flex-end'
                    }}
                    >

                </Box>
        </Container>
    )
    
    const navigate = useNavigate()
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
                    { sessionStorage.getItem('token') != null ? <Button
                        variant="text"
                        sx={{display: {xs:"none", sm:"block"}, backgroundColor: "#A1CBFF", margin: 1, width: "100%", color: "#040736"}}
                        onClick={()=>{
                            supabase.auth.signOut()
                            sessionStorage.removeItem('token')
                        
                        }}
                        >
                            <span>
                              Signout
                            </span>
                    </Button>:
                    <Button
                    variant="text"
                    onClick={()=> navigate('/signin')}
                    sx={{display: {xs:"none", sm:"block"}, backgroundColor: "#A1CBFF", margin: 1, width: "100%", color: "#040736"}}
                    >
                        <span>
                            SignIn 
                        </span>
                </Button>
                    }
                    

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