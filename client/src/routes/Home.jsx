import React, { useContext } from 'react';
import SelectSettings from '../components/SelectSettings';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Row, Col, ListGroup } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { capitalize } from 'lodash';
import Sprite from '../components/Sprite';
import {Container} from 'react-bootstrap';
import customData from '../imgs/skills-spritesheet.json';
import {container, gridItem, rowItem} from '../components/Styles';

const chunkArrayInGroups = (arr, size) => {
    const result = [];
    for (let i=0; i<arr.length; i+=size)
        result.push(arr.slice(i, i+size));
    return result;
}

const Home = () => {
    const { selectedSkills } = useContext(AppContext);
    return (
        <div style={{ zIndex: 5 }}>
            {/* {Object.keys(customData.frames).map((key, index) => {
                return <Sprite frame={customData.frames[key].frame} hover={key} />

            })} */}
            <Header />
            <Row>
                <Col style={{
                    backgroundColor: '#ced0d4',
                    padding: '15px',
                    borderRadius: 5,
                    height: '100%',
                }} sm={4}>
                    <SelectSettings />
                </Col>

                <Col sm={7}>
                    <Tabs defaultActiveKey="combat" className="mb-3">
                        {selectedSkills && Object.keys(selectedSkills).map((key, index) => {
                            let data = [];
                            if (selectedSkills) {
                                data = chunkArrayInGroups(selectedSkills[key], 5);
                            }
                            console.log(data);
                            return (
                                <Tab eventKey={key} title={capitalize(key) + " Skills"} key={index}>
                                    <Container style={container}>
                                        {data.map((row, rowIndex) => {
                                            return (
                                                <Row xs={5} style={rowItem} key={rowIndex}>
                                                    {row.map((item, itemIndex) => {
                                                        return (
                                                            <Col key={itemIndex} style={gridItem}>
                                                                <Sprite frame={customData.frames[item.name].frame} title={item.name} />
                                                                {item.points} / {item.maxPoints}
                                                            </Col>
                                                        );
                                                    })}
                                                </Row>
                                            )
                                        })}
                                    </Container>
                                </Tab>
                            );
                        })}
                    </Tabs>
                </Col>
            </Row>
        </div>
    )
};

export default Home;
