import React, { Component } from 'react';
import { connect } from 'react-redux';

import { reduxForm, change, formValueSelector } from 'redux-form';


import { map } from 'lodash';

import RenderPriceByQuestion from './renderPriceByQuestion';

class PriceByQuestion extends Component {

    addPriceForQuestion = (questionIndex, values) => {
        console.log('addPriceForQuestion -- questionIndex: ', questionIndex);
        console.log('addPriceForQuestion -- values: ', values);
    }

    renderBoolQuestions = () => {
        const { boolQuestions } = this.props;
        console.log('Received boolQuestions: ', boolQuestions);
        return map(boolQuestions, q => {
            return (
                    <RenderPriceByQuestion
                        question={q}
                        addPriceForQuestion={this.addPriceForQuestion}
                        key={q.index}
                    />
                )
            })

    }

    render() {
        return (
            <div>
                {this.renderBoolQuestions()}
            </div>
        )
    }
}

PriceByQuestion = reduxForm({
    form: 'priceByQuestion',
})(PriceByQuestion)

const selector = formValueSelector('event')
PriceByQuestion = connect(state => {
    const pricesByQuestion = selector(state, 'pricesByQuestion');
    return {
        pricesByQuestion,
    }
})(PriceByQuestion)


export default PriceByQuestion;