import { Box, Container } from "@mui/material";
import Header from "../../organisms/Header/Header";

const DashboardLayout = ({ children, user, onLogout }) => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header user={user} onLogout={onLogout} />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default DashboardLayout;
