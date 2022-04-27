import React from 'react'

function Modal(props) {
    
    //modal element
    const modal = document.getElementById('modal');
    //modal open button
    const modalbtn = document.getElementById('modalbtn');
    //close button
    const closebtn = document.getElementsByClassName('closebtn')[0];

    modalbtn.addEventListener('click', closeModal);
    closebtn.addEventListener('click', closeModal);
    
    function openModal(){
        modal.style.display = 'block';
    }
    function closeModal(){
        modal.style.display = "none";
   


    return (
        <div class="modal" id="modal" aria-labelledby="editModal" aria-hidden="true">
            <div class="modalDialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="modalbtn" data-dismiss="modal" aria-label="modalbtn" onclick="closeModal()">
                            <span class="close">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label><b>Flight ID</b></label>
                        <input id="flt_id" placeholder="Flight ID" type="text" maxlength="5" required />
                        <br />
                        <label><b>Departure</b></label>
                        <input id="dep_dte" placeholder="Date" type="date" required />
                        <input id="dep_tme" placeholder="Time" type="time" step="1" required />
                        <input id="dep_arpt" placeholder="Airport" type="text" maxlength="3" required />
                        <br />
                        <label><b>Arrival</b></label>
                        <input id="arv_dte" placeholder="Date" type="date" required />
                        <input id="arv_tme" placeholder="Time" type="time" step="1" required />
                        <input id="arv_arpt" placeholder="Airport" type="text" maxlength="3" required />
                        <br />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="closebtn" data-dismiss="modal" onclick="closeModal()">CANCEL</button>
                        <button type="button" class="savebtn" id="saveedit">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}