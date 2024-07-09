/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

const logoStyle = {
	width: '140px',
	height: 'auto',
};

export default function Footer() {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: { xs: 4, sm: 8 },
				py: { xs: 8, sm: 10 },
				textAlign: { sm: 'center', md: 'left' },
				backgroundColor: 'white',
				maxWidth: '100vw !important',
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
					width: '100%',
					justifyContent: 'space-between',
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 4,
						minWidth: { xs: '100%', sm: '60%' },
						// padding:'20px 100px 20px 100px',
					}}>
					<Box sx={{ width: { xs: '100%', sm: '60%' } }}>
						<Box
							sx={{
								ml: '-15px',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}>
							<img
								src='/logo.png'
								style={logoStyle}
								alt='Traventure'
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								pt: { xs: 4, sm: 8 },
								width: '100%',
								borderColor: 'divider',
							}}></Box>
					</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						width: '300px',
						justifyContent: 'space-evenly',
					}}>
					<Box
						sx={{
							display: { xs: 'none', sm: 'flex' },
							flexDirection: 'column',
							alignItems: 'flex-start',
							gap: 1,
						}}>
						<Typography variant='body2' fontWeight={600}>
							Navigation
						</Typography>
						<Link color='text.secondary' href='/'>
							Home
						</Link>
						<Link color='text.secondary' href='/post'>
							Posts
						</Link>
						<Link color='text.secondary' href='/about'>
							About
						</Link>
					</Box>
					<Box
						sx={{
							display: { xs: 'none', sm: 'flex' },
							flexDirection: 'column',
              alignItems: 'flex-start',
							gap: 1,
						}}>
						<Typography variant='body2' fontWeight={600}>
							Legal
						</Typography>
						<Link color='text.secondary' href='#'>
							Terms
						</Link>
						<Link color='text.secondary' href='#'>
							Privacy
						</Link>
						<Link color='text.secondary' href='#'>
							Contact
						</Link>
					</Box>
				</Box>
        
			</Box>
      <Box sx={{
        borderTop: '1px solid gray',
        width: '80vh',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://x.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
        </Box>
		</Container>
	);
}
