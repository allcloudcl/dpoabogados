import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { createSchedule } from '../../actions/schedules';
import { fetchUsers } from '../../actions/users';

// var dayjs = require('dayjs') // new call
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

class ScheduleNew extends React.Component {
    static defaultProps = {
        isFetching: false,
        message: null,
        users: []
    };

    constructor(props) {
        super(props);

        let now = dayjs();
        let later = now.add(1, 'hour');

        this.state = {
            schedule: {
                title: "",
                body: "",
                start: now,
                end: now,
                category: 0,
                location: "",
            },
            start_date: now.format('YYYY[-]MM[-]DD'),
            start_time: now.format('HH[:]mm'),
            end_date: later.format('YYYY[-]MM[-]DD'),
            end_time: later.format('HH[:]mm'),

            users: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }

    onChange = (event) => {
        this.setState({
            schedule: {
                ...this.state.schedule,
                [event.target.name]: event.target.value
            }
        })
    }

    onChangeDateTime = (event) => {
        // Date.parse(start_date)
        this.setState({
            [event.target.name]: event.target.value,
            schedule: {
                ...this.state.schedule,
                [event.target.name]: event.target.valueAsNumber
            }
        })
    }

    doCreateSchedule = (e) => {
        let schedule = this.state.schedule;

        schedule.calendar_id = 1;
        schedule.start = dayjs(this.state.start_date + ' ' + this.state.start_time, "YYYY-MM-DD HH:mm")
        schedule.end = dayjs(this.state.end_date + ' ' + this.state.end_time, "YYYY-MM-DD HH:mm")

        this.props.dispatch(createSchedule(Object({'schedule': schedule})))
            .then(response => this.props.history.push('/agenda'))
            .catch(error => console.log(error));
        e.preventDefault();
    }

    render() {
        const optionsUsers = this.props.users.map((user, index) => (
            <option value={user.id} key={index}>{user.full_name}</option>
        ));

        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2  border-bottom">
                <h1 className="h2">Nuevo Evento</h1>
              </div>
              <form onSubmit={this.doCreateSchedule} className="row g-3 mt-3">

                <div>
                  <label htmlFor="title" className="form-label">Título</label>
                  <input
                    type="string"
                    name="title"
                    className="form-control"
                    placeholder="Título"
                    value={this.state.schedule.title}
                    onChange={this.onChange}
                    required
                  >
                  </input>
                </div>

                <div>
                  <label htmlFor="body" className="form-label">Descripción</label>
                  <textarea
                    name="body"
                    className="form-control"
                    rows="2"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    onChange={this.onChange}
                    value={this.state.schedule.body}
                    required
                  >
                  </textarea>
                </div>

                <div className="col-md-4">
                  <label htmlFor="start" className="form-label">Comienzo</label>
                  <div className="input-group">
                    <input
                      type="date"
                      name="start_date"
                      className="form-control"
                      step="any"
                      value={this.state.start_date}
                      onChange={this.onChangeDateTime}
                      required
                    >
                    </input>
                    <input
                      type="time"
                      name="start_time"
                      className="form-control"
                      step="any"
                      value={this.state.start_time}
                      onChange={this.onChangeDateTime}
                      required
                    >
                    </input>
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="end" className="form-label">Fin</label>
                  <div className="input-group">
                    <input
                      type="date"
                      name="end_date"
                      className="form-control"
                      step="any"
                      value={this.state.end_date}
                      onChange={this.onChangeDateTime}
                      required
                    >
                    </input>
                    <input
                      type="time"
                      name="end_time"
                      className="form-control"
                      step="any"
                      value={this.state.end_time}
                      onChange={this.onChangeDateTime}
                      required
                    >
                    </input>
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <select
                    name="category"
                    className="form-select"
                    value={this.state.schedule.category}
                    onChange={this.onChange}
                  >
                    <option value="0">Tiempo</option>
                    <option value="1">Meta</option>
                    <option value="2">Tarea</option>
                    <option value="3">Todo el día</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="form-label">Ubicación</label>
                  <input
                    type="string"
                    name="location"
                    className="form-control"
                    placeholder="Concepción, Chile"
                    value={this.state.schedule.location}
                    onChange={this.onChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-12 mb-3">
                  <button type="submit" className="btn btn-primary me-2">
                    Crear Evento
                  </button>

                  <Link type="button" to="/agenda" className="btn btn-secondary">
                    Volver
                  </Link>
                </div>
              </form>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.contracts.isFetching,
        message: state.contracts.isFetching,
        users: state.users.users,
    };
}

export default connect(mapStateToProps)(ScheduleNew);
