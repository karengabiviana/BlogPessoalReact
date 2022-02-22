import React, { useState } from "react";
import { TabContext, TabPanel } from "@material-ui/lab";
import { AppBar, Tab, Tabs, Typography, Box } from "@material-ui/core";
import ListaPostagem from "../listaPostagem/ListaPostagem";
import "./TabPostagem.css";

function TabPostagem()
{
    const [value, setValue] = useState("1")
    //responsável pela troca entre os tabs
    function handleChange(event: React.ChangeEvent<{}>, newValue: string)
    {
        setValue(newValue);
    }
    return(
        <>
            <TabContext value={value}>
                <AppBar position="static">
                    <Tabs centered indicatorColor="secondary" onChange={handleChange}>
                        <Tab label="Todas Postagens" value="1" />
                        <Tab label="Sobre Nós" value="2" />
                    </Tabs>
                </AppBar>
                <TabPanel value="1">
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        <ListaPostagem/>
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">
                        Sobre Nós
                    </Typography>
                    <Typography variant="body1" gutterBottom color="textPrimary" align="justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, earum consectetur. Est cumque repellat totam. Expedita illum iste dolor officiis quisquam laborum rerum harum amet modi, facilis libero, ad similique.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sed nam quos velit odio dolor tempora maxime sint assumenda sequi! Possimus magni aliquam repudiandae quae qui fuga totam saepe ipsa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ab officiis, incidunt magni exercitationem deserunt! Corporis similique ipsum vel aut est quibusdam! Voluptates error incidunt repudiandae vitae sunt, aspernatur quis.
                        Enim, dolor? Temporibus rem impedit deleniti corporis illum quibusdam accusantium fuga! Deserunt a vel quis et, libero perferendis inventore, fugit dolore animi consectetur veniam, esse beatae asperiores impedit repudiandae. Consequatur.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus molestias non cupiditate. Repudiandae dolores itaque ullam nobis nostrum tempora iste nesciunt, cum eaque. Itaque error repudiandae corrupti et atque quibusdam.
                        Optio, minus laboriosam soluta cumque est vitae ab aliquam ipsum unde repudiandae eveniet, neque itaque amet, ullam accusantium dolores voluptatum aspernatur! Rem saepe nam illum ipsam reiciendis. Ab, ut architecto!
                    </Typography>
                </TabPanel>
            </TabContext>
        </>
    );
}

export default TabPostagem;