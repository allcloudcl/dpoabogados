import React from 'react';
import Calendar from '@toast-ui/react-calendar';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';

class AgendaList extends React.Component {
    calendarRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            schedules: []
        }
    }

    componentDidMount() {
        axios.get('/api/v1/schedules')
            .then(response => this.setState({ schedules: response.data }))
            .catch(error => {
                console.log(error);
            });

    }

    handleClickNextButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();

        calendarInstance.next();
    }

    handleClickPrevButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();

        calendarInstance.prev();
    }

    render() {
        let weekOptions = {
            startDayOfWeek: 1,
            daynames: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            hourStart: 7,
            hourEnd: 24
        }

        let monthOptions = {
            daynames: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            startDayOfWeek: 1,
        }

        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Agenda</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                      <Link to="/schedules/new" className="btn btn-sm btn-outline-secondary">Nuevo</Link>
                  </div>
                  <div className="btn-group me-2">
                      <button className="btn btn-sm btn-outline-secondary">
                          <FontAwesomeIcon icon={['fas', 'arrow-left']} onClick={this.handleClickPrevButton}/>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                          <FontAwesomeIcon icon={['fas', 'arrow-right']} onClick={this.handleClickNextButton}/>
                      </button>
                  </div>
                </div>
              </div>
              <Calendar
                ref={this.calendarRef}
                usageStatistics={false}
                month={monthOptions}
                week={weekOptions}
                taskView={false}
                scheduleView={['time']}
                useCreationPopup={false}
                useDetailPopup={true}
                schedules={this.state.schedules}
              />
            </>
        );
    }
}

class Popup extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            calendars: [],
            schedule: {}
        }
    }


    render() {
        const calendars = this.props.calendars.map((calendar, index) => {
            <li className="tui-full-calendar-popup-section-item tui-full-calendar-dropdown-menu-item" data-calendar-id={calendar.id}>
                <span className="tui-full-calendar-icon tui-full-calendar-calendar-dot" style={"background-color: " + calendar.bgColor}></span>
                <span className="tui-full-calendar-content">{calendar.name}</span>
            </li>
        });

        const noCalendar = (
            <li></li>
        );

        return (
            <div className="tui-full-calendar-popup">
                <div className="tui-full-calendar-popup-container">
                    <div className={"tui-full-calendar-popup-section tui-full-calendar-dropdown tui-full-calendar-close tui-full-calendar-section-calendar " + (this.props.calendars.length > 0 ? '' :  "tui-full-calendar-hide")}>
                        <button className="tui-full-calendar-button tui-full-calendar-dropdown-button tui-full-calendar-popup-section-item">
                            <span className="tui-full-calendar-icon tui-full-calendar-calendar-dot" style={"background-color: " + selectedCal.bgColor}></span>
                            <span id="tui-full-calendar-schedule-calendar" className="tui-full-calendar-content">{selectedCal.name}</span>
                            <span className="tui-full-calendar-icon tui-full-calendar-dropdown-arrow"></span>
                        </button>
                        <ul className="tui-full-calendar-dropdown-menu" style="z-index: 1005">
                            {this.props.calendars.length > 0 ? calendars : noCalendar}
                        </ul>
                    </div>
                    <div className="tui-full-calendar-popup-section">
                        <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-title">
                        <span className="tui-full-calendar-icon tui-full-calendar-ic-title"></span>
                            <input id="tui-full-calendar-schedule-title" className="tui-full-calendar-content" placeholder="Asunto" value={schedule.title} />
                        </div>
                    </div>
                    <div className="tui-full-calendar-popup-section">
                        <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-location">
                        <span className="tui-full-calendar-icon tui-full-calendar-ic-location"></span>
                            <input id="tui-full-calendar-schedule-location" className="tui-full-calendar-content" placeholder="Ubicación" value={schedule.location} />
                        </div>
                    </div>
                    <div className="tui-full-calendar-popup-section">
                        <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-start-date">
                            <span className="tui-full-calendar-icon tui-full-calendar-ic-date"></span>
                                <input id="tui-full-calendar-schedule-start-date" className="tui-full-calendar-content" placeholder="{{startDatePlaceholder-tmpl}}" />
                            <div id="tui-full-calendar-startpicker-container" style="margin-left: -1px; position: relative"></div>
                        </div>
                        <span className="tui-full-calendar-section-date-dash">-</span>
                        <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-end-date">
                            <span className="tui-full-calendar-icon tui-full-calendar-ic-date"></span>
                            <input id="tui-full-calendar-schedule-end-date" className="tui-full-calendar-content" placeholder="{{endDatePlaceholder-tmpl}}" />
                            <div id="tui-full-calendar-endpicker-container" style="margin-left: -1px; position: relative"></div>
                        </div>
                    </div>
                    <button className="tui-full-calendar-button tui-full-calendar-popup-close">
                        <span className="tui-full-calendar-icon tui-full-calendar-ic-close"></span>
                    </button>
                    <div className="tui-full-calendar-section-button-save">
                        <button className="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save">
                            <span>
                                (selectedCal.isEditMode : popupUpdate-tmpl ? popupSave-tmpl)
                            </span>
                        </button>
                    </div>
                </div>
                <div id="tui-full-calendar-popup-arrow" className="tui-full-calendar-popup-arrow tui-full-calendar-arrow-bottom">
                    <div className="tui-full-calendar-popup-arrow-border">
                        <div className="tui-full-calendar-popup-arrow-fill"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AgendaList;
