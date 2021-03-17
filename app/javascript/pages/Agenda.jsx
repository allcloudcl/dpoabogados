import React from 'react';
import Calendar from '@toast-ui/react-calendar';

class Agenda extends React.Component {

    constructor(props) {
        super(props);

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
              </div>
              <Calendar
                usageStatistics={false}
                month={monthOptions}
                week={weekOptions}
                taskView={false}
                scheduleView={['time']}
                useCreationPopup={true}
                useDetailPopup={true}
              />
            </>
        );
    }
}

export default Agenda;
