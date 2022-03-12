import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Button,Box } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import CadastroPostagem from "../cadastroPostagem/CadastroPostagem";
import './ModalPostagem';
import '../../../Style Global.css';


// Responsável por centralizar o modal
function getModalStyle()
{
    const top = 50;
    const left = 50;

    return{
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

//configura outras questões de estilo
const useStyles = makeStyles((theme: Theme) =>
createStyles({
        paper: 
        {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing( 2, 4, 3),
        },
    }),
);

function ModalPostagem()
{
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    // conteúdo do pop-up
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <CadastroPostagem /> {/* Importação do arquivo CadastroPostagem para dentro do corpo construido aqui */}
        </div>
    );

    return(
        <div>
            <Button variant="outlined" className="bottonPrimary" onClick={handleOpen}>
                Nova Postagem
            </Button>
            {/* Rederização do Body */}
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                {body}
            </Modal>
        </div>
    );
}

export default ModalPostagem;