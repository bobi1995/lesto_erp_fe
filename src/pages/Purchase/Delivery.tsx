import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Details from "./Delivery/Details";

const localizer = momentLocalizer(moment);

const Delivery = () => {
  const [data, setData] = useState([]);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}purchase/expedition`,
        {
          headers: {
            Authorization: "Basic " + localStorage.getItem("erpToken"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={data.map((event: any) => {
          return {
            title: event.ClientOrder,
            allDay: true,
            start: new Date(event.DeliveryDate),
            end: new Date(event.DeliveryDate),
            additionalInfo: {
              OrderNumber: event.OrderNumber,
              DeliveryDate: event.DeliveryDate,
              Client: event.Client,
              ClientOrder: event.ClientOrder,
              Amount: event.Amount,
              Currency: event.Currency,
            },
          };
        })}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => setEvent(event)}
      />
      {event ? (
        <Details event={event.additionalInfo} setEvent={setEvent} />
      ) : null}
    </div>
  );
};

export default Delivery;
