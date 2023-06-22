import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePackagesStore } from "../../../store/modules/hooks/usePackagesStore"
import { ModulesLayout } from "../../ui/ModulesLayout"
import { LoadingSpinner } from "../../../components"
import ReactPaginate from "react-paginate"
import "./Packages.css"

export const Packages = () => {
  const { packages, isLoading, startLoadPackages, startSetAcitvePackage } =
    usePackagesStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5

  const filteredData = packages.filter(
    (item) =>
      item.paq_numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paq_estado.includes(searchTerm) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.repartidor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paq_direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paq_fechaCreacion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const dataToShow = filteredData.slice(offset, offset + itemsPerPage);

  const onCreatePackage = () => {
    startSetAcitvePackage({
      id: 0,
      repartidor_add: null,
      user_add: null,
      paq_tip_add: null,
      paq_latitud: "",
      paq_longitud: "",
      paq_telefono: "",
      paq_direccion: "",
      paq_peso: "",
      paq_precio: "",
    })
    navigate("form")
  }

  const onUpdatePackage = (rowData) => {
    startSetAcitvePackage(rowData)
    navigate("form")
  }

  useEffect(() => {
    startLoadPackages()
    document.title = "Paquetes"
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ModulesLayout>
      <div className="packages-header">
        <div className="packages-header-left">
          <h2>Paquetes</h2>
          <button onClick={onCreatePackage}>Crear paquete</button>
        </div>
        <div className="packages-header-rigth">
          <input
            type="text"
            placeholder="Buscar en paquetes ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        </div>
      </div>
      <div className="packages-content">
        <table className="packages-content-table">
          <thead>
            <tr>
              <th>Guia</th>
              <th>Estado</th>
              <th>Remitente</th>
              <th>Repartidor</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Costo</th>
              <th>Fecha de envío</th>
              <th>Hora de envío</th>
              <th>Fecha de recepción</th>
              <th>Hora de recepción</th>
              <th>Foto</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((pack) => (
              <tr key={pack.id}>
                <td>{pack.paq_numero}</td>
                <td>{pack.paq_estado}</td>
                <td>{pack.user}</td>
                <td>{pack.repartidor}</td>
                <td>{pack.paq_direccion}</td>
                <td>{pack.paq_telefono}</td>
                <td>${pack.paq_precio}</td>
                <td>{pack.paq_fechaCreacion}</td>
                <td>{pack.paq_horaCreacion}</td>
                <td>{pack.paq_fechaConfirmacion==null?<img width="70px" src="https://i.gifer.com/origin/6a/6a2dfb96f278692f0900cc08975efe0e_w200.webp"/>: pack.paq_fechaConfirmacion }</td>
                <td>{pack.paq_horaConfirmacion==null?<img width="70px" src="https://i.gifer.com/origin/6a/6a2dfb96f278692f0900cc08975efe0e_w200.webp"/>: pack.paq_horaConfirmacion }</td>
                <td>
                  <img id="img-packages" src={pack.paq_imagen==null? "/img/paquete.png" :pack.paq_imagen} alt="imagen" />
                </td>
                <td>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => onUpdatePackage(pack)}
                  >
                    edit
                  </span>
                  {/*<span className="material-symbols-outlined">
                    disabled_by_default
                  </span>}*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </ModulesLayout>
  )
}
