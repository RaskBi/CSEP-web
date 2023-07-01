import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeliveryAgentsStore } from "../../../store/modules/hooks/useDeliveryAgentsStore"
import { ModulesLayout } from "../../ui/ModulesLayout"
import "./DeliveryAgents.css"
import { LoadingSpinner } from "../../../components"
import ReactPaginate from "react-paginate"

export const DeliveryAgents = () => {
  const {
    deliveryAgents,
    isLoading,
    startLoadDeliveryAgents,
    startSetAcitveDeliveryAgent,
  } = useDeliveryAgentsStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 7

  const filteredData = deliveryAgents.filter(
    (item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    })
    navigate("formDelivery")
  }

  const onUpdateDeliveryAgent = (rowData) => {
    startSetAcitveDeliveryAgent(rowData)
    navigate("formDelivery")
  }

  useEffect(() => {
    startLoadDeliveryAgents()
    document.title = "Repartidores"
  }, [])

  if (isLoading === true) {
    return <LoadingSpinner />
  }

  return (
    <ModulesLayout>
      <div className="delibery-header">
        <div className="delibery-header-left">
          <h2>Repartidores</h2>
          <button onClick={onCreateDeliveryAgent}>Crear repartidores</button>
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
              <th>Username</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((rep) => (
              <tr key={rep.id}>
                <td>{rep.username}</td>
                <td>{rep.first_name}</td>
                <td>{rep.last_name}</td>
                <td>{rep.email}</td>
                <td>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => onUpdateDeliveryAgent(rep)}
                  >
                    edit
                  </span>
                  {/*<span className="material-symbols-outlined">
                    disabled_by_default
                  </span>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModulesLayout>
  )
}
