import { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {

    axiosInstance
      .get("https://login-auth-xqc9.onrender.com/api/products/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`https://login-auth-xqc9.onrender.com/api/products/products/${id}`);
      setProducts(products.filter((product) => product.codigo !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    if (userStatus === 0) {
      navigate("/products");
    }

  },[userStatus])

  return (
    <>
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Codigo
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Descripcion
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Cantidad
                    </th>
                    {isAdmin ? <th scope="col">Acciones</th> : <></>}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.codigo}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.nombre}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.descripcion}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.precio}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.cantidad}
                      </td>

                      {isAdmin ? (
                        <td>
                          <a
                            href="#"
                            onClick={() => {
                              navigate("/editProduct/" + product.codigo);
                            }}
                            className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            aria-current="page"
                          >
                            Editar
                          </a>
                          <a
                            href="#"
                            onClick={() => {
                              deleteProduct(product.codigo);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            aria-current="page"
                          >
                            Delete
                          </a>
                        </td>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
