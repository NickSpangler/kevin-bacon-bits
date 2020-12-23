import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import TargetAInput from './TargetAInput'
import TargetBInput from './TargetBInput'
import SearchResults from './SearchResults'
import { getResults, updateTargetA, updateTargetB } from '../../redux/actions/searchActions'
import Animista, { AnimistaTypes } from "react-animista";
import { Attention, Background, Basic, Entrances, Exits, Text } from "css-magic";


class SixDegreesSearch extends React.Component {

    render() {
        return (
            <div className='search-container'>
                <h1>Search for the link between two actors:</h1>
                <div className='slide-in-left'>
                <TargetAInput updateTargetA={this.props.updateTargetA} />
                </div>
                <br/><br/>
                <div className='slide-in-right'>
                <TargetBInput updateTargetB={this.props.updateTargetB} />
                </div>
                <br/><br/>
                <Button type="primary" 
                icon={<SearchOutlined />}
                onClick={() => this.props.getResults(this.props.target_A, this.props.target_B)}>
                    Search
                </Button>
                <br/><br/>
                <SearchResults results={this.props.results} loading={this.props.loading}/>
            </div>
        )
    }
}

const mapStateToProps = ({ search }) => {
    return {
        target_A: search.target_A,
        target_B: search.target_B,
        results: search.results,
        loading: search.loading
    }
}



export default connect(mapStateToProps, { getResults, updateTargetA, updateTargetB })(SixDegreesSearch)  