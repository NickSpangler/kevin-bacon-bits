import React from 'react'
import { Result, Button } from 'antd';

export default function SixDegreesChallenge() {
    return (
        <Result
            status="404"
            title="Sorry, we're still unboxing this feature."
            subTitle="Check back later for updates, and enjoy another feature at this time."
            extra={[<Button type="primary">Six Degrees Search</Button>,
                    <Button type="primary">Filmography Challenge</Button>
            ]}
        />
    )
}