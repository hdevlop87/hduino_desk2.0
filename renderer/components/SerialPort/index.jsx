import React, { useState, useEffect } from 'react'
import { Container, Card, Title, Content, ButtonContainer } from './serial.styled';
import { useDispatch, useSelector } from "react-redux";
import { Fs_base } from '../../styles'
import Input from '../Input';
import Button from '../Buttons';
import JSon from './setting.json'
import text from '../../assets/img/arduino.png'
import Image from 'next/image';

import { updateProject, getProjectID } from '../../features/projectsSlice'
import { setPortModal } from '../../features/navBarSlice'
import { getPorts, getListPorts } from '../../features/portsSlice';

const SerialPort = () => {
    const dispatch = useDispatch();

    const showModal = useSelector((state) => state.navBar.portModal);
    const projectID = useSelector(getProjectID);
    const listPorts = useSelector(getListPorts);

    const deleteBrackets = (str) => str.replace(/ *\([^)]*\) */g, "")

    const [values, setValues] = useState({
        port: 'COM1',
        baudRate: 115200,
    });

    useEffect(() => {
        dispatch(getPorts())
    }, [showModal])

    useEffect(() => {
        JSon.portSetting[0].options = listPorts
    }, [listPorts]);

    const confirm = () => {
        dispatch(setPortModal(false))

        dispatch(updateProject({
            id: projectID,
            ...values
        }))
    }

    const handleChange = (e, v) => {
        v = deleteBrackets(v)
        setValues(prevValues => ({ ...prevValues, [e]: v }));
    }

    return (
        <Container show={showModal}>
            <Card>
                <Title>
                    <Image src={text} alt="" />
                    <Fs_base color='gray_Light_pressed'>Select Port</Fs_base>
                </Title>
                <Content>
                    {
                        JSon.portSetting.map((item, i) =>
                            <Input
                                key={i}
                                label={item.label}
                                type={item.type}
                                options={item.options}
                                value={values[item.id]}
                                callback={value => handleChange(item.id, value)}
                                LabelPos="left"
                                outlined={true}
                            />
                        )
                    }

                    <ButtonContainer>
                        <Button
                            onClick={() => confirm()}
                            size='sm'
                            bg='purple_normal'>confirm</Button>

                        <Button
                            onClick={() => dispatch(setPortModal(false))}
                            size='sm'
                            bg='orange_normal'>cancel</Button>
                    </ButtonContainer>
                </Content>
            </Card>
        </Container>
    )
}

export default SerialPort