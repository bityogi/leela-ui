import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MonthDaySelectionTabs extends Component {

    handleTabChange = (e, v) => {
        const { input: { onChange } } = this.props;
        onChange(v);
    }
    
    render() {
        const { input : { value }} = this.props;
        return (
            <AppBar position="static" color="default">
                <Tabs
                    value={value ? value : 0 }
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="By Month Days" />
                    <Tab label="By Days of Week" />
                </Tabs>
            </AppBar>
        )
    }
}

export default MonthDaySelectionTabs;