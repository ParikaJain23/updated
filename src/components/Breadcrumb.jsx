import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Divider } from '@mui/material';

const CustomSeparator = ({ items }) => {
  return (
    <>
      <Stack spacing={1}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {items.map((item, index) =>
            index !== items.length - 1 ? (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                href={item.href || '#'}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.onClick) item.onClick();
                }}
                sx={item.style} 
              >
                {item.label}
              </Link>
            ) : (
              <Typography
                key={index}
                color="text.primary"
                sx={item.style} 
              >
                {item.label}
              </Typography>
            )
          )}
        </Breadcrumbs>
      </Stack>
      <Divider sx={{ mt: 1 }} />
    </>
  );
};

export default CustomSeparator;