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
            <div className='search-container'>
            <div className='search-content'>
                <h1 style={{color: 'white'}}>Search for the link between two actors:</h1>
                <div className='slide-in-left'>
                <TargetAInput updateTargetA={this.props.updateTargetA} />
                </div>
                <br/><br/>
                <div className='slide-in-right'>
                <TargetBInput updateTargetB={this.props.updateTargetB} />
                </div>
                <br/><br/>
                <div className='slide-in-bck-bottom'>
                <Button type="primary" 
                icon={<SearchOutlined />}
                onClick={() => this.props.getResults(this.props.target_A, this.props.target_B)}>
                    Search
                </Button>
                </div>
                <br/><br/>
                <SearchResults results={this.props.results} loading={this.props.loading}/>
            </div>
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