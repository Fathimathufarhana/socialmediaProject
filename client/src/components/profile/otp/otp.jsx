import React, { useState } from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs';
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import { successToast } from '../../../Toast/Toast';
import { auth } from './firebase.config';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [showotp, setShowotp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          onSignUP();
        },
        'expired-callback': () => {},
      }, auth);
    }
  }

  function onSignUP() {
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowotp(true);
        setLoading(false);
        successToast('OTP sent successfully!');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        // Navigate to login page after successful OTP verification
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // Toast an error message when OTP is incorrect
        toast.error('Incorrect OTP. Please try again.');
      });
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="primary.main"
      >
        <div id="recaptcha-container"></div>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Enter OTP
        </Typography>
        <Box bgcolor="white" borderRadius="50%" p={2} mb={2}>
          <BsFillShieldLockFill size={30} />
        </Box>

        {showotp ? (
          <>
            <OtpInput OTPLength={6} otpType="num" disabled={false} value={otp} onChange={setOtp} />
            <Button
              variant="contained"
              color="primary"
              onClick={onOTPVerify}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              {loading && <CircularProgress size={20} />}
              <span>Verify OTP</span>
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Phone Number
            </Typography>
            <PhoneInput country={'in'} value={ph} onChange={setPh} />

            <Button
              variant="contained"
              color="primary"
              onClick={onSignUP}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              {loading && <CircularProgress size={20} />}
              <span>Send SMS</span>
            </Button>
          </>
        )}
        <Toaster toastOptions={{ duration: 4000 }} />
      </Box>
    </Container>
  );
};

export default Otp;
