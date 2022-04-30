import React from 'react'
import styled from 'styled-components'
import {MdClose} from 'react-icons/md'
import { deleteRecentQuote } from '../../../../api/quoteBackend'

const Background = styled.div`
    position: fixed;
    height: 100%;
    width: 1680px;
    left: 0px;
    top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 166, 51, 0.5);
`

const ModalWrap = styled.div`
    width: 700px;
    height: 350px;
    box-shadow: 0 5px 8px 0 rgba(100, 30, 22, 0.3), 0 7px 20px 0 rgba(100, 30, 22, 0.5);
    background: #fff;
    display: flex;
    position: absolute;
    z-index: 10;
    border-radius: 10px;
    justify-content: center;
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

export const Modal = ({showModal, setShowModal, userID, suggestedPrice, total}) => {
    return(
        <>
            {showModal ? (
                <Background>
                    <ModalWrap showModal={showModal}>
                        <ModalContent>
                            <h1 style={{marginTop: '25px'}}>Are you sure you would like to save?</h1>
                            <p style={{marginTop: '5px'}}>
                                <div className='Prices-Display'>
                                    <div className="SPrice-Display">
                                        <label>Suggested Price:</label>
                                        <p><b>${suggestedPrice}</b></p>
                                    </div>
                                    <div className="TPrice-Display">
                                        <label>Total Price:</label>
                                        <p><b>${total}</b></p>
                                    </div> 
                                    <p>Do you want to save this quote to the database?</p>
                                </div>
                            </p>
                            <div style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '75px'}} >
                                <button style={{marginRight: '45px'}} onClick={() => setShowModal (prev => !prev)}>Yes</button>
                                <button onClick={() => {
                                    deleteRecentQuote(userID);
                                    setShowModal (prev => !prev);
                                }}>No</button>
                            </div>
                        </ModalContent>
                        <CloseModal onClick={() => {setShowModal (prev => !prev);}}></CloseModal>
                    </ModalWrap>
                </Background>
            ) : null}
        </>
    )
};