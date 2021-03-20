import React from 'react';

const Support = (props) => {
    return (
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Soporte</h1>
          </div>
          <div className="row p-3">
            <div className="col">
              <Contact />
            </div>

            <div className="col">
              <p className="lead">
                ¿Necesitas apoyo? ¿Tienes alguna duda? Siéntete libre de
                ponerte en contacto con AllCloud a través del formulario,
                o con los siguientes contactos.
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Roberto Delgado
                        </td>
                        <td>
                          +56935764641
                        </td>
                        <td>
                          roberto.delgado@allcloud.cl
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Víctor González
                        </td>
                        <td>
                          +56994810860
                        </td>
                        <td>
                          victor.gonzalez@allcloud.cl
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Iván González
                        </td>
                        <td>
                          +584243758333
                        </td>
                        <td>
                          ivan.gonzalez@allcloud.cl
                        </td>
                      </tr>
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
    );
}

class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: "",
                email: "",
                phone: "",
                description: "",
            },
        };
    }

    onChange = (event) => {
        this.setState(prevState => {
            let form = Object.assign({}, prevState.form);
            form[event.target.name] = event.target.value;
            return { form };
        })
    }

    doSubmitForm = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.doSubmitForm} className="row g-3">

              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="string"
                  name="name"
                  className="form-control"
                  placeholder="Juan Pérez"
                  value={this.state.form.name}
                  onChange={this.onChange}
                  required
                >
                </input>
              </div>

              <div className="col-md-4">
                <label htmlFor="email" className="form-label">Correo</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="ejemplo@allcloud.cl"
                  value={this.state.form.email}
                  onChange={this.onChange}
                  required
                >
                </input>
              </div>

              <div className="col-md-4">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+56123456789"
                  pattern="[+]{1}[0-9]{11,14}"
                  value={this.state.form.phone}
                  onChange={this.onChange}
                  required
                >
                </input>
              </div>

              <div>
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="2"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  value={this.state.form.description}
                  onChange={this.onChange}
                  required
                >
                </textarea>
              </div>

              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary me-2">
                  Enviar
                </button>
              </div>

            </form>
        );
    }
}

export default Support;
