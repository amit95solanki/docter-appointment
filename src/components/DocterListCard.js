import * as React from 'react';

import { CardActionArea, Typography, CardContent, Card, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DocterCardList({ doctor }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ color: 'text.primary', bgcolor: 'action.selected', fontWeight: 'fontWeightBold' }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
          >
            Dr.&nbsp; {doctor?.firstName} {doctor?.lastName}
          </Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box display={'flex'} gap={'10px'}>
            <Typography variant="subtitle2" gutterBottom>
              Specialization
            </Typography>
            <Typography variant="body2" gutterBottom>
              {doctor?.specialization}
            </Typography>
          </Box>

          <Box display={'flex'} gap={'10px'}>
            <Typography variant="subtitle2" gutterBottom>
              Experience
            </Typography>
            <Typography variant="body2" gutterBottom>
              {doctor?.experience}
            </Typography>
          </Box>

          <Box display={'flex'} gap={'4px'}>
            <Typography variant="subtitle2" gutterBottom>
              Fees Per Cunsaltation
            </Typography>
            <Typography variant="body2" gutterBottom>
              {doctor?.feesPerCunsaltation}
            </Typography>
          </Box>

          <Box display={'flex'} gap={'10px'}>
            <Typography variant="subtitle2" gutterBottom>
              Timings
            </Typography>
            <Typography variant="body2" gutterBottom>
              body2.
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
