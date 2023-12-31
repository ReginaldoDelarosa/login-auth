import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
function ProductsCreation(props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('0');
  const [cantidad, setCantidad] = useState('0');
  const [isAdmin, setIsAdmin] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();
  const {id } = useParams();
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const getUser = async () => {
    try {
      const { data } = await axiosInstance.post(
        "https://login-auth-xqc9.onrender.com/api/auth/getUser"
      );
      if (setIsAdmin) {
        setIsAdmin(data.user.status);
        setUserStatus(data.user.status);

      }
    } catch (error) {
      navigate("/products");
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
    getUser();
    if (userStatus === 0) {
      navigate("/products");
    }

  },[userStatus])

  const getProduct = async () => {
    try {

      const response = await axiosInstance.get(`https://login-auth-xqc9.onrender.com/api/products/products/${id}`);
      setNombre(response.data.nombre);
      setDescripcion(response.data.descripcion);
      setPrecio(response.data.precio);
      setCantidad(response.data.cantidad);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = () => {
    // Llamar a la función createProduct con los valores obtenidos
    createProduct(nombre, descripcion, precio, cantidad);
    Swal.fire({
      icon: "success",
      title: "Producto creado con éxito",
      showConfirmButton: false,
      timer: 1500,
  })
   
  };
  const handleUpdate = () => {
    updateProduct(nombre, descripcion,precio, cantidad);
    Swal.fire({
      icon: "success",
      title: "Producto actualizado con éxito",
      showConfirmButton: false,
      timer: 1500,
  }).then(() => {

      navigate("/products");
  });
  }

  const createProduct = async (nombre, descripcion, precio, cantidad) => {
    try {
      const response = await axiosInstance.post('https://login-auth-xqc9.onrender.com/api/products/products/', {
        nombre,
        descripcion,
        precio,
        cantidad,
      });
  
      if (response.status === 200) {
        console.log('Producto creado con éxito');
      } else {
        console.error('Error al crear el producto');
      }
    } catch (error) {
      console.log(error)
      console.error('Error al crear el producto');
    }
  };
  const updateProduct = async (nombre, descripcion, precio, cantidad) => {
    try {
      const response = await axiosInstance.patch(`https://login-auth-xqc9.onrender.com/api/products/products/${id}`, {
        nombre,
        descripcion,
        precio,
        cantidad,
      });
  
      if (response.status === 204) {
        console.log('Producto creado con éxito');
      } else {
        console.error('Error al actualizar el producto');
      }
    } catch (error) {
      console.log(error)
      console.error('Error al actualizar el producto');
    }
  };

  return (
    <div className={"dark:bg-gray-900 pb-20 "}>
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin} />

      <form   className="max-w-sm mx-auto" style={{gap: "1rem"}}>
    
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name-input"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Product Description
          </label>
          <input
            type="text"
            id="description-input"
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price-input"
            onChange={(e) => setPrecio(e.target.value)}
            value={precio}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Quantity
          </label>
          <input
            type="number"
            id="small-input"
            onChange={(e) => setCantidad(e.target.value)}
            value={cantidad}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

        </div>
        <div >
         <button onClick={id ? handleUpdate : handleSubmit} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{id ? "Update" : "Create"}</button>
        
        </div>
      </form>
    </div>
  );
}
export default ProductsCreation;
