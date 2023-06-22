import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEmployeesStore } from "../../../store/modules/hooks/useEmployeesStore"
import { ModulesLayout } from "../../ui/ModulesLayout"
import "./Employees.css"
import { LoadingSpinner } from "../../../components"
import ReactPaginate from "react-paginate"

export const Employees = () => {
  const {
    employees,
    isLoading,
    startLoadEmployees,
    startSetAcitveEmployee,
  } = useEmployeesStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 7

  const filteredData = employees.filter(
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

  const onCreateEmployee = () => {
    startSetAcitveEmployee({
      id: 0,
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    })
    navigate("formEmployee")
  }

  const onUpdateEmployee = (rowData) => {
    startSetAcitveEmployee(rowData)
    navigate("formEmployee")
  }

  useEffect(() => {
    startLoadEmployees()
    document.title = "Empleados"
  }, [])

  if (isLoading === true) {
    return <LoadingSpinner />
  }

  return (
    <ModulesLayout>
      <div className="packages-header">
        <div className="packages-header-left">
          <h2>Empleados</h2>
          <button onClick={onCreateEmployee}>Crear Empleados</button>
        </div>
        <div className="packages-header-rigth">
          <input
            type="text"
            placeholder="Buscar Empleados"
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
      <div className="packages-content">
        <table className="packages-content-table">
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
                  {/*<span
                    className="material-symbols-outlined"
                    onClick={() => onUpdateEmployee(rep)}
                  >
                    edit
                  </span>*/}
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