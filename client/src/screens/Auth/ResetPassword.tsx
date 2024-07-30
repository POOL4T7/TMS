import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTypedSelector } from '@/redux/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '@/components/Loader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/schema/authSchema';
import { useResetPasswordMutation } from '@/redux/services/auth';

type ResetPassword = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const selector = useTypedSelector((state) => state.authState);
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [URLSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (selector.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [selector.isAuthenticated, navigate]);

  const onSubmit = async (data: ResetPassword) => {
    try {
      console.log('data', URLSearchParams);
      const response = await resetPassword({
        password: data.password,
        resetToken: URLSearchParams.get('resetToken') || '',
      }).unwrap();
      console.log('response', response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            {...register('confirmPassword')}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <Loader size={25} thickness={4} /> : 'Update'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
