import { useEffect, useState } from 'react';
import SwiperCore, { EffectFlip, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-flip"
import arduinoUno from '../../assets/img/arduinoUno.png';
import arduinoLeonardo from '../../assets/img/arduinoLeonardo.png';
import arduinoMega from '../../assets/img/arduinoMega.png';
import arduinoNano from '../../assets/img/arduinoNano.png';
import { Container, Card, StyledImage } from './SelectBoard.styled';
import { H3 } from '../../styles'
import Button from '../Buttons'
import Blockly from 'blockly';
import { useDispatch, useSelector } from "react-redux";
import { updateProject,getProjectID } from '../../features/projectsSlice'
import { setBoardModal } from '../../features/navBarSlice'
import Hduino from '../../Blockly/Hduino';

SwiperCore.use([EffectFlip, Pagination, Navigation]);


const SelectBoard = () => {

    const showModal = useSelector((state) => state.navBar.boardModal);
    const projectID = useSelector(getProjectID);
    const dispatch = useDispatch();

    const board = [
        "uno", "mega", "leonardo", "nano"
    ];

    const [boardIndex, setBoardIndex] = useState(0);

    const Save = () => {
        let selected = board[boardIndex];
        let myBoard = Blockly.Arduino.Boards.profiles[selected];

        dispatch(updateProject({
            id: projectID,
            boardName: myBoard.name,
            compilerFlag: myBoard.compilerFlag
        }))

        Blockly.Arduino.Boards.changeBoard(Hduino.workspace, selected)

        dispatch(setBoardModal(false))

    }


    return (
        <Container show={showModal}>
            <Card>
                <Swiper
                    effect={'flip'}
                    grabCursor={true}
                    pagination={true}
                    navigation={true}
                    onSlideChange={(swiper) => setBoardIndex(swiper.activeIndex)}
                    className="mySwiper">
                    <SwiperSlide>
                        <H3 color='primary_normal'>Arduino Uno</H3>
                        <StyledImage src={arduinoUno} alt="ok" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <H3 color='primary_normal'>Arduino Mega</H3>
                        <StyledImage src={arduinoMega} alt="ok" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <H3 color='primary_normal'>Arduino Leonardo</H3>
                        <StyledImage src={arduinoLeonardo} alt="ok" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <H3 color='primary_normal'>Arduino Nano</H3>
                        <StyledImage src={arduinoNano} alt="ok" />
                    </SwiperSlide>
                </Swiper>
                <Button size='sm' bg='primary_normal' onClick={() => Save()}>Select Board</Button>
            </Card>
        </Container>

    )
}

export default SelectBoard