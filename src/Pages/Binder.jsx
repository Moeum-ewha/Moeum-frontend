import React from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Content, Gallery, Left, Right, Album, Bind, Spine, Cover, Name, Pic } from "../Components/BinderComponent";
import { NavBar } from "../Components/NavBar";

import dummy1 from '../Assets/dummy5.jpeg';
import dummy2 from '../Assets/dummy6.jpeg';


const Binder2 = () => {
    return (
        <BackgroundContainer>
            <Content>
            <TopBar>
                <Title>
                    바인더
                </Title>
            </TopBar>
            <Gallery>
                <Left>
                    <Album>
                        <Bind>
                            <Spine style={{ backgroundColor: '#F5AEAE' }} />
                            <Cover style={{ backgroundColor: '#FCE5DF' }}/>
                            <Pic>
                            <img src={dummy1} width="80px" />
                            </Pic>
                        </Bind>
                        <Name>
                            영우
                        </Name>
                    </Album>
                    <Album>
                        <Bind>
                            <Spine style={{ backgroundColor: '#FFC19E' }} />
                            <Cover style={{ backgroundColor: '#FFEADA' }}/>
                            <Pic>
                            <img src={dummy2} width="80px" />
                            </Pic>
                        </Bind>
                        <Name>
                            유진
                        </Name>
                    </Album>
                </Left>
                <Right>
                    <Album>
                        <Bind>
                            <Spine style={{ backgroundColor: '#FFDF70' }} />
                            <Cover style={{ backgroundColor: '#FFF3CC' }}/>
                            <Pic>
                            <img src={dummy2} width="80px" />
                            </Pic>
                        </Bind>
                        <Name>
                            혜준
                        </Name>
                    </Album>
                    <Album>
                        <Bind>
                            <Spine style={{ backgroundColor: '#AFE397'}}/>
                            <Cover style={{ backgroundColor: '#E7F5D8' }}/>
                            <Pic>
                            <img src={dummy2} width="80px" />
                            </Pic>
                        </Bind>
                        <Name>
                            남준
                        </Name>
                    </Album>
                </Right>
            </Gallery>
            </Content>
            <NavBar />
      </BackgroundContainer>
    );
};

export default Binder2;