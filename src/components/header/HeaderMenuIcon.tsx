
import { Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

type MobileMenuProps = {
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const HeaderMenuIcon = ({ setMobileMenuOpen}: MobileMenuProps) => {
  return (
    <Box 
    sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}
    >
        <Button 
            onClick={()=>setMobileMenuOpen(true)}
            sx={{
                display:"flex",
                justifyContent:"center", 
                alignItems:"center",
                borderRadius:"8px",
                border:"none"
            }}
            >
            <span className='sr-only' hidden>Open main menu</span>
            <MenuIcon  
            sx={{height:"36px", width:"38px", color:"#040736"}}
            aria-hidden="true"
            />
        </Button>
    </Box>  )
}

export default HeaderMenuIcon