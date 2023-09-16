import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeliveryAgentsStore } from "../../../store/modules/hooks/useDeliveryAgentsStore"
import { ModulesLayout } from "../../ui/ModulesLayout"
import "./DeliveryAgents.css"
import { LoadingSpinner } from "../../../components"
import ReactPaginate from "react-paginate"
import Swal from "sweetalert2"

export const DeliveryAgents = () => {
  const {
    deliveryAgents,
    isLoading,
    startLoadDeliveryAgents,
    startSetAcitveDeliveryAgent,
    startDeleteDeliveryAgent,
  } = useDeliveryAgentsStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [is_active, setIs_active] = useState(true)
  const itemsPerPage = 5

  const filteredData = deliveryAgents.filter(
    (item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cedula_ruc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const offset = currentPage * itemsPerPage
  const pageCount = Math.ceil(filteredData.length / itemsPerPage)
  const dataToShow = filteredData.slice(offset, offset + itemsPerPage)

  const onCreateDeliveryAgent = () => {
    startSetAcitveDeliveryAgent({
      id: 0,
      cedula_ruc: "",
      email: "",
      first_name: "",
      imagen:"",
      last_name: "",
      password: "",
      imagen_upload: { change: false, b64: "", ext: "" },
      username: "",
    })
    navigate("formDelivery")
  }

  const onUpdateDeliveryAgent = (rowData) => {
    startSetAcitveDeliveryAgent(rowData)
    navigate("formDelivery")
  }
  const onDeleteDeliberyAgent = async (rowData) => {
    const mensaje = rowData.is_active ? "Archivar" : "Desarchivar"
    const resp = await Swal.fire({
      title: `Estas seguro que quieres ${mensaje} el Repartidor?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: mensaje
    })
    if (resp.isConfirmed) {
      const data = await startDeleteDeliveryAgent(rowData)
        if (data?.status){
          Swal.fire(
            data.msg,
            '',
            'success'
          )
        }
        startLoadDeliveryAgents(is_active)
    }
  }

  const changeState=()=>{
    if (is_active){
      setIs_active(false)
    }else{
      setIs_active(true)
    }
  }

  useEffect(() => {
    
    document.title = "Repartidores"
  }, [])
  
  useEffect(() => {
    startLoadDeliveryAgents(is_active)
  }, [is_active])
  
  if (isLoading === true) {
    return <LoadingSpinner />
  }

  return (
    <ModulesLayout>
      <div className="delibery-header">
        <div className="delibery-header-left">
          <h2>Repartidores</h2>
          <button onClick={onCreateDeliveryAgent}>Crear repartidores</button>
          <div>
          {
                is_active ?
                <>
                <span className="material-symbols-outlined"
                onClick={() => changeState()}>
                  toggle_off
              </span> Activos
              </>
              :
              <>
              <span className="material-symbols-outlined"
                onClick={() => changeState()}>
                  toggle_on
              </span> Archivados
              </>
              }
          </div>
          
        </div>
        <div className="delibery-header-rigth">
          <input
            type="text"
            placeholder="Buscar repartidores"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            pageRangeDisplayed={3}
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
      <div className="delibery-content">
        <table className="delibery-content-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Username</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cedula</th>
              <th>Correo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((rep) => (
              <tr key={rep.id}>
              <td><img id="img-packages" src={rep.imagen} style={{ borderRadius: "100%" }} alt=""/></td>
                <td>{rep.username}</td>
                <td>{rep.first_name}</td>
                <td>{rep.last_name}</td>
                <td>{rep.cedula_ruc}</td>
                <td>{rep.email}</td>
                <td>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => onUpdateDeliveryAgent(rep)}
                  >
                    edit
                  </span>
                  <span className="material-symbols-outlined"
                  onClick={() => onDeleteDeliberyAgent(rep)}>
                    disabled_by_default
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModulesLayout>
  )
}
