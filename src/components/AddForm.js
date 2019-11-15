import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";

function AddForm() {
  return(
<div>
     <label>NAZWA</label>
    <input type="text" placeholder="NAME" id="name" />
    <label>KRÓTKI OPIS</label>
    <input type="text" placeholder="NAME" id="name" />
    <label>ZDJĘCIE</label>
    <input type="text" placeholder="NAME" id="name" />
    <label>ADRES</label>
    <input type="text" placeholder="NAME" id="name" />
    <label>NR KONTAKTOWY</label>
    <input type="text" placeholder="NAME" id="name" />
    <label>DŁUGI OPIS</label>
    <textarea type="text" placeholder="NAME" id="name" /> 
   
   </div>)
}

export default AddForm;
