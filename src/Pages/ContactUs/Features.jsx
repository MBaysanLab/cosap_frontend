import * as React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Typography } from '@mui/material';
import { margin } from '@mui/system';

export default function Features() {

    return (
        <Grid container>
            <Grid item md={1}></Grid>
            <Grid item md={5} sm={12}>
                <Box
                    sx={{
                        pt: 10,
                        display: "block",
                        flexWrap: "wrap",
                        gap: 2,
                        ml: 5,
                        mr: 5
                    }}
                >
                    <Typography
                        variant="h6"
                        align="left"
                        fontSize={20}
                    >
                        Address:
                    </Typography>
                    <Typography
                        align="left"
                        fontSize={14}
                        color="gray"
                    >
                        No. 200, Lab Building, Istanbul Şehir Üniversitesi Dragos Kampüsü, Orhantepe Mahallesi, Turgut Özal Bulvarı, No: 21, Dragos, Kartal - İstanbul
                    </Typography>
                    <Typography
                        variant="h6"
                        align="left"
                        fontSize={20}
                    >
                        Email:
                    </Typography>
                    <Typography
                        align="left"
                        fontSize={14}
                        color="gray"
                    >
                        mehmetbaysan@sehir.edu.tr
                    </Typography>
                </Box>
            </Grid>
            <Grid item md={5} sm={12}>
                <Box
                    sx={{
                        pt: 10,
                        display: "block",
                        flexWrap: "wrap",
                        ml: 5,
                        mr: 5
                    }}
                >
                    <form
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{
                                marginTop: 2,
                                marginBottom: 2
                            }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{
                                marginTop: 2,
                                marginBottom: 2
                            }}
                        />
                        <TextField
                            id="message"
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={8}
                            sx={{
                                marginTop: 2,
                                marginBottom: 2
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Send Email
                        </Button>
                    </form>
                </Box>
            </Grid>
            <Grid item md={1}></Grid>
        </Grid>
        
    )
}
