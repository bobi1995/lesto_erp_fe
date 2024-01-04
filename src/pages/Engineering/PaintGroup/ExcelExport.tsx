import { downloadExcel } from "react-export-table-to-excel";

const ExcelExport = ({
  data,
  paint,
  totalQuadrature,
}: {
  data: any;
  paint: {
    paintDesc: string;
    paint: string;
  };
  totalQuadrature: number;
}) => {
  const head = ["Hi"];
  const header = [
    "Поръчка",
    "SFC",
    "Артикул",
    "Описание",
    "Код боя",
    "Бройка",
    "Квадратура",
    "Общо",
    "Технология",
  ];

  const body = data.map((el: any) => {
    return {
      sales: el.Sales,
      poNo: el.ProductionOrder,
      item: el.Item,
      itemDesc: el.ItemDescription,
      paint: el.PaintCode,
      quantity: el.Quantity,
      quadrature: el.Quadrature,
      total: el.Quantity * el.Quadrature,
      technology: el.Technology,
    };
  });
  body.push({
    sales: "",
    poNo: "",
    item: "",
    itemDesc: "",
    paint: "",
    quantity: "",
    quadrature: paint.paintDesc,
    total: totalQuadrature,
    technology: "",
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: `${paint.paint}`,
      sheet: "Групирани поръчки",
      tablePayload: {
        header,
        body: body,
      },
    });
  }

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <button onClick={handleDownloadExcel}>Експортирай</button>
    </div>
  );
};

export default ExcelExport;
