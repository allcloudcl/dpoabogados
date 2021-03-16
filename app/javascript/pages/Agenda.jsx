import React from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

class Agenda extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Agenda</h1>
              </div>
              <Calendar usageStatistics={false} />
            </>
        );
    }
}

export default Agenda;
