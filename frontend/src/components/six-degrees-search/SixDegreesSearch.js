import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import TargetAInput from './TargetAInput'
import TargetBInput from './TargetBInput'
import SearchResults from './SearchResults'
import { getResults } from '../../redux/actions/searchActions'

class SixDegreesSearch extends React.Component {

    render() {
        return (
            <div>
                <h1>Search for the link between two actors:</h1>
                <TargetAInput />
                <br/><br/>
                <TargetBInput />
                <br/><br/>
                <Button type="primary" 
                icon={<SearchOutlined />}
                onClick={() => alert(`Target A: ${this.props.target_A} Target B: ${this.props.target_B}`)}>
                    Search
                </Button>
                <br/><br/>
                <SearchResults />
            </div>
        )
    }
}

const mapStateToProps = ({ search }) => {
    return {
        target_A: search.target_A,
        target_B: search.target_B,
        results: search.results
    }
}



export default connect(mapStateToProps, { getResults })(SixDegreesSearch)  