import React from 'react';

import * as TeacherService from './services/TeacherService';

import {RecordHeader, HeaderField} from './components/PageHeader';

export default React.createClass({

    getInitialState() {
        return {teacher:{},teachers: []};
    },

    componentDidMount() {
        this.getTeacher(this.props.params.teacherId);
    },

    componentWillReceiveProps(props) {
        this.getTeacher(props.params.teacherId);
    },

    getTeacher(id) {
        TeacherService.findById(id).then(teacher => this.setState({teacher}));
    },

    deleteHandler() {
        TeacherService.deleteItem(this.state.teacher.id).then(() => window.location.hash = "teachers");
    },

    editHandler() {
        window.location.hash = "#teacher/" + this.state.teacher.id + "/edit";
    },

    render() {
        return (
            <div>
                <RecordHeader type="Teacher"
                              icon="user"
                              title={'Professor ' + this.state.teacher.name }
                              onEdit={this.editHandler}
                              onDelete={this.deleteHandler}
                              onClone={this.cloneHandler}>
                    <HeaderField label="Name" value={this.state.teacher.name}/>
                    <HeaderField label="Email" value={this.state.teacher.email}/>
                </RecordHeader>

                {React.cloneElement(this.props.children, {teacher: this.state.teacher})}

            </div>
        );
    }
});