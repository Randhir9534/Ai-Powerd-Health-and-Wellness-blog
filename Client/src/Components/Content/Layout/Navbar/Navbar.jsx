import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Bookmarks', path: '/bookmark' },
  { name: 'Reviews', path: '/review' },
  { name: 'Blog', path: '/blog' },
  {name:'Generate-Diet', path:'/diet'},
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Privacy', path: '/privacy-policy' },
];

const settings = [
  { name: 'Registration', path: '/register' },
  { name: 'Login', path: '/login' },
  { name: 'Profile', path: '/profile' },
  { name: 'Logout', path: '/logout' },
];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) navigate(path);
  };
  const userImg=localStorage.getItem('userImg')
  const userName=localStorage.getItem('userName')

  const handleCloseUserMenu = (path) => {
    setAnchorElUser(null);
    if (path === '/logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('userImg');
      localStorage.removeItem('userName');
      navigate('/login');
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#2e7d32',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for Desktop */}
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              mr: 2,
              textDecoration: 'none',
            }}
          >
            <img src="/logoWellness.png" alt="Logo" style={{ height: '70px' }} />
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for Mobile */}
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              flexGrow: 1,
              textDecoration: 'none',
            }}
          >
            <img src="/logoWellness.png" alt="Logo" style={{ height: '65px' }} />
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ justifyContent:"center",gap: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{
                  my: 2,
                  fontSize:"1.1 rem",
                  color: 'white',
                  display: 'block',
                  '&:hover': {
                    backgroundColor: '#1b5e20',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Avatar */}
              <p>{userName}</p>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={`http://localhost:9001/${userImg}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.path)}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            <hr />
            <a style={{textDecoration:"none", color:"green" , marginLeft:"12%" }} target="_blank" rel="noreferrer" href="http://localhost:9001/">Admin</a>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
