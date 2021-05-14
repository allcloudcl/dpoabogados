import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "@toast-ui/react-calendar";

import { connect } from "react-redux";
import { fetchSchedules } from "../../actions/schedules";
import { fetchCalendars } from "../../actions/calendars";

function AgendaList(props) {

  const calendarRef = useRef(null);

  const handleMovePrevNext = (val) => {
    let calendarInstance = calendarRef.current.getInstance();

    if (val === -1) {
      calendarInstance.prev();
    } else if (val === 1) {
      calendarInstance.next();
    }
  }

  useEffect(() => {
    props.dispatch(fetchCalendars());
    props.dispatch(fetchSchedules());
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Agenda</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/schedules/new" className="btn btn-sm btn-outline-secondary" >
              Nuevo
            </Link>
          </div>
          <div className="btn-group me-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { handleMovePrevNext(-1) }}>
              <FontAwesomeIcon icon={["fas", "arrow-left"]} />
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { handleMovePrevNext(1) }}>
              <FontAwesomeIcon icon={["fas", "arrow-right"]}/>
            </button>
          </div>
        </div>
      </div>
      <div className="agenda">
        <div className="agenda-left">
          <CalendarList calendars={props.calendars} />
        </div>
        <div className="agenda-right">
          <Calendar
            usageStatistics={false}
            useCreationPopup={false}
            useDetailPopup={true}
            ref={calendarRef}
            calendars={props.calendars}
            schedules={props.schedules}
            template={{
              milestoneTitle: () => {
                return "<span class='tui-full-calendar-left-content'>Metas</span>";
              },
              taskTitle: () => {
                return "<span class='tui-full-calendar-left-content'>Tareas</span>";
              },
              alldayTitle: () => {
                return "<span class='tui-full-calendar-left-content'>Todo el día</span>";
              },
              popupEdit: () => {
                return 'Editar';
              },
              popupDelete: (schedule) => {
                return 'Eliminar';
              },
            }}
            month={{
              daynames: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
              startDayOfWeek: 1,
            }}
            week={{
              startDayOfWeek: 1,
              daynames: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
              hourStart: 7,
              hourEnd: 24,
            }}
          />
        </div>
      </div>
    </>
  )
}

function CalendarList(props) {
  let calendars = props.calendars.map((calendar, index) => (
    <div className="agenda-calendars-list-item" key={calendar.id}>
      <label>
        <input type="checkbox" className="tui-full-calendar-checkbox-round" value={ calendar.id } checked />
        <span style={{borderColor: calendar.borderColor, backgroundColor: calendar.borderColor}}></span>
        <span>{ calendar.name }</span>
      </label>
    </div>
  ));

  let noCalendar = <li>Sin Calendario</li>;

  return (
    <div id="agenda-calendars-list">
       {props.calendars.length > 0 ? calendars : noCalendar}
    </div>
  )
}

CalendarList.defaultProps = {
  calendars: [],
};


function mapStateToProps(state) {
  return {
    calendars: state.calendars.calendars,
    schedules: state.schedules.schedules,
  }
}

export default connect(mapStateToProps)(AgendaList);
