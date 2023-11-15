import React from 'react';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  TopBar,
  Title,
  Content,
  Gallery,
  Left,
  Right,
  Album,
  Bind,
  Spine,
  Cover,
  Name,
  Pic,
} from '../Components/BinderComponent';
import { NavBar } from '../Components/NavBar';

import dummy1 from '../Assets/dummy5.jpeg';
import dummy2 from '../Assets/dummy6.jpeg';

import demo from '../../public/dummy/dummy.json';

const Binder = () => {
  const friendsList = demo.userList.map((user) => user.friendsList).flat();

  const colorChart = [
    { spine: '#F5AEAE', cover: '#FCE5DF' },
    { spine: '#FFC19E', cover: '#FFEADA' },
    { spine: '#FFDF70', cover: '#FFF3CC' },
    { spine: '#AFE397', cover: '#E7F5D8' },
    { spine: '#F5AEAE', cover: '#FCE5DF' },
    { spine: '#FFC19E', cover: '#FFEADA' },
  ];
  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title>바인더</Title>
        </TopBar>
        <Gallery>
          {friendsList.map((friend, index) => (
            <Album key={friend.id}>
              <Bind>
                <Spine style={{ backgroundColor: colorChart[index].spine }} />
                <Cover style={{ backgroundColor: colorChart[index].cover }} />
                <Pic>
                  <img src={`../../dummy/${friend.faceImg}`} width="80px" />
                </Pic>
              </Bind>
              <Name>{friend.name}</Name>
            </Album>
          ))}
        </Gallery>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default Binder;
