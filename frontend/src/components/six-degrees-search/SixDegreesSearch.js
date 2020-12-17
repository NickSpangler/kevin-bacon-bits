import React from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import TargetAInput from './TargetAInput'
import TargetBInput from './TargetBInput'
import SearchResults from './SearchResults'

export default function SixDegreesSearch() {
    
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