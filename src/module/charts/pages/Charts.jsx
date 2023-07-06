import { ModulesLayout } from "../../ui/ModulesLayout"
import { useGetReportData } from "../../charts/helpers/useGetReportData"
import "./Charts.css"
import { useEffect, useState } from "react"
import { DeliveryReport, PackageType } from "../components"

export const Charts = () => {
  const {
    packageData,
    typeData,
    valorData,
    startGetPackages,
    startGetChartTipo,
  } = useGetReportData()


  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`


  /* Fechas */
  const [fechaIni, setFechaIni] = useState(formattedDate)
  const [fechaFin, setFechaFin] = useState(formattedDate)



  useEffect(() => {
    document.title = "Graficas"
    const filterData = {
      fecha_inicio: fechaIni,
      fecha_fin: fechaFin,
    }
    if(fechaFin == formattedDate && fechaIni == formattedDate){
      startGetPackages()
      startGetChartTipo()
    }else{
      startGetPackages(filterData)
      startGetChartTipo(filterData)
    }
  }, [fechaIni,fechaFin])

  return (
    <ModulesLayout>
      <div className="content">
        <div className="char">
          <h1>Graficas</h1>

          <div className="charts">
            <DeliveryReport
              labelsChart={["Entregados", "No Entregados"]}
              dataChart={packageData}
            />
            <PackageType typeData={typeData} valorData={valorData} />
          </div>
        </div>
        <div className="info">
          <h1>Info</h1>
          <input
            type="date"
            placeholder="Fecha inicial"
            value={fechaIni}
            onChange={(e) => setFechaIni(e.target.value)}
          />
          <input
            type="date"
            placeholder="Fecha final"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
      </div>
    </ModulesLayout>
  )
}
