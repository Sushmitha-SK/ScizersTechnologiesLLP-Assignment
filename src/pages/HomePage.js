import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Grid, TextField, Pagination, Typography } from '@mui/material';
import { getAllUsers } from '../api/userApi';
import UserCard from '../components/UserCard';
import NavBar from '../components/NavBar';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        getUsers();
    }, [page]);
    const getUsers = async () => {
        try {
            const { users: data, totalCount: count } = await getAllUsers(page, pageSize);
            setUsers(data);
            setTotalCount(count);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch users. Please try again later.');
            console.error(error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <NavBar />
            <div>
                <Container>
                    <div style={{ paddingTop: '5%' }}>
                        <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2%' }}>
                            <TextField
                                variant="outlined"
                                label="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ width: '50%' }}
                                style={{ marginBottom: '20px', fontFamily: 'Noto Sans' }}
                            />
                        </div>

                        {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', textAlign: 'center' }}>
                            <CircularProgress />
                        </div>}
                        {error}
                        {filteredUsers.length === 0 && !loading && (
                            <Typography variant="h6" align="center" style={{ marginTop: '50px', fontFamily: 'Noto Sans', fontWeight: '600', color: '#438DB8' }}>
                                No user found!
                            </Typography>
                        )}
                        {filteredUsers.length > 0 && (
                            <Grid container spacing={4}>
                                {filteredUsers.map(user => (
                                    <Grid item key={user.name} xs={12} sm={6} md={4} lg={3}>
                                        <UserCard user={user} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        {filteredUsers.length > 0 && (
                            <div style={{ marginTop: '50px', paddingBottom: '2%', textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Pagination count={Math.ceil(totalCount / pageSize)} page={page} onChange={handlePageChange} color="primary" sx={{ fontFamily: 'Noto Sans' }} />
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
};

export default HomePage;
