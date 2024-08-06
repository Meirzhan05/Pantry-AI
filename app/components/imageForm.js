import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@mui/material';
import OpenAI from 'openai';
import { visionPrompt } from './prompt';
import { addItem } from '../actions';
import { UserAuth } from '../context/AuthContext';
const client = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY, dangerouslyAllowBrowser: true});

const ImageForm =  ({ imgSrc, open, setIsOpen }) => {
    if (!imgSrc) {
        return null;
    }

    const { user } = UserAuth()
    const getCompletion = async () => {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: {
                "type": "json_object"
            },
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                        "type": "text", 
                        "text": visionPrompt
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": imgSrc,
                            },
                        },
                    ]                    
                }
            ]
        });
        const item = JSON.parse(response.choices[0].message.content);
        console.log(item.name, item.quantity);
        addItem(user, item);
    }
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        await getCompletion()
        handleClose();
    };

    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <img src={imgSrc} alt="Image" style={{ width: '100%', height: 'auto' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ImageForm;