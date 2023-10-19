import React from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Content, Gallery, Left, Right, Album, Bind, Spine, Cover, Name } from "../Components/BinderComponent";
import { NavBar } from "../Components/NavBar";


const Binder = () => {
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
                        </Bind>
                        <Name>
                            영우
                        </Name>
                    </Album>
                    <Album>
                        <Bind>
                            <Spine style={{ backgroundColor: '#FFC19E' }} />
                            <Cover style={{ backgroundColor: '#FFEADA' }}/>
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
                        </Bind>
                        <Name>
                            혜준
                        </Name>
                    </Album>
                </Right>
            </Gallery>
            </Content>
            <NavBar />
      </BackgroundContainer>
    );
};

export default Binder;