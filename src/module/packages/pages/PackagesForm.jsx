import { useMemo, useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import Search from "react-leaflet-search"
import Select from "react-select"
import { LatLng } from "leaflet"
import { LatLngBounds } from "leaflet"

import { ModulesLayout } from "../../ui/ModulesLayout"
import { useForm } from "../../../hooks/useForm"
import { useGetComboBox } from "../helpers/useGetComboBox"
import { usePackagesStore } from "../../../store/modules/hooks/usePackagesStore"
import { LoadingSpinner } from "../../../components"

import "leaflet/dist/leaflet.css"
import "./PackagesForm.css"
// Mapa
const defaultZoom = 15

export const PackagesForm = () => {
  //Mapa
  const mapRef = useRef()

  const [defaultCenter, setDefaultCenter] = useState([-0.175993, -78.480822])
  const [markerPosition, setMarkerPosition] = useState(defaultCenter)
  const [maxBounds] = useState([
    [-90, -180],
    [90, 180],
  ])
  const providerOptions = {
    searchBounds: new LatLngBounds(
      [-90, -180], // Southwest corner
      [90, 180] // Northeast corner
    ),
    region: "ec", // Set the region to Ecuador
  }
  const [lati, setlat] = useState("")
  const [long, setlong] = useState("")

  const [initialValues, setInitialValues] = useState({
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

  const [calPrice, setCalPrice] = useState("")

  const navigate = useNavigate()

  const { active, isLoading, startSavingPackages } = usePackagesStore()
  const { remitente, repartidor: repart, tipopaquete } = useGetComboBox()

  const {
    formState,
    onInputChange,
    onInputSelect,
    paq_direccion,
    paq_latitud,
    paq_longitud,
    paq_peso,
    /* paq_precio, */
    paq_telefono,
    paq_tip_add,
    repartidor_add,
    user_add,
  } = useForm(initialValues)

  const handleMap = (event) => {
    const { lat, lng } = event.latlng
    setMarkerPosition([lat, lng])
    setlat(lat)
    setlong(lng)
  }

  const onSubmitPackages = (event) => {
    event.preventDefault()
    startSavingPackages({
      ...formState,
      paq_precio: calPrice,
      paq_latitud: lati,
      paq_longitud: long,
    })
  }

  const titleForm = useMemo(() => {
    if (active.id != 0) return `Editar paquete ${active.paq_numero}`
    return "Crear paquete"
  }, [])

  useEffect(() => {
    setCalPrice(formState.paq_peso * formState.paq_tip_add?.valor_tipo)
  }, [formState.paq_tip_add, formState.paq_peso])

  useEffect(() => {
    if (active !== null) {
      setInitialValues({
        ...active,
      })
      if (active.paq_latitud != "" && active.paq_longitud != "") {
        setDefaultCenter([active.paq_latitud, active.paq_longitud])
        setMarkerPosition([active.paq_latitud, active.paq_longitud])
        setlat(active.paq_latitud)
        setlong(active.paq_longitud)
      }
    }
    document.title = titleForm
  }, [])

  if (isLoading === true) {
    return <LoadingSpinner />
  }
  
  return (
    <ModulesLayout>
      <div className="form-map">
        <div className="packages-container">
          <h2>{titleForm}</h2>
          <form onSubmit={onSubmitPackages}>
            <div className="packages-form">
              <div className="packages-form-left">
                <Select
                  value={user_add}
                  onChange={(e) => onInputSelect(e, "user_add")}
                  options={remitente}
                  className="packages-select-search"
                  placeholder="Remitente"
                />
                <Select
                  value={repartidor_add}
                  onChange={(e) => onInputSelect(e, "repartidor_add")}
                  options={repart}
                  className="packages-select-search"
                  placeholder="Repartidor"
                />
                <Select
                  value={paq_tip_add}
                  onChange={(e) => onInputSelect(e, "paq_tip_add")}
                  options={tipopaquete}
                  className="packages-select-search"
                  placeholder="Tipo de paquete"
                />
                <input
                  type="number"
                  placeholder="Peso"
                  name="paq_peso"
                  value={paq_peso}
                  onChange={onInputChange}
                />
              </div>
              <div className="packages-form-rigth">
                <input
                  type="text"
                  placeholder="Direccion"
                  name="paq_direccion"
                  value={paq_direccion}
                  onChange={onInputChange}
                />
                <input
                  type="text"
                  placeholder="Latitud"
                  name="paq_latitud"
                  disabled
                  value={lati}
                />
                <input
                  type="text"
                  placeholder="Longitud"
                  name="paq_longitud"
                  disabled
                  value={long}
                />
                <input
                  type="tel"
                  placeholder="Telefono"
                  name="paq_telefono"
                  value={paq_telefono}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="packages-form-calc">
              <div>
                <span>
                  <strong>Tipo:</strong> {formState.paq_tip_add?.label}
                </span>
                <span>
                  <strong>Peso:</strong>{" "}
                  {formState.paq_peso === "" ? 0 : formState.paq_peso} kg
                </span>
                <span>
                  <strong>Costo:</strong> $ {isNaN(calPrice) ? 0 : calPrice} USD
                </span>
              </div>
            </div>
            <div className="packages-form-button">
              <button
                type="button"
                onClick={() => {
                  navigate("/package")
                }}
              >
                Cancelar
              </button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
        <div>
          <Map
            ref={mapRef}
            center={defaultCenter}
            zoom={defaultZoom}
            onClick={handleMap}
            maxBounds={maxBounds}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markerPosition && (
              <Marker position={markerPosition}>
                <Popup>
                  Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}
                </Popup>
              </Marker>
            )}
            <Search
              position="topleft"
              inputPlaceholder="Buscar ubicación"
              zoom={17}
              closeResultsOnClick={true}
              providerOptions={providerOptions}
            />
          </Map>
        </div>
      </div>
    </ModulesLayout>
  )
}
