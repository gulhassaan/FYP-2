import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";

const UserProfile = () => {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    location: "New York, USA",
    listings: 10,
    rating: 4.5,
    avatar: "https://example.com/avatar.jpg",
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Paper elevation={3} style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item>
            <img src={user.avatar} alt="Profile Picture" style={{ width: "120px", height: "120px", marginBottom: "20px" }} />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: {user.location}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Listings: {user.listings}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Rating: {user.rating}
            </Typography>
            {/* Additional user profile information can be displayed here */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
