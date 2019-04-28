import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonCompont = styled(Button)`
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    &.pause{
        background-color: #faad14;
        border-color: #faad14;
        :hover {
            color: #fff;
            background-color: #fcc558;
            border-color: #fcc558;
        }
    }
`