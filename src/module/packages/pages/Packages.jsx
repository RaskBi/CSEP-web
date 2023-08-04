import { useEffect, useState } from "react"
import Select from "react-select"
import { useNavigate } from "react-router-dom"
import { usePackagesStore } from "../../../store/modules/hooks/usePackagesStore"
import { ModulesLayout } from "../../ui/ModulesLayout"
import { LoadingSpinner } from "../../../components"
import { useGetComboBox } from "../helpers/useGetComboBox"
import ReactPaginate from "react-paginate"
import "./Packages.css"

export const Packages = () => {
  const { remitente, repartidor: repart} = useGetComboBox()
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectRepartidor, setSelectRepartidor] = useState({})
  const [selectUsuario, setSelectUsuario] = useState({})

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleRowClick = (pack) => {
    setSelectedPackage(pack);
    setIsBoxOpen(true);
  };

  const onCloseBox = () => {
    setIsBoxOpen(false);
  };

  const handleChange = (option) => {
    setSelectedOption(option)
  }

  const {
    packages,
    isLoading,
    repartidor_add,
    user_add,
    startLoadPackages,
    startSetAcitvePackage,
    startReport,
    startReportR,
    startReportU,
  } = usePackagesStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

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

  const offset = currentPage * itemsPerPage
  const pageCount = Math.ceil(filteredData.length / itemsPerPage)
  const dataToShow = filteredData.slice(offset, offset + itemsPerPage)

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
  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value)
  }

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value)
  }

  const handleReportClick = () => {
    const reportData = {
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    }
    startReport(reportData)
  }
  const submitReport = () => {
    const data = {
      repartidor_add: selectRepartidor,
    }
    startReportR(data)
  }

  const submitReportU = () => {
    const data = {
      user_add: selectUsuario,
    }
    startReportU(data)
  }

  useEffect(() => {
    startLoadPackages()
    document.title = "Paquetes"
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`
    setFechaInicio(formattedDate)
    setFechaFin(formattedDate)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ModulesLayout>
      <div className="packages-header">
        <div className="packages-header-left">
          <div>
            <h2>Paquetes</h2>
            <button onClick={onCreatePackage}>Crear paquete</button>
          </div>
          <div className="packages-header-leftR-reporte">
            <div className="comboboxFiltro">
              <Select
                value={selectedOption}
                placeholder="Filtrar reporte por..."
                onChange={handleChange}
                options={[
                  { value: "fecha", label: "Fecha" },
                  { value: "repartidor", label: "Repartidor" },
                  { value: "usuario", label: "Remitente" },
                ]}
              />
              <div className="filtro">
                {selectedOption && selectedOption.value === "fecha" && (
                  <div className="fecha">
                    <div className="packages-header-leftR-report">
                      <div className="input-group">
                        <label htmlFor="fechaInicio">Fecha de inicio:</label>
                        <input
                          type="date"
                          id="fechaInicio"
                          value={fechaInicio}
                          onChange={handleFechaInicioChange}
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="fechaFin">Fecha de fin:</label>
                        <input
                          type="date"
                          id="fechaFin"
                          value={fechaFin}
                          onChange={handleFechaFinChange}
                        />
                      </div>
                      <button onClick={handleReportClick}>
                        Generar Reporte
                      </button>
                    </div>
                  </div>
                )}
                {selectedOption && selectedOption.value === "repartidor" && (
                  <div className="repartidor">
                    <div className="packages-header-leftR-report-repartidor">
                      <label>Repartidor</label>
                      <Select
                        value={repartidor_add}
                        options={repart}
                        className="packages-select-search-r"
                        placeholder="Repartidor"
                        onChange={setSelectRepartidor}
                        style={{
                          width: "200px !important",
                        }}
                      />
                      <button onClick={submitReport}>Generar Reporte</button>
                    </div>
                  </div>
                )}
                {selectedOption && selectedOption.value === "usuario" && (
                  <div className="usuario">
                    <div className="packages-header-leftR-report-repartidor">
                      <label>Remitente</label>
                      <Select
                        value={user_add}
                        options={remitente}
                        className="packages-select-search-r"
                        placeholder="Remitente"
                        onChange={setSelectUsuario}
                        style={{
                          width: "200px !important",
                        }}
                      />
                      <button onClick={submitReportU}>Generar Reporte</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
              <th>BarCode</th>
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
              <th>Foto entrega</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((pack) => (
              <tr key={pack.id} >
                <td onClick={() => handleRowClick(pack)}>{pack.paq_numero}</td>
                <td><a href={pack.paq_barCode} target="_blank"><img
                      id="bar-packages"
                      src={pack.paq_barCode}
                    /></a></td>
                <td>{pack.paq_estado}</td>
                <td>{pack.full_name_user}</td>
                <td>{pack.full_name_repartidor}</td>
                <td>{pack.paq_direccion}</td>
                <td>{pack.paq_telefono}</td>
                <td>${pack.paq_precio}</td>
                <td>{pack.paq_fechaCreacion}</td>
                <td>{pack.paq_horaCreacion}</td>
                <td>
                  {pack.paq_fechaConfirmacion == null ? (
                    <img
                      width="70px"
                      src="https://media.tenor.com/se7cU4QJ0KAAAAAi/delivery.gif"
                    />
                  ) : (
                    pack.paq_fechaConfirmacion
                  )}
                </td>
                <td>
                  {pack.paq_horaConfirmacion == null ? (
                    <img
                      width="70px"
                      src="https://media.tenor.com/se7cU4QJ0KAAAAAi/delivery.gif"
                    />
                  ) : (
                    pack.paq_horaConfirmacion
                  )}
                </td>
                <td>
                  <img
                    id="img-packages"
                    src={
                      pack.paq_imagen == null
                        ? "/img/paquete.png"
                        : pack.paq_imagen
                    }
                    alt="imagen"
                  />
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
      {/* Cuadro modal para mostrar los detalles del paquete seleccionado */}
      {isBoxOpen && selectedPackage && (
        <div className="modal-box">
          <div className="modal-content">
            <h2>Detalles del Paquete</h2>
            <div className="modal-content-columns">
              <div className="modal-column">
                <p><strong>Guia:</strong> {selectedPackage.paq_numero}</p>
                <p><strong>Estado:</strong> {selectedPackage.paq_estado}</p>
                <p><strong>Remitente:</strong> {selectedPackage.full_name_user}</p>
                <p><strong>Repartidor:</strong> {selectedPackage.full_name_repartidor}</p>
                <p><strong>Dirección:</strong> {selectedPackage.paq_direccion}</p>
                <p><strong>Teléfono:</strong> {selectedPackage.paq_telefono}</p>
                <p><strong>Costo:</strong> ${selectedPackage.paq_precio}</p>
              </div>
              <div className="modal-column">
                <p><strong>Fecha de envío:</strong> {selectedPackage.paq_fechaCreacion}</p>
                <p><strong>Hora de envío:</strong> {selectedPackage.paq_horaCreacion}</p>
                <p><strong>Fecha de recepción:</strong> {selectedPackage.paq_fechaConfirmacion || "No disponible"}</p>
                <p><strong>Hora de recepción:</strong> {selectedPackage.paq_horaConfirmacion || "No disponible"}</p>
              </div>
            </div>
                <p><strong>Foto de entrega:</strong></p>
                <img
                  id="img-packages-modal"
                  src={selectedPackage.paq_imagen === null ? "/img/paquete.png" : selectedPackage.paq_imagen}
                  alt="imagen"
                />
            <button onClick={onCloseBox}>Cerrar</button>
          </div>
        </div>
      )}
    </ModulesLayout>
  )
}
