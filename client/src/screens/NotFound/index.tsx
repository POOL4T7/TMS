import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';
// import { t } from 'i18next';

// import { Link } from 'src/routes/components';

// import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function NotFound() {
  const { t } = useTranslation();

  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({
          xs: theme.spacing(3, 3, 0),
          sm: theme.spacing(5, 5, 0),
        }),
      }}
    >
      {/* <ErrorOutlineIcon /> */}
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            {t('notFound.title')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {t('notFound.description')}
          </Typography>
          <ErrorOutlineIcon
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/" size="large" variant="contained">
            {t('notFound.buttonText')}
          </Button>
        </Box>
      </Container>
    </>
  );
}
