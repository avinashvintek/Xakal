import React, { Component } from 'react';

class ClassNotes extends Component {

    render() {

        return (
            <div>
                <button class="btn btn-primary dropdown-toggle mr-4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Basic dropdown</button>

                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr class="success">
                                <th scope="col">#</th>
                                <th scope="col">Notes description</th>
                                <th scope="col">Download file</th>
                                <th scope="col">Uploaded date</th>
                                <th scope="col">Uploaded by</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="active">
                                <th scope="row">1</th>
                                <td>Operating system</td>
                                <td>File</td>
                                <td>02/05/2018</td>
                                <td>Anitha</td>
                            </tr>
                            <tr class="active">
                                <th scope="row">2</th>
                                <td>Software engineering</td>
                                <td>File</td>
                                <td>05/05/2018</td>
                                <td>Lilly</td>
                            </tr>
                            <tr class="active">
                                <th scope="row">3</th>
                                <td>TPM</td>
                                <td>File</td>
                                <td>09/05/2018</td>
                                <td>Gayathri</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ClassNotes;