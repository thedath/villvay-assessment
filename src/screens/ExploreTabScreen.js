import React from "react";
import { ScrollView, Text } from "react-native";
import { Avatar, Button, Card, Paragraph, Title } from "react-native-paper";

import Container from "../components/Container";
import MainHeader from "../components/MainHeader";
import useClassified from "../redux/hooks/useClassified";

const ExploreTabScreen = () => {
  const { classifiedList } = useClassified();

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  const renderClassifiedList = () =>
    classifiedList.map((classified, index) => (
      <Card key={`classified-${index}`}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>
    ));

  return (
    <Container>
      <MainHeader title="Explore" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderClassifiedList()}
      </ScrollView>
    </Container>
  );
};

export default ExploreTabScreen;
