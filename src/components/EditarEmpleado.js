import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { GrLinkPrevious } from 'react-icons/gr';
import {GrUpdate} from 'react-icons/gr';
import validator from 'validator'

const MySwal = withReactContent(Swal)
const endpoint = 'http://localhost:3000/programming-languages/edit/';
const endpointUpdate = 'http://localhost:3000/programming-languages/';

const EditarEmpleado = () => {

    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [job, setJob] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const [fallo, setFallo] = useState(false)
    const [error, setError] = useState('')
    const [fileimg, setFileimg] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
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
        await axios.put(`${endpointUpdate}${id}`, {
            name: name,
            last_name: last_name,
            job: job,
            phone: phone,
            address: address,
            age: age,
            fileimg: fileimg
        })
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

    useEffect( () =>{
        const getEmployeeById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
               response.data.data.map( (empleado) => (
               setName(empleado.name),
               setLastName(empleado.last_name),
               setJob(empleado.job),
               setPhone(empleado.phone),
               setAddress(empleado.address),
               setAge(empleado.age)
            ))
        }
        getEmployeeById()
    }, [])
  return (
    <div className='container-fluid'>
        <h2 className='text-center'>Edit empleado</h2>
        {
            fallo ? ( <span className='bg-danger p-2 text-white font-weight-bold'>{error}</span>) : ( <span></span>) 
        }
        <form className='mt-3' onSubmit={update}>
        <div className="row mb-2">
                    <div className="col-sm-12 col-md-6">
                        <input value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="First name"/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <input value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="Last name"/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-sm-12 col-md-6">
                        <input value={job}
                        onChange={(e) => setJob(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="job"/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <input  value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="Phone"/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-sm-12 col-md-6">
                        <input value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type='text'
                        className='form-control'
                        placeholder="address"/>
                    </div>
                    <div className="col">
                    <div className="col">
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
                </div>

            <button type='submit' className='btn btn-success'><GrUpdate /></button>
            <Link to={'/'} className='btn btn-primary'><GrLinkPrevious style={{color:'red'}} /></Link>
        </form>
    </div>
  )
}

export default EditarEmpleado
