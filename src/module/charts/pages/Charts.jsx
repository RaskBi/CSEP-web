import { ModulesLayout } from "../../ui/ModulesLayout"
import { useGetReportData } from "../../charts/helpers/useGetReportData"
import { useGetChartTypeData } from "../../charts/helpers/useGetChartTypeData"
import "./Charts.css"
import { useEffect } from "react"
import { DeliveryReport, PackageType } from "../components"

export const Charts = () => {
  const { packageData, startGetPackages } = useGetReportData()
  const { typeData, valorData, startGetChartTipo } = useGetChartTypeData()

  useEffect(() => {
    document.title = "Graficas"
    startGetPackages()
    startGetChartTipo()
  }, [])

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
        {/*<div className="info">
          <h1>Info</h1>
        </div>*/}
      </div>
    </ModulesLayout>
  )
}
