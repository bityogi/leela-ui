import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { map, forEach } from 'lodash';

import store from 'store';

import RenderPriceByQuestion from './renderPriceByQuestion';

class PriceByQuestion extends Component {

    addPriceForQuestion = (questionIndex, price) => {

        const { questions } = this.props;
        forEach(questions, (q) => {
            if (q.index === questionIndex) {
                q.preReqPrice = { amount: price };
            }
        });
        store.dispatch(change('event', 'questions', questions));
   
    }

    renderBoolQuestions = () => {
        const { boolQuestions } = this.props;
        
        return map(boolQuestions, q => {
            const exists = q.preReqPrice
            
            let initialValues = {};
            if (exists) {
                initialValues.price = exists.amount 
            }

            return (
                    <RenderPriceByQuestion
                        form={`priceByQuestionFor${q.index}`}
                        question={q}
                        addPriceForQuestion={this.addPriceForQuestion}
                        key={q.index}
                        initialValues={initialValues}
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
    const questions = selector(state, 'questions');
    return {
        pricesByQuestion,
        questions,
    }
})(PriceByQuestion)


export default PriceByQuestion;