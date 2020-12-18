import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import TargetAInput from './TargetAInput'
import TargetBInput from './TargetBInput'
import SearchResults from './SearchResults'
import { getResults, updateTargetA, updateTargetB } from '../../redux/actions/searchActions'

class SixDegreesSearch extends React.Component {

    render() {
        return (
            <div>
                <h1>Search for the link between two actors:</h1>
                <TargetAInput updateTargetA={this.props.updateTargetA} />
                <br/><br/>
                <TargetBInput updateTargetB={this.props.updateTargetB} />
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