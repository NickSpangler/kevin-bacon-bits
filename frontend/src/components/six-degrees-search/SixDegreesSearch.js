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
                <Button type="primary" icon={<SearchOutlined />}>
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