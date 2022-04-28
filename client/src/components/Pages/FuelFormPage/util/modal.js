import React from 'react'
import styled from 'styled-components'
import {MdClose} from 'react-icons/md'

const Background = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 166, 51, 0.5);
`

const ModalWrap = styled.div`
    width: 750px;
    height: 550px;
    box-shadow: 0 5px 8px 0 rgba(100, 30, 22, 0.3), 0 7px 20px 0 rgba(100, 30, 22, 0.5);
    background: #fff;
    display: flex;
    position: absolute;
    z-index: 10;
    border-radius: 10px;
`

const ModalContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    flex-direction: column;

    button{
        background-color: #ff4500;
        color: white;
        font-weight: bold;
        font-size: 1.2em;
        border: none;
        margin-bottom: 2em;
        border-radius: 2em;
        padding: 0.5em 1em;
        width: unset;
        cursor: pointer;
    }
`

const CloseModal = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding 0;
    z-index: 10;
`

export const Modal = ({showModal, setShowModal}) =>{
    return(
        <>
            {showModal ? (
                <Background>
                    <ModalWrap showModal={showModal}>
                        <ModalContent>
                            <h1>Are you sure you would like to save?</h1>
                            <p>Add quote to quote history.</p>
                            <button>Yes</button>
                            <button>No</button>
                        </ModalContent>
                        <CloseModal onClick={() => setShowModal (prev => !prev)}></CloseModal>
                    </ModalWrap>
                </Background>
            ) : null}
        </>
    )
};