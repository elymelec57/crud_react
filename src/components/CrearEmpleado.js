import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { GrLinkPrevious } from 'react-icons/gr';
import {IoIosSave} from 'react-icons/io';
import validator from 'validator'

const MySwal = withReactContent(Swal)

const endpoint = 'http://localhost:3000/programming-languages/'
const file = 'http://localhost:3000/programming-languages/uploadimg'
const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

const CrearEmpleado = () => {

    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [job, setJob] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [fileimg, setFileimg] = useState(null)
    /*const [address, setAddress] = useState({
        value: "",
        hasError: false
    })*/
    const [fallo, setFallo] = useState(false)
    const [error, setError] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault();
        if(!name.trim()){
            setFallo(true)
            setError('Nombre es requerido')
            return;
        }
        if(!last_name.trim()){
            setFallo(true)
            setError('Apellido es requerido')
            return;
        }
        if(!job.trim()){
            setFallo(true)
            setError('Profesión es requerido')
            return;
        }
        if(!address.trim()){
            setFallo(true)
            setError('Email es requerido')
            return;
        }
        if(!phone.trim()){
            setFallo(true)
            setError('Celular es requerido')
            return;
        }
        if(!age.trim()){
            setFallo(true)
            setError('edad es requerido')
            return;
        }
        if(fileimg == null){
            setFallo(true)
            setError('imagen es requerido')
            return;
        }
        if (!validator.isEmail(address)) {
            setFallo(true)
            setError('Email no valido')
            return;
        }
        
        await axios.post(endpoint, { name: name, last_name: last_name, job: job, phone: phone, address: address, age: age, fileimg: fileimg})
        MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        
        navigate('/')

    }

    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            setFileimg(event.target.result)
        }
    }
    
    return (
        <div className='container-fluid'>
            <h2 className='text-center'>Crear nuevo empleado</h2>
            {
                fallo ? ( <span className='bg-danger p-2 text-white font-weight-bold'>{error}</span>) : ( <span></span>) 
            }
            <form className='mt-3' onSubmit={store} encType="multipart/form-data"  id="imageForm">
                <div className="row mb-2">
                    <div className="col-sm-12 col-md-6">
                        <input value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder="Nombre"/>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <input value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="Apellido"/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-sm-12 col-md-6">
                        <input value={job}
                        onChange={(e) => setJob(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="Profesión"/>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <input  value={phone.value}
                        onChange={(e) => setPhone(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="Celular"/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-sm-12 col-md-6">
                        <input value={address.value}
                        onChange={(e) => setAddress(e.target.value)}
                        /*onBlur={handleBlur}*/ 
                        type='text'
                        className='form-control'
                        aria-errormessage="emailErrorID"
                        aria-invalid={address.hasError}
                        placeholder="Email"
                         />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="row mb-2">
                            <div className="col-sm-12 col-md-6">
                                <input value={age}
                                onChange={(e) => setAge(e.target.value)}
                                type='text'
                                className='form-control'
                                placeholder="Edad"/>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <input 
                                onChange={onFileChange}
                                type='file'
                                label='file'
                                name='fileimg'
                                className='form-control'
                                placeholder="Edad"/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type='submit' className='btn btn-success'><IoIosSave /></button>
                <Link to={'/'} className='btn btn-primary'><GrLinkPrevious /></Link>
            </form>
        </div>
    )
}

export default CrearEmpleado
