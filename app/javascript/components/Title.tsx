import React, { FC } from 'react';

interface TitleProps {
    title: string;
    fsheader: string;
    secheader: string;
}

const Title: FC<TitleProps> = ({ title,fsheader,secheader }) => {
    return (
        <div>
            <div className="header-h1"> <h1>{title}</h1></div>

            <div className="content_head">
                <div className="clientscontainerHeader"><h3>{fsheader}</h3></div>
                <div className="clientscontainerHeader"><h3>{secheader}</h3>
                </div>
            </div>
        </div>
    );
};
export default Title
