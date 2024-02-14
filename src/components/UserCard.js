import React, { useEffect, useState } from 'react';
import { getRandomPicture } from '../api/userApi';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';

const UserCard = ({ user }) => {
    const [imgUrl, setImgUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRandomImage();
    }, []);

    const getRandomImage = async () => {
        try {
            const getImage = await getRandomPicture();
            setImgUrl(getImage);
            setLoading(false);
        } catch (error) {
            console.error('Error loading image', error);
        }
    };

    return (
        <Card
            style={{
                height: '100%',
                borderRadius: '25px',
                boxShadow:
                    'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                backgroundColor: user.hair_color
            }}
        >
            {loading ? (
                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    height: '200px', textAlign: 'center'
                }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <img src={imgUrl} alt="User" style={{ width: '100%', height: 'auto' }} />
                    <CardContent>
                        <Typography variant="body1" component="div">
                            <Box fontWeight="bold" color="#FF6600" fontFamily="Noto Sans">
                                Name: {user.name}
                            </Box>
                        </Typography>
                        <Typography variant="body1" component="div" style={{ fontSize: '0.9rem', fontFamily: 'Noto Sans', color: '#8A898E' }}>
                            Hair Color: {user.hair_color}
                        </Typography>
                        <Typography variant="body1" component="div" style={{ fontSize: '0.9rem', fontFamily: 'Noto Sans', color: '#8A898E' }}>
                            Skin Color: {user.skin_color}
                        </Typography>
                        <Typography variant="body1" component="div" style={{ fontSize: '0.9rem', fontFamily: 'Noto Sans', color: '#8A898E' }}>
                            Gender: {user.gender}
                        </Typography>
                        <Typography variant="body1" component="div" style={{ fontSize: '0.9rem', fontFamily: 'Noto Sans', color: '#8A898E' }}>
                            Vehicles Count: {user.vehicles.length}
                        </Typography>
                    </CardContent>
                </>
            )}
        </Card>
    );
};

export default UserCard;
