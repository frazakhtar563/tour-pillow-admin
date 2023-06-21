import { Container } from "@mui/material";
import React from "react";
import { Footer, Header } from "./index";
export const Layout = (props) => {
    return (
        <>
            <Header />
            <Container sx={{marginTop:'100px'}}>
            {props.children}
            </Container>
            <Footer />
        </>
    );
}