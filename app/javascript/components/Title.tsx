import React, { FC } from 'react';

interface TitleProps {
    title: string;
    fsheader: string;
    secheader: string;
}

const Title: FC<TitleProps> = ({ title,fsheader,secheader }) => {
    console.log(2)
    return (
        <div>

            <div className="content_head">
                TEST TITLE
            </div>
        </div>
    );
};
export default Title
