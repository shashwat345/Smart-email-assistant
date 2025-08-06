import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios'; // Import axios
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    setGeneratedReply(''); // Clear previous generated reply
    try {
      // Replace the simulated API call with an actual axios call
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(response.data.reply); // Assuming your backend returns { reply: "..." }
    } catch (err) {
      setError('Failed to generate reply. Please try again.');
      console.error('API Error:', err); // Log the full error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tone-select-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-select-label"
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24}/> : "Generate Reply"}
        </Button>

        {/* Display Generated Reply */}
        {generatedReply && (
          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px', bgcolor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom>
              Generated Reply:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}> {/* Use pre-wrap for line breaks */}
              {generatedReply}
            </Typography>
            <Button
              variant='outlined'
              sx={{ mt: 2 }}
              onClick={() => {
                // Using document.execCommand('copy') for better compatibility in iframes
                const textarea = document.createElement('textarea');
                textarea.value = generatedReply;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                // Optional: Add a visual feedback for copy
                alert('Reply copied to clipboard!');
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}

        {/* Display Error Message */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;
