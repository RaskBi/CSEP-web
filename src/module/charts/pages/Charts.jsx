import { ModulesLayout } from "../../ui/ModulesLayout"
import { useGetReportData } from "../../charts/helpers/useGetReportData"
import "./Charts.css"
import { useEffect, useState } from "react"
import Select from "react-select"
import { CostChart, DeliveryReport, PackageType } from "../components"
import { library } from "../helpers/library"

export const Charts = () => {
  const {
    packageData,
    typeData,
    valorData,
    remitente,
    cost,
    costLabel,
    startGetPackages,
    startGetChartTipo,
    getRemitente,
    startGetCost,
  } = useGetReportData()

  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`

  /* Fechas */
  const [fechaIni, setFechaIni] = useState(formattedDate)
  const [fechaFin, setFechaFin] = useState(formattedDate)
  const [usuario, setUsuario] = useState(null)

  const onGetRemitente = async (event) => {
    console.log(event)
    setUsuario(event)
  }

  useEffect(() => {
    var filterData = {
      usuario: usuario,
    }
    if (fechaFin == formattedDate && fechaIni == formattedDate) {
      startGetPackages(filterData)
      startGetChartTipo(filterData)
      startGetCost(filterData)
    } else {
      filterData.fecha_inicio = fechaIni
      filterData.fecha_fin = fechaFin
      startGetPackages(filterData)
      startGetChartTipo(filterData)
      startGetCost(filterData)
    }
  }, [fechaIni, fechaFin, usuario])
  useEffect(() => {
    document.title = "Gráficas"
    getRemitente()
  }, [])

  const handleGeneratePdf = () => {
    const elementPDF = document.getElementById('pdf');
    var h2p = new html2pdf(); // Aquí se debe crear una instancia de html2pdf

    const opt = {
      filename: 'Graficas.pdf', // Puedes eliminar el ".pdf" del nombre, ya que se establecerá el formato automáticamente
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: {
        scale:  3,
        logging: true,
        letterRendering: true,
        useCORS: true,
      },
      jsPDF: {
        unit: 'in',
        format: [5, 16],
        orientation: 'l',
      },
    };

    // En lugar de guardar el PDF directamente, creamos un blob y lo abrimos en una nueva pestaña
    html2pdf().set(opt).from(elementPDF).toPdf().output('blob').then((pdfBlob) => {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank'); // Abrir el PDF en una nueva pestaña
    });
  };

  return (
    <ModulesLayout>
      <div id="pdf" className="content">
        <div className="char">
          <h1>Gráficas</h1>

          <div className="charts">
            <DeliveryReport
              labelsChart={["Entregados", "No Entregados"]}
              dataChart={packageData}
            />
            <PackageType typeData={typeData} valorData={valorData} />
            <CostChart costLabel={costLabel} costData={cost} />
          </div>
        </div>
        <div className="info">
          <h1>Filtros de Gráficas</h1>
          <label>Fecha inicial</label>
          <input
            type="date"
            placeholder="Fecha inicial"
            value={fechaIni}
            onChange={(e) => setFechaIni(e.target.value)}
          />
          <br />
          <label>Fecha final</label>
          <input
            type="date"
            placeholder="Fecha final"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <br />
          <label>Usuario</label>
          <Select
            className="packages-select-search-r"
            placeholder="Remitente"
            options={remitente}
            onChange={onGetRemitente}
            style={{
              width: "200px !important",
            }}
          />
          <br />
          <button onClick={handleGeneratePdf}>Generar PDF</button>
        </div>
      </div>
    </ModulesLayout>
  )
}
