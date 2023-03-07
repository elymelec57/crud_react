import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { HiPhotograph } from 'react-icons/hi';


const MySwal = withReactContent(Swal)
const endpoint = 'http://localhost:3000/programming-languages/'

const ShowEmpleado = () => {
    const [employees, setEmployees] = useState([])
    useEffect ( ()=> {
        getAllEmployees()
    }, [])
    const getAllEmployees = async () => {
        const response = await axios.get(`${endpoint}`)
        setEmployees(response.data.data)
    }

    const deleteEmployees = async (id) => {
        await axios.delete(`${endpoint}${id}`)
        getAllEmployees()
    }

    const deleteConfirmEmployee = async (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployees(id)
                MySwal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              
            }
          })
      
    }

    const verPhoto = (photo,name,job) => {
        MySwal.fire({
            title: name,
            text: `Profesión: ${job}`,
            imageUrl: `http://localhost:3000/public/img/${photo}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    }
  return (
    <div className='col-ls-6 table-responsive'>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-sx w-50 mt-2 mb-2 text-white'><AiOutlineUsergroupAdd /></Link>
        </div>
        <table className='table table-striped mt-2'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Job</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
               { employees.map( (empleado) => (
                    <tr key={empleado.id}>
                        <td>{empleado.name}</td>
                        <td>{empleado.last_name}</td>
                        <td>{empleado.job}</td>
                        <td>{empleado.phone}</td>
                        <td>{empleado.address}</td>
                        <td>{empleado.age}</td>
                        <td>
                            <Link to={`/edit/${empleado.id}`} className='btn btn-success'><AiOutlineEdit /></Link>
                            <button onClick={ ()=>verPhoto(empleado.photo,empleado.name,empleado.job)} className='btn btn-primary'><HiPhotograph /></button>
                            <button onClick={ ()=>deleteConfirmEmployee(empleado.id)} className='btn btn-danger'><AiOutlineDelete /></button>
                        </td>
                    </tr>
                ))}      
            </tbody>
        </table>
    </div>
  );
}

export default ShowEmpleado
